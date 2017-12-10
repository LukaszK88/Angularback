import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from '../../layouts/defaultLayout';
import { fetchEvent, notGoingToEvent } from '../../actions/events';
import NavbarComp from '../home/partials/navbar';
import FlashMessages from '../../helpers/message';
import { Card, Icon, Image, List, Button, Flag, Feed } from 'semantic-ui-react';
import { stringHelper } from '../../helpers/string';
import _ from 'lodash';
import Attend from './attend';
import { userHelper } from '../../helpers/user';
import { Link } from 'react-router-dom';
import GoogleMap from './partials/map';

class EventPage extends Component {
  constructor(props) {
    super();

    this.state = {
      attending: false,
    };
  }
  componentWillReceiveProps(newProps) {
    if (this.props.match.params.eventId !== newProps.match.params.eventId) {
      this.props.fetchEvent(newProps.match.params.eventId);
    }
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
  }

  componentWillUpdate(nextProps) {
    if (this.state.attending == false && nextProps.events.event != null && nextProps.currentUser.isLoggedIn) {
      const isUserAttending = _.find(nextProps.events.event.attendance, attendance => attendance.user_id == nextProps.currentUser.user.id);
      if (isUserAttending) {
        this.setState({ attending: true });
      }
    }
  }


  renderCategories() {
    const { event } = this.props.events;

    const attendees = _.filter(event.attendance, attendee => attendee.event_attend_category != null);

    let attendedCategories = [];

    _.forEach(attendees, (attendee) => {
      attendedCategories = attendedCategories.concat(attendee.event_attend_category);
    });

    return _.map(event.category, (category) => {
      const count = _.filter(attendedCategories, cat => cat.name == category.name);
      return (
        <List.Item key={category.id}>
          <Icon name="protect" />
          <List.Content>
            <List.Header>{category.name}</List.Header>
            {count.length > 0 ? `${count.length} attending` : '0 attending'}
          </List.Content>
        </List.Item>
      );
    });
  }
  renderAttendees() {
    const { event } = this.props.events;

    return _.map(event.attendance, attendance => (
      <Feed.Event key={attendance.id}>
        <Feed.Label image={userHelper.getImage(attendance.user)} />
        <Feed.Content>
          <Feed.Summary>
            <Link to={`/profile/${attendance.user.id}`}>   {attendance.user.name == null ? 'anonymous?' : attendance.user.name} </Link>
          </Feed.Summary>
          <Feed.Date>{stringHelper.limitTo(attendance.created_at, 10)}</Feed.Date>
        </Feed.Content>
      </Feed.Event>
    ));
  }

  notGoing() {
    this.props.notGoingToEvent(this.props.events.event.id, this.props.currentUser.user.id);
    this.setState({ attending: false });
  }

  render() {
    const { event } = this.props.events;
    if (event == null) {
      return <p>loading...</p>;
    }
    return (
      <DefaultLayout>
        <div className="row">
          <div className="col-md-8">
            <Card fluid >
              <Card.Content >
                <Card.Header>
                  {event.title} in <Flag name={event.location} />
                  {this.props.currentUser.isLoggedIn == true &&
                  <div className="float-right">
                    <div className="ui two buttons">
                      <Attend currentUser={this.props.currentUser} event={event} />
                      {this.state.attending == true &&
                      <Button onClick={() => { this.notGoing(); }} basic color="red">Not Going</Button>
                                                    }
                    </div>
                  </div>
                                            }
                </Card.Header>
                <Card.Meta>
                                            Event date: {stringHelper.limitTo(event.date, 10)}
                  {(event.end) &&
                  <span> to: {stringHelper.limitTo(event.end, 10)}</span>
                                            }
                </Card.Meta>
              </Card.Content>
              {event.body &&
              <Card.Content>
                <Card.Header>
                                            Event Description
                </Card.Header>
                <p>
                  {event.body}
                </p>
              </Card.Content>
                                    }
              <Card.Content>
                <Card.Header className="text-center">
                                            Event Categories
                </Card.Header>
                <List horizontal>
                  {this.renderCategories()}
                </List>
              </Card.Content>
            </Card>
          </div>
          <div className="col-md-4">
            {(event.attendance.length > 0) &&
            <Card fluid>
              <Card.Content>
                <Card.Header className="text-center">
                                            Attending
                  <div className="pull-right">
                    <Icon name="users" size="large" />
                    {event.attendance.length > 0 ? event.attendance.length : '0'}
                  </div>
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  {this.renderAttendees()}
                </Feed>
              </Card.Content>
            </Card>
                                }
          </div>
        </div>
        {(event.lng && event.lat) &&
        <div className="row">
          <div className="col-md-8">
            <GoogleMap lng={parseFloat(event.lng)} lat={parseFloat(event.lat)} />
          </div>
        </div>
                        }
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    currentUser: state.currentUser,
  };
}


export default connect(mapStateToProps, { fetchEvent, notGoingToEvent })(EventPage);
