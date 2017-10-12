import React,{Component} from 'react';
import { connect } from 'react-redux'
import FlashMessages from './../../helpers/message';
import {fetchUsersAdmin,takeAdminAction,fetchUsers, deleteUser,getUserRoles,updateUserRole} from '../../../actions/admin';
import NavbarComp from '../../home/partials/navbar';
import { Header, Table,Image, Card, Radio, Button, Icon } from 'semantic-ui-react'
import _ from 'lodash';
import {userHelper} from '../../../helpers/user';
import { Field, reduxForm, Fields, FieldArray} from 'redux-form';
import { input } from '../../../helpers/input';
import { Tooltip } from 'reactstrap';
import {fetchClubs} from '../../../actions/clubs';
import DeleteConfirmation from './deleteUser';
import { loading } from '../../../actions/config';


class AdminUsers extends Component{
    constructor(){
        super();

        this.state = {
            toggleUsers:false,
            changeRole:'',
            changeAdmin:'',
            tooltipOpen: false,
        }
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    componentDidMount(){
        this.props.fetchUsersAdmin();
        this.props.fetchUsers();
        this.props.getUserRoles();
        this.props.fetchClubs();
    }

    renderUnauthorisedUsers(){
        return _.map(this.props.users.unauthorised, (unauthorised) => {
            return(
            <Card.Group>
                <Card>
                    <Card.Content>
                        <Image floated='right' size='mini' src={userHelper.getImage(unauthorised)} />
                        <Card.Meta>
                            {unauthorised.username}
                        </Card.Meta>
                        <Card.Description>
                            {unauthorised.name ? unauthorised.name : 'no name'}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button.Group>
                            <Button loading={this.props.config.loading} onClick={() => {this.props.takeAdminAction(unauthorised,'approve');this.props.loading(true)}} basic color='green'>Approve</Button>
                            <Button onClick={() => this.props.takeAdminAction(unauthorised,'remove')} basic color='red'>Decline</Button>
                            <Button onClick={() => this.props.takeAdminAction(unauthorised,'block')} basic color='black'>Block</Button>
                        </Button.Group>
                    </Card.Content>
                </Card>
            </Card.Group>
            )
        })
    }

    renderBlockedUsers(){
        return _.map(this.props.users.blocked, (blocked) => {
            return(
                <Card.Group>
                    <Card>
                        <Card.Content>
                            <Image floated='right' size='mini' src={userHelper.getImage(blocked)} />
                            <Card.Meta>
                                {blocked.username}
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <Button.Group>
                                <Button onClick={() => this.props.takeAdminAction(blocked,'approve')} basic color='green'>Approve</Button>
                                <Button onClick={() => this.props.takeAdminAction(blocked,'remove')} basic color='red'>Decline</Button>
                            </Button.Group>
                        </Card.Content>
                    </Card>
                </Card.Group>
            )
        })
    }

    renderUsersRequest(){
        return (this.state.toggleUsers) ? this.renderBlockedUsers() : this.renderUnauthorisedUsers();
    }

    getUserRole(user){
        //todo need to create pivot table with relationships
        if(user.club_admin_id === 1){
            return 'White Company'
        }else if (user.club_admin_id === 2){
            return 'Uk fed'
        }else{
            return ''
        }
    }



    onSubmit(values){
        let data = {};
        _.forEach(values, (value,fieldName) => {
            for (let userId in value) {
                if (value.hasOwnProperty(userId)) {
                    data[fieldName] = value[userId];
                    this.props.updateUserRole(userId, data);
                }
            }
        });
        this.setState({changeRole:''});
        this.setState({changeAdmin:''});
        this.props.reset();
    }


    changeRole(user){
        this.setState({changeRole:user.id});
    }

    changeAdmin(user){
        this.setState({changeAdmin:user.id});
    }

    renderUsersRows(){
        const handleSubmit = this.props.handleSubmit;
        const empty = [{key:0 , value:0, text:'None'}];
        const roles = _.map(this.props.users.roles, (role) => {
            return {key:role.id,value:role.id,text:role.role}
        });

        const clubOptions = _.map(this.props.clubs.clubs, (club) => {
            return {key:club.id , value:club.id, flag:club.country, text:club.name}
        });
        const clubs = empty.concat(clubOptions);
        return _.map(this.props.users.users, (user) => {
            return(
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Image src={userHelper.getImage(user)} shape='rounded' size='mini' />
                            <Header.Content>
                                {user.username}
                                <Header.Subheader>{user.club != null ? user.club.name : 'No Club'}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                        <Table.Cell>
                            {user.name}
                        </Table.Cell>
                        <Table.Cell>
                            { this.state.changeRole != user.id &&
                            <span>{`${user.role.role}`}
                                <Icon className="float-right" onClick={() => this.changeRole(user)} name="user plus" size="large" color="green"/>
                            </span>
                            }
                            {this.state.changeRole == user.id &&
                            <Field
                                name={`user_role_id.${user.id}`}
                                placeholder="Change user role"
                                options={roles}
                                onChangeAction={handleSubmit(this.onSubmit.bind(this))}
                                component={input.renderSelectSubmit}
                            />
                            }
                        </Table.Cell>
                        <Table.Cell>
                            { this.state.changeAdmin != user.id &&
                            <span>{this.getUserRole(user)}
                                <Icon className="float-right" onClick={() => this.changeAdmin(user)} name="user plus" size="large" color="green"/>
                            </span>
                            }
                            {this.state.changeAdmin == user.id &&
                            <Field
                                name={`club_admin_id.${user.id}`}
                                placeholder="Set to be admin"
                                options={clubs}
                                onChangeAction={handleSubmit(this.onSubmit.bind(this))}
                                component={input.renderSelectSubmit}
                            />
                            }
                        </Table.Cell>
                        <Table.Cell>
                            <DeleteConfirmation user={user}/>
                        </Table.Cell>
                </Table.Row>
            )
        });
    }

    handleToggle = () => this.setState({toggleUsers: !this.state.toggleUsers});

    render(){
        const handleSubmit = this.props.handleSubmit;

        const toggleText = (this.state.toggleUsers) ? '  Show unauthorised Users' : '  Show blocked Users';
        return(
            <div>
                <FlashMessages/>
                <NavbarComp/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Card fluid>
                                <Card.Content>
                                    <div className="row">
                                    <div className="col-md-4">

                                     <div className="toggle-help" ><Radio onClick={this.handleToggle} toggle />
                                         {toggleText}
                                     </div>


                                    {this.renderUsersRequest()}
                                    </div>
                                    <div className="col-md-8">
                                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <Table className="table-responsive-custom" basic='very' celled unstackable>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Username</Table.HeaderCell>
                                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                                    <Table.HeaderCell>User Role</Table.HeaderCell>
                                                    <Table.HeaderCell>Event Admin</Table.HeaderCell>
                                                    <Table.HeaderCell>Delete</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                {this.renderUsersRows()}
                                            </Table.Body>
                                        </Table>
                                        </form>
                                    </div>
                                    </div>
                                </Card.Content>
                            </Card>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return { users:state.admin,
        clubs:state.clubs,
        config:state.config};
}
let InitializeFromStateForm = reduxForm({
    form: 'updateUserAdmin',
    enableReinitialize : true
})(AdminUsers);

InitializeFromStateForm = connect(
    mapStateToProps,{fetchUsersAdmin,
        takeAdminAction,
        fetchUsers,deleteUser
        ,getUserRoles,
        updateUserRole,
        fetchClubs,
        loading
    }
)(InitializeFromStateForm);

export default InitializeFromStateForm;
