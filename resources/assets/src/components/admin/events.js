import React,{Component} from 'react';
import { connect } from 'react-redux'
import FlashMessages from './../helpers/message';
import NavbarComp from '../home/partials/navbar';
import { List, Card, Flag, Button, Icon } from 'semantic-ui-react'
import AddEvent from './addEvent';
import {getEventTypes,fetchEvents, deleteEvent} from '../../actions/events';
import _ from 'lodash';
import { stringHelper } from '../../helpers/string';
import EditEvent from './editEvent';
import AddCategories from './addCatgories';

class Events extends Component{
    componentDidMount(){
        this.props.getEventTypes();
        this.props.fetchEvents();

    }

    deleteEvent(event){
        this.props.deleteEvent(event);
    }

    renderEventList(){

        return _.map(this.props.events.events,(event) => {
            if((event.club_id == this.props.currentUser.user.club_id || this.props.currentUser.admin)) {
                return (
                    <List.Item>
                        <List.Content floated='right'>
                            <List.Icon><AddCategories event={event}/></List.Icon>
                            <EditEvent event={event}/>
                            {this.props.currentUser.admin &&
                            <List.Icon onClick={() => this.deleteEvent(event)} size="large" name="delete"/>
                            }
                        </List.Content>
                        <List.Icon><Flag name={event.location}/></List.Icon>
                        <List.Content>
                            <List.Header><a>{event.title} {stringHelper.limitTo(event.date, 10)}</a></List.Header>
                            <List.Description>Added by: <a><b>{event.user.username} </b></a>
                                on: {stringHelper.limitTo(event.created_at, 10)} club:{event.club.name}</List.Description>
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



export default connect(mapStateToProps,{getEventTypes,fetchEvents,deleteEvent})(Events);