import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image, List, Button, Flag, Feed } from 'semantic-ui-react';
import { stringHelper } from '../../../../helpers/string';
import { notGoingToEvent } from '../../../../actions/events';
import Attend from '../AttendModal';
import _ from 'lodash';

class EventPageCard extends Component {

  renderCategories() {
    const { event } = this.props;

    const attendees = _.filter(event.attendance, attendee => attendee.event_attend_category !== null);

    let attendedCategories = [];

    _.forEach(attendees, (attendee) => {
      attendedCategories = attendedCategories.concat(attendee.event_attend_category);
    });

    return _.map(event.category, (category) => {
      const count = _.filter(attendedCategories, cat => cat.name === category.name);
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

  notGoing() {
    this.props.notGoingToEvent(this.props.event.id, this.props.currentUser.user.id);
  }

  checkIfCurrentUserIsAttendingEvent() {
    if (!_.isEmpty(this.props.currentUser.user)) {
      return _.find(this.props.event.attendance, ['user_id', this.props.currentUser.user.id]);
    }
    return false;
  }

  render() {
    const { event, currentUser } = this.props;

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {event.title} in <Flag name={event.location} />
            {currentUser.isLoggedIn === true &&
            <div className="float-right">
              <div className="ui two buttons">
                <Attend currentUser={this.props.currentUser} event={event} />
                {this.checkIfCurrentUserIsAttendingEvent() &&
                <Button
                  onClick={() => {
                    this.notGoing();
                  }}
                  basic
                  color="red"
                >Not Going
                </Button>
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
    );
  }
}


export default connect(null, { notGoingToEvent })(EventPageCard);
