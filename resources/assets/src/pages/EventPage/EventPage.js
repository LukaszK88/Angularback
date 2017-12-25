import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from '../../layouts/defaultLayout';
import { fetchEvent } from '../../actions/events';
import { EventPageCard, EventPageAttendance, EventPageMap } from '../../components/events/EventPageContent';

class EventPage extends Component {
  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.eventId !== newProps.match.params.eventId) {
      this.props.fetchEvent(newProps.match.params.eventId);
    }
  }

  render() {
    const { event, currentUser } = this.props;
    return (
      <DefaultLayout>
        {event !== null &&
        <div>
          <div style={{ marginTop: '10px' }} className="row">
            <div className="col-md-8">
              <EventPageCard event={event} currentUser={currentUser} />
            </div>
            <div className="col-md-4">
              {(event.attendance.length > 0) &&
              <EventPageAttendance attendance={event.attendance} />
            }
            </div>
          </div>
          {(event.lng && event.lat) &&
          <div className="row">
            <div className="col-md-8">
              <EventPageMap lng={parseFloat(event.lng)} lat={parseFloat(event.lat)} />
            </div>
          </div>
        }
        </div>
        }
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.events.event,
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { fetchEvent })(EventPage);
