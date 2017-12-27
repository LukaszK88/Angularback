import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFutureEvents, fetchFeed, setActiveCategory } from '../../actions';
import DefaultLayout from '../../layouts/defaultLayout';
import { EventListCard, AddEvent } from '../../components/events';
import { Feed, Card, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import { userHelper } from '../../helpers/user';
import moment from 'moment';
import { Link } from 'react-router-dom';

class EventListPage extends Component {
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

  renderCategories(attending) {
    return _.map(attending.event_attend_category, category => (
      <span>
        <Icon name="protect" size="small" /> <b key={category.id}>{category.name}</b> <br />
      </span>
    ));
  }

  renderRankingFeedItem(feed) {
    if(feed.hasOwnProperty('bohurt_id') && feed.bohurt !== null){
      return (
        <span>
          {feed.bohurt.points}pts in
          <Link onClick={() => this.props.setActiveCategory('Bohurt')} to="/ranking"> bohurt</Link>
        </span>);
    }
    if(feed.hasOwnProperty('polearm_id') && feed.polearm !== null){
      return (
        <span>
          {feed.polearm.points}pts in
          <Link onClick={() => this.props.setActiveCategory('Polearm')} to="/ranking"> polearm</Link>
        </span>);
    }
    if(feed.hasOwnProperty('longsword_id') && feed.longsword !== null){
      return (
        <span>
          {feed.longsword.points}pts in
          <Link onClick={() => this.props.setActiveCategory('Longsword')} to="/ranking"> longsword</Link>
        </span>);
    }
    if(feed.hasOwnProperty('profight_id') && feed.profight !== null){
      return (
        <span>
          {feed.bohurt.points}pts in
          <Link onClick={() => this.props.setActiveCategory('Profight')} to="/ranking"> profight</Link>
        </span>);
    }
    if(feed.hasOwnProperty('sword_buckler_id') && feed.sword_buckler !== null){
      return (
        <span>
          {feed.sword_buckler.points}pts in
          <Link onClick={() => this.props.setActiveCategory('Sword&Buckler')} to="/ranking"> sword&buckler</Link>
        </span>);
    }
    if(feed.hasOwnProperty('sword_shield_id') && feed.sword_shield !== null){
      return (
        <span>
          {feed.sword_shield.points}pts in
          <Link onClick={() => this.props.setActiveCategory('Sword&Shield')} to="/ranking"> sword&shield</Link>
        </span>);
    }
    if(feed.hasOwnProperty('triathlon_id') && feed.triathlon !== null){
      return (
        <span>
          {feed.triathlon.points}pts in
          <Link onClick={() => this.props.setActiveCategory('Triathlon')} to="/ranking"> triathlon</Link>
        </span>);
    }
  }

  renderFeed() {
    return _.map(_.orderBy(this.props.feed, ['created_at'], ['desc']), feed => (
      <Feed.Event>
        <Feed.Label>
          <img src={userHelper.getImage(feed.user)} />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>
              <Link to={`/profile/${feed.user.id}`}>
                {(feed.user.name === null ? 'Fighter' : feed.user.name)}
              </Link>
            </Feed.User>
            <span>{feed.body}</span>
            {(feed.event_id !== null) && <Link to={`/event/${feed.event.id}`}>{feed.event.title}</Link>}
            {(feed.achievement_id !== null) && <Link to={`/profile/${feed.user.id}`}><span dangerouslySetInnerHTML={{ __html: feed.achievement.cup }} /></Link>}
            {(feed.club_id !== null) && <Link to={`/club/${feed.club.id}`}>{feed.club.name}</Link>}
            {(feed.event_attendance_id !== null) &&
              <span>
                <Link to={`/event/${feed.event_attendance.event_id}`}>{feed.event_attendance.event.title}</Link>
                <Feed.Extra text>
                  <div> will fight in:</div>
                  {this.renderCategories(feed.event_attendance)}
                </Feed.Extra>
              </span>
            }
            {(feed.bohurt_id || feed.polearm_id || feed.sword_shield_id || feed.sword_buckler_id || feed.longsword_id || feed.profight_id || feed.triathlon_id) &&
            <span>{this.renderRankingFeedItem(feed)}</span>
            }
            <Feed.Date>{moment(new Date(feed.created_at)).from(new Date())}</Feed.Date>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    ));
  }

  render() {
    const { isLoggedIn } = this.props;
    console.log(this.props.feed);
    return (
      <DefaultLayout>
        {(isLoggedIn) &&
        <div className="row">
          <div className="col-md-12">
            <AddEvent />
          </div>
        </div>
        }
        <div className="row">
          <div className="col-sm-7 col-12">
            <Feed style={{ marginTop: 10 }} size="large">
              {this.renderFutureEvents()}
            </Feed>
          </div>
          <div className="col-sm-5 col-12">
            <Card fluid >
              <h4 className="text-center">Feed</h4>
              <Card.Content style={{ padding: '5px 5px' }}>
                <Feed>
                  {this.renderFeed()}
                </Feed>
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
    eventsFuture: state.events.eventsFuture,
    currentUserClubId: state.currentUser.user.club_id,
    isLoggedIn: state.currentUser.isLoggedIn,
    feed: state.feed.feed,
  };
}

export default connect(mapStateToProps, { fetchFutureEvents, fetchFeed, setActiveCategory })(EventListPage);
