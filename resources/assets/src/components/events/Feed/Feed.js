import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Feed, Card, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { userHelper } from '../../../helpers/user';

import './Feed.css';

class RankingFeed extends Component {
  renderCategories(attending) {
    return _.map(attending.event_attend_category, category => (
      <span className="feedWeakText">
        <Icon name="protect" size="small" /> <b key={category.id}>{category.name}</b> <br />
      </span>
    ));
  }

  categoryCheck(feed, key) {
    // if(feed.hasOwnProperty(`${key}_id'`) && feed[key] !== null){
    return (
      <span>
        <span className="feedWeakText">{feed[key].points}pts in</span>
        <Link onClick={() => this.props.setActiveCategory(key)} to="/ranking"> {key.replace('_', ' ')}</Link>
        <Feed.Extra text>
            at <Link to={`/event/${feed[key].event_achievement.event_id}`}>{feed[key].event_achievement.title}</Link>
        </Feed.Extra>
      </span>);
    // }
  }

  renderRankingFeedItem(feed) {
    if (feed.hasOwnProperty('bohurt_id') && feed.bohurt !== null) {
      return this.categoryCheck(feed, 'bohurt');
    }
    if (feed.hasOwnProperty('polearm_id') && feed.polearm !== null) {
      return this.categoryCheck(feed, 'polearm');
    }
    if (feed.hasOwnProperty('longsword_id') && feed.longsword !== null) {
      return this.categoryCheck(feed, 'longsword');
    }
    if (feed.hasOwnProperty('profight_id') && feed.profight !== null) {
      return this.categoryCheck(feed, 'profight');
    }
    if (feed.hasOwnProperty('sword_buckler_id') && feed.sword_buckler !== null) {
      return this.categoryCheck(feed, 'sword_buckler');
    }
    if (feed.hasOwnProperty('sword_shield_id') && feed.sword_shield !== null) {
      return this.categoryCheck(feed, 'sword_shield');
    }
    if (feed.hasOwnProperty('triathlon_id') && feed.triathlon !== null) {
      return this.categoryCheck(feed, 'triathlon');
    }
  }

  render() {
    const { feed } = this.props;
    return (
      <Feed.Event>
        <Feed.Label>
          <img src={userHelper.getImage(feed.user)} />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            {(feed.user !== null) &&
            <Feed.User>
              <Link to={`/profile/${feed.user.id}`}>
                {(feed.user.name === null ? 'Fighter' : feed.user.name)}
              </Link>
            </Feed.User>
            }
            {(feed.user === null) &&
            <Feed.User>
              Fighter
            </Feed.User>
            }
            <span className="feedWeakText">{feed.body}</span>
            {(feed.event !== null) && <Link to={`/event/${feed.event.id}`}>{feed.event.title}</Link>}
            {(feed.achievement !== null) && <Link to={`/profile/${feed.user.id}`}><span dangerouslySetInnerHTML={{ __html: feed.achievement.cup }} /></Link>}
            {(feed.club !== null) && <Link to={`/club/${feed.club.id}`}>{feed.club.name}</Link>}
            {(feed.club_id === 0) && <span>mercenary</span>}
            {(feed.club_join_id !== null) &&  <Link to={`/club/${feed.club_join_id}`}>
              {feed.user === null ? 'Here' : feed.user.club.name }
              </Link>}
            {(feed.event_attendance !== null) &&
            <span>
                <Link to={`/event/${feed.event_attendance.event_id}`}>{feed.event_attendance.event.title}</Link>
              {(feed.event_attendance.event_attend_category.length !== 0) &&
              <Feed.Extra text>
                <div className="feedWeakText"> will fight in:</div>
                {this.renderCategories(feed.event_attendance)}
              </Feed.Extra>
              }
              </span>
            }
            {(feed.bohurt_id || feed.polearm_id || feed.sword_shield_id || feed.sword_buckler_id || feed.longsword_id || feed.profight_id || feed.triathlon_id) &&
            <span>{this.renderRankingFeedItem(feed)}</span>
            }
            <Feed.Date>{moment(new Date(feed.created_at.replace(' ', 'T'))).from(new Date())}</Feed.Date>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(RankingFeed);
