import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from '../../layouts/defaultLayout';
import BigCalendar from 'react-big-calendar';
import { fetchUserHostedEvents } from '../../actions/events';
import moment from 'moment';
import { Attending, Hosting } from '../../components/events';
import { Card } from 'semantic-ui-react';
import _ from 'lodash';

BigCalendar.momentLocalizer(moment);

class MyEventsPage extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser.isLoggedIn === false) {
      this.props.history.push('/ranking');
    }
  }

  goToEvent(event) {
    return this.props.history.push(`/event/${event.id}`);
  }

  render() {
    const events = _.map(this.props.currentUser.user.attendence, (attendance) => {
      if (new Date(attendance.event.date.replace(' ', 'T')) >= new Date()) {
        return {
          id: attendance.event.id,
          title: attendance.event.title,
          start: new Date(attendance.event.date.replace(' ', 'T')),
          end: moment(attendance.event.date.replace(' ', 'T')).add(1, 'days'),
        };
      }
    });
    return (
      <DefaultLayout>
        <div style={{ marginTop: '10px' }} className="row">
          <div className="col-md-3">
            <Attending attendence={this.props.currentUser.user.attendence} />
          </div>
          <div className="col-md-4">
            <Hosting userId={this.props.match.params.userId} currentUser={this.props.currentUser} />
          </div>
          <div className="col-md-4">
            <Card fluid>
              <Card.Content style={{ height: '500px' }}>
                <BigCalendar
                  selectable
                  events={events}
                  startAccessor="start"
                  views={['month']}
                  onSelectEvent={event => this.goToEvent(event)}
                />
              </Card.Content>
            </Card>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { fetchUserHostedEvents })(MyEventsPage);
