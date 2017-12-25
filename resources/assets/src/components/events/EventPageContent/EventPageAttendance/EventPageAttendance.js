import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AttendeeListItem } from './AttendeeListItem';
import { Card, Icon, Feed } from 'semantic-ui-react';
import _ from 'lodash';

class EventPageAttendance extends Component {
  renderAttendees() {
    const { attendance } = this.props;

    return _.map(attendance, attendee => (
      <AttendeeListItem key={attendee.id} attendee={attendee} />
    ));
  }

  render() {
    const { attendance } = this.props;
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header className="text-center">
                Attending
            <div className="pull-right">
              <Icon name="users" size="large" />
              {attendance.length > 0 ? attendance.length : '0'}
            </div>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            {this.renderAttendees()}
          </Feed>
        </Card.Content>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(EventPageAttendance);
