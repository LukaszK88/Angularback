import React,{Component} from 'react';
import { connect } from 'react-redux'
import FlashMessages from '../../../helpers/message';
import NavbarComp from '../../home/partials/navbar';
import { Header, List,Flag, Card, Radio, Button, Icon } from 'semantic-ui-react'
import _ from 'lodash';
import {userHelper} from '../../../helpers/user';
import { Field, reduxForm, Fields, FieldArray} from 'redux-form';
import { input } from '../../../helpers/input';
import { Tooltip } from 'reactstrap';
import {fetchAllClubs,takeClubAdminAction} from '../../../actions/clubs';
import { loading } from '../../../actions/config';


class AdminClubs extends Component{
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
        this.props.fetchAllClubs();
    }

    renderUnauthorisedClubs(){

        return _.map(this.props.clubs.admin, (club) => {
            if (club.active == 0) {
                return (
                    <Card.Group>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    <Flag name={club.country}/>  {club.name}
                                </Card.Header>

                                <Card.Meta>
                                    {club.founder}
                                </Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                <Button.Group>
                                    <Button loading={this.props.config.loading} onClick={() => {
                                        this.props.takeClubAdminAction(club, 'approve');
                                        this.props.loading(true)
                                    }} basic color='green'>Approve</Button>
                                    <Button onClick={() => this.props.takeClubAdminAction(club, 'decline')} basic
                                            color='red'>Decline</Button>
                                </Button.Group>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                )
            }
        })
    }

    renderClubList(){
        return _.map(this.props.clubs.admin,(club) => {
            if (club.active == 1) {
                return (
                    <List.Item>
                        <List.Content floated='right'>
                        <span>
                            <List.Icon>kk</List.Icon>
                        </span>
                        </List.Content>
                        <List.Icon><Flag name={club.country}/></List.Icon>
                        <List.Content>
                            <List.Header><a>{club.name}</a></List.Header>
                            <List.Description>Added by:{club.founder}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                )
            }

        });
    }

    render(){
        const handleSubmit = this.props.handleSubmit;

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

                                    {this.renderUnauthorisedClubs()}
                                    </div>
                                    <div className="col-md-8">
                                        <Card fluid >
                                            <Card.Content>
                                                <List divided verticalAlign="middle">
                                                    {this.renderClubList()}
                                                </List>
                                            </Card.Content>
                                        </Card>
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
    return {
        clubs:state.clubs,
        config:state.config};
}
let InitializeFromStateForm = reduxForm({
    form: 'updateClubAdmin',
})(AdminClubs);

InitializeFromStateForm = connect(
    mapStateToProps,{
        fetchAllClubs,
        takeClubAdminAction,
        loading
    }
)(InitializeFromStateForm);

export default InitializeFromStateForm;
