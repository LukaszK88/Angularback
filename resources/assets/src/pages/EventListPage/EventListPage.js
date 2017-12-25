import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFutureEvents } from '../../actions/events';
import DefaultLayout from '../../layouts/defaultLayout';
import { EventListCard, AddEvent } from '../../components/events';
import { Feed } from 'semantic-ui-react';
import _ from 'lodash';


class EventListPage extends Component {
  componentDidMount() {
    this.props.fetchFutureEvents();
  }

  // todo better name
  filterEventsForClubUser(events) {
    if (this.props.currentUserClubId !== undefined) {
      return _.filter(events, ['club_id', null]).concat(_.filter(events, ['club_id', this.props.currentUserClubId]));
    }
    return _.filter(events, ['club_id', null]);
  }

  renderFutureEvents() {
    const { eventsFuture } = this.props;
    const events = this.filterEventsForClubUser(eventsFuture);

    return _.map(_.orderBy(events, ['date'], ['asc']), event => (
      <EventListCard key={event.id} event={event} />
    ));
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <DefaultLayout>
        {(isLoggedIn) &&
        <div className="row">
          <div className="col-md-12">
            <AddEvent/>
          </div>
        </div>
        }
        <div className="row">
          <div className="col-md-8">
            <Feed style={{ marginTop:10 }} size="large">
              {this.renderFutureEvents()}
            </Feed>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    eventsFuture: state.events.eventsFuture,
    currentUserClubId: state.currentUser.user.club_id,
    isLoggedIn: state.currentUser.isLoggedIn,
  };
}

export default connect(mapStateToProps, { fetchFutureEvents })(EventListPage);
