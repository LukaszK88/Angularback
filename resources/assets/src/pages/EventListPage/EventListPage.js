import React, { Component } from 'react';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import { fetchFutureEvents, fetchFeed, setActiveCategory } from '../../actions';
import DefaultLayout from '../../layouts/defaultLayout';
import { EventListCard, AddEvent } from '../../components/events';
import { RankingFeed } from '../../components';
import { Feed, Card, Icon, Button } from 'semantic-ui-react';
import _ from 'lodash';

import './EventListPage.css';

class EventListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleEventsMobile: false,
    };
  }

  toggleEvents() {
    this.setState({ toggleEventsMobile: !this.state.toggleEventsMobile });
  }
  componentDidMount() {
    this.props.fetchFutureEvents();
    this.props.fetchFeed();
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

  renderFeed() {
    return _.map(this.props.feed, feed => (
      <RankingFeed feed={feed} />
    ));
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <DefaultLayout>
        <div className="row">
          {(isLoggedIn) &&
          <div className="col-md-12 hidden-sm-down">
            <AddEvent/>
          </div>
          }
          <div className="col-md-12 hidden-sm-up">
            <Button onClick={() => this.toggleEvents()} color="black">
              {(this.state.toggleEventsMobile ? 'Show ranking feed' : 'Show upcoming events')}
            </Button>
            {(this.state.toggleEventsMobile && isLoggedIn) &&
            <AddEvent />
            }
          </div>
        </div>
        <div style={{ marginTop: 10 }} className="row">
          <div className={
            classNames(
'col-sm-7', 'col-12',
              (this.state.toggleEventsMobile ? 'hideFeed' : 'showFeed'),
              )}
          >
            <Card fluid >
              <h4 style={{ padding: '10px 0px' }} className="text-center">Feed</h4>
              <Card.Content style={{ padding: '5px 5px' }}>
                <Feed>
                  {this.renderFeed()}
                </Feed>
              </Card.Content>
            </Card>
          </div>
          <div className={classNames(
            'col-sm-5', 'col-12',
            (this.state.toggleEventsMobile ? 'showEvents' : 'hideEvents'),
          )}
          >
            <Feed size="large">
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
    feed: state.feed.feed,
  };
}

export default connect(mapStateToProps, { fetchFutureEvents, fetchFeed, setActiveCategory })(EventListPage);
