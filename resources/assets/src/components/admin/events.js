import React,{Component} from 'react';
import { connect } from 'react-redux'
import FlashMessages from './../helpers/message';
import NavbarComp from '../home/partials/navbar';
import { List, Card, Flag, Button, Icon } from 'semantic-ui-react'
import AddEvent from './addEvent';
import {getEventTypes,fetchEvents} from '../../actions/events';
import _ from 'lodash';
import { stringHelper } from '../../helpers/string';
import EditEvent from './editEvent';
import AddCategories from './addCatgories';
import DeleteConfirmation from './deleteEvent';

class Events extends Component{
    componentDidMount(){
        this.props.getEventTypes();
        this.props.fetchEvents();

    }

    renderEventList(){
        let events = _.orderBy(this.props.events.events,['created_at'],['desc']);

        return _.map(events,(event) => {
            if(event.global || event.club_id == this.props.currentUser.user.club_id) {
                return (
                    <List.Item>
                        <List.Content floated='right'>
                            { ((event.club_id == this.props.currentUser.user.club_id || (event.global && event.user_id == this.props.currentUser.user.id) )|| this.props.currentUser.admin) &&
                                <span>
                                <List.Icon><AddCategories event={event}/></List.Icon>
                                < EditEvent event={event}/>
                                <DeleteConfirmation event={event} />
                                </span>
                            }
                        </List.Content>
                        <List.Icon><Flag name={event.location}/></List.Icon>
                        <List.Content>
                            <List.Header><a>{event.title} {stringHelper.limitTo(event.date, 10)}</a> {event.category.length == null ? ' --No Categories' : ` --${event.category.length} categories`}</List.Header>
                            <List.Description>Added by: <a><b>{event.user != null ? event.user.username : 'unknown'} </b></a>
                                on: {stringHelper.limitTo(event.created_at, 10)} club:{event.club_id ? event.club.name : 'Global'}</List.Description>
                        </List.Content>
                    </List.Item>
                )
            }
        });
    }

    render(){

        const {events, eventTypes} = this.props.events;

        return(
            <div>
                <FlashMessages/>
                <NavbarComp/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <span className="float-right">
                                <AddEvent eventTypes={eventTypes}/>
                            </span>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                    <Card fluid >
                        <Card.Content>
                            <List divided verticalAlign="middle">
                                {this.renderEventList()}
                            </List>
                        </Card.Content>
                    </Card>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {events: state.events,
        currentUser:state.currentUser
    };
}



export default connect(mapStateToProps,{getEventTypes,fetchEvents})(Events);