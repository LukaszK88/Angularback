import React,{Component} from 'react';
import { connect } from 'react-redux'
import  NavbarComp from '../home/partials/navbar';
import FlashMessages from '../../helpers/message';
import {fetchClub,fetchClubs} from '../../actions/clubs';
import { Card, Icon, Image, List,Button } from 'semantic-ui-react'
import { userHelper } from '../../helpers/user';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import DropZone from './dropZone';
import PerformanceCharts from './performaneCharts';

class ClubProfile extends Component{

    componentWillReceiveProps(newProps){
        if(this.props.match.params.clubId !== newProps.match.params.clubId) {
            this.props.fetchClub(newProps.match.params.clubId);
        }
    }

    componentDidMount(){
        this.props.fetchClub(this.props.match.params.clubId);
        this.props.fetchClubs();

    }

    renderClubFighters(){
        const {club} = this.props.club;

        return _.map(club.users,(fighter) => {
            return (
                <List.Item key={fighter.id}>
                    <List.Content floated='right'>

                    </List.Content >
                    <List.Content floated='left'>
                        <Image src={userHelper.getImage(fighter)} shape='rounded' size='tiny' />
                    </List.Content>
                    <List.Content>

                        <List.Header><a><Link to={`/profile/${fighter.id}`}>{fighter.name}</Link></a></List.Header>
                        {/*<List.Description>Added by: <a><b>{event.user != null ? event.user.username : 'unknown'} </b></a>*/}
                    </List.Content>
                </List.Item>
            )
         });
    }


    render(){
        if(!this.props.club.club){
            return(<p>Loading....</p>)
        }else {

            let bg ='';
            if(this.props.club.club.id== '1'){
                bg = 'wc-bg'
            }
            if (this.props.club.club.id == '2'){
                bg = 'ukfed-bg'
            }
            if (this.props.club.club.id == '6'){
                bg = 'bad-bg'
            }
            return (
                <div>
                    <FlashMessages/>
                    <NavbarComp/>
                    <div className={bg}>
                    <div className="container profile">
                        <div className="row">
                            <div className="col-md-3">
                                <Card fluid>
                                    <DropZone clubId={this.props.match.params.clubId} currentUser={this.props.currentUser} club={this.props.club}/>
                                    <Card.Content>
                                        <Card.Header>
                                        </Card.Header>
                                        <Card.Meta>
                            <span className='date'>
                                {this.props.club.club.created_at}
                            </span>
                                        </Card.Meta>

                                    </Card.Content>
                                    <Card.Content extra>

                                            <Icon name='users' size="large"/>
                                            {this.props.club.club.users ? this.props.club.club.users.length : ''}
                                            <div className="float-right">
                                                <PerformanceCharts club={this.props.club} clubs={this.props.clubs}/>
                                            </div>
                                    </Card.Content>
                                    { this.props.club.club.fb &&
                                        <Button as='a' target="_blank"
                                                href={this.props.club.club.fb}
                                                color='facebook'>

                                            <Icon name='facebook'/> Facebook
                                        </Button>
                                    }
                                </Card>
                            </div>
                            <br/>
                            <div className="col-md-6">
                                <div className="row">
                                <Card fluid>
                                    <Card.Content>
                                        <Card.Header className="text-center">
                                            {this.props.club.club.name}
                                        </Card.Header>
                                        <Card.Meta className="text-center">
                                            {this.props.club.club.motto}
                                        </Card.Meta>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <List>
                                                    <List.Item icon='certificate'
                                                               content={'Club Total Points: ' +  this.props.club.club.total_points}/>
                                                    <List.Item icon='certificate' content={'Attended Events: coming soon...'}/>
                                                    <List.Item icon='certificate' content={'Total Fights: ' + this.props.club.club.total_fights}/>
                                                    <List.Item icon='certificate' content={'Rank : coming soon...' }/>
                                                </List>
                                            </div>
                                            <div className="col-md-6 ">
                                                <div className="row">
                                                    <div className="col-xs-3">
                                                        <Icon color="yellow" size="huge" name="trophy"/>
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <Icon color="grey" size="huge" name="trophy"/>
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <Icon color="brown" size="huge" name="trophy"/>
                                                    </div>
                                                </div>
                                                <div  className="row">
                                                    <div className="col-xs-3">
                                                        <span style={{ marginLeft:'25px'}} className="badge badge-pill badge-warning">{this.props.club.club.gold}</span>
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <span style={{ marginLeft:'50px'}} className="badge badge-pill badge-warning">{this.props.club.club.silver}</span>
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <span style={{ marginLeft:'50px'}} className="badge badge-pill badge-warning">{this.props.club.club.bronze}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </Card.Content>
                                </Card>
                                </div>
                                <div className="row">


                                            <Card fluid>
                                                <Card.Content>
                                                    <Card.Header className="text-center">
                                                        Clubs Fighters
                                                    </Card.Header>
                                                    <List divided verticalAlign="middle">
                                                        {this.renderClubFighters()}
                                                    </List>
                                                </Card.Content>
                                            </Card>


                                </div>
                            </div>
                            {this.props.club.club.description &&
                                <div className="col-md-3">
                                    <Card fluid>
                                        <Card.Content>
                                            <Card.Header className="text-center">
                                                Description
                                            </Card.Header>
                                            <hr/>
                                            {this.props.club.club.description}
                                        </Card.Content>
                                    </Card>
                                </div>
                            }
                        </div>

                    </div>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {club: state.club,
             clubs:state.clubs,
            currentUser: state.currentUser
    };
}


export default connect(mapStateToProps,{fetchClub,fetchClubs})(ClubProfile);