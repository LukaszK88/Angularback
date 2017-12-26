import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from '../../../layouts/defaultLayout';
import { fetchUser } from '../../../actions';
import { fetchAchievements } from '../../../actions/ranking';
import { baseUrl } from '../../../index';
import { fetchEvents, fetchEventsAchievements } from '../../../actions/events';
import UserImage from './partials/userImage';
import ProfileInfo from './partials/profileInfo';
import Achievements from './partials/achievements';

class Profile extends Component {
  componentWillReceiveProps(newProps) {
    if (this.props.match.params.userId !== newProps.match.params.userId) {
      this.props.fetchUser(newProps.match.params.userId);
      this.props.fetchAchievements(newProps.match.params.userId);
    }
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchEventsAchievements();
    this.props.fetchAchievements(this.props.match.params.userId);
  }

  render() {
    const { profile, currentUser } = this.props;

    if (!profile || !currentUser) {
      return <div>Loading...</div>;
    }

    return (
      <DefaultLayout>
        <div className="row">
          <UserImage user={this.props.user} profile={profile} currentUser={currentUser} />
          <ProfileInfo profile={profile} />
          <Achievements events={this.props.eventsAchievements} profile={profile} currentUser={this.props.currentUser} />
        </div>
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    profile: state.profile,
    currentUser: state.currentUser,
    eventsAchievements: state.events.eventsAchievements,
  };
}


export default connect(mapStateToProps, {
  fetchUser, fetchAchievements, fetchEvents, fetchEventsAchievements,
})(Profile);
