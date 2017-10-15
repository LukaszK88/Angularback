import React,{Component} from 'react';
import { connect } from 'react-redux'
import {fetchEventsByType} from '../../actions/events';
import FlashMessages from './../helpers/message';
import NavbarComp from '../home/partials/navbar';
import { Feed, Icon, Flag, Card } from 'semantic-ui-react'
import _ from 'lodash';
import { stringHelper } from '../../helpers/string';
import {Link} from 'react-router-dom';
import  Countdown from 'react-cntdwn';
class EventsList extends Component{
    componentDidMount(){
        this.props.fetchEventsByType(1);
    }

    renderFutureEvents(){
        const{eventsList} = this.props.events;

        return _.map(eventsList,(event) => {
            if(event.future == true){
                return(
                    <Feed.Event key={event.id}>
                        <Feed.Label > <Flag name={event.location}/></Feed.Label>
                        <Feed.Content>
                            <Feed.Summary>
                                <Feed.User><Link to={`/event/${event.id}`}>  {event.title}</Link></Feed.User> Added by: {event.user.name}

                                <Feed.Date>
                                    <Countdown targetDate={new Date(event.date)}
                                               format={{
                                                   day: 'DD',
                                                   hour: 'HH',
                                                   minute: 'MM',
                                                   second: 'SS'
                                               }}
                                               interval={1000}
                                               timeSeparator={':'}
                                               leadingZero
                                    />
                                </Feed.Date>
                                <Feed.Date>
                                To go!
                                </Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra text>
                                {event.category.length > 0 ?  `${event.category.length} Categories` : 'no Categories'}
                            </Feed.Extra>
                            <Feed.Meta>
                            <Feed.Like>
                                <Icon name='users' size="large"/>
                                {event.attendance.length > 0 ? event.attendance.length : '0'}
                            </Feed.Like>
                            </Feed.Meta>
                        </Feed.Content>

                            </Feed.Event>
                )
            }
        })
    }


    render(){
        return(
            <div>
                <FlashMessages/>
                <NavbarComp/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <Card fluid>
                                <Card.Content>
                                    <Feed size='large'>
                                        {this.renderFutureEvents()}
                                    </Feed>
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
    return { events:state.events};
}



export default connect(mapStateToProps,{fetchEventsByType})(EventsList);