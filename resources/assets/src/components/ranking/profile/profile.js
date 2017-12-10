import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from '../../../layouts/defaultLayout';
import { fetchUser } from '../../../actions';
import { fetchAchievements } from '../../../actions/ranking';
import { baseUrl } from '../../../index';
import { fetchEvents, fetchUserEvents } from '../../../actions/events';
import UserImage from './partials/userImage';
import ProfileInfo from './partials/profileInfo';
import Achievements from './partials/achievements';

class Profile extends Component {
  componentWillReceiveProps(newProps) {
    if (this.props.match.params.userId !== newProps.match.params.userId) {
      console.log('test');
      this.props.fetchUser(newProps.match.params.userId);
      this.props.fetchAchievements(newProps.match.params.userId);
    }
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId, (response) => {
      this.props.fetchUserEvents(response.data.club_id);
    });
    this.props.fetchAchievements(this.props.match.params.userId);
  }

  render() {
    const { profile } = this.props;

    if (!profile) {
      return <div>Loading...</div>;
    }

    return (
      <DefaultLayout>
        <div className="row">
          <UserImage profile={profile} currentUser={this.props.currentUser} />
          <ProfileInfo profile={profile} />
          <Achievements profile={profile} currentUser={this.props.currentUser} />
        </div>
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    currentUser: state.currentUser,
    events: state.events,
  };
}


export default connect(mapStateToProps, {
  fetchUser, fetchAchievements, fetchEvents, fetchUserEvents,
})(Profile);
