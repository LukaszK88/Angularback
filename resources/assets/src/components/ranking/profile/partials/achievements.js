import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddAchievement from './../addAchievement';
import { Card, Icon, List, Flag } from 'semantic-ui-react';
import _ from 'lodash';
import { stringHelper } from '../../../../helpers/string';
import UpdateAchievement from './../updateAchievement';
import { fetchAchievements } from '../../../../actions/ranking';
import DeleteConfirmation from './deleteAchievement';

class Achievements extends Component {
  isCurrentlyLoggedInUser() {
    const { profile, currentUser } = this.props;

    if (currentUser.user && profile.user) {
      if (currentUser.user.id == profile.user.id) {
        return true;
      }
    }

    return false;
  }

  renderAchievements() {
    const { profile } = this.props;
    if (profile.achievements) {
      const achievements = _.orderBy(profile.achievements.data.data, ['event_achievement.date'], ['desc']);
      return _.map(achievements, achievement => (
        <List.Item>
          <List.Icon dangerouslySetInnerHTML={{ __html: achievement.cup }} />
          <List.Content>
            <List.Header><Flag name={achievement.event_achievement.location} />{achievement.event_achievement.title}</List.Header>
            <List.Description>
              {achievement.category} | {achievement.place} | {stringHelper.limitTo(achievement.event_achievement.date, 10)}
            </List.Description>
          </List.Content>
          { this.isCurrentlyLoggedInUser() &&
          <DeleteConfirmation achievement={achievement} />
                        }
          { this.isCurrentlyLoggedInUser() &&
          <UpdateAchievement events={this.props.events} achievement={achievement} />
                        }
        </List.Item>
      ));
    }
  }
  render() {
    return (
      <div className="col-md-4">
        <Card className="profile-card" fluid>
          <Card.Content>
            <Card.Header>
                        Achievements
              {this.isCurrentlyLoggedInUser() &&
                <AddAchievement events={this.props.events} />
                        }
              <Card.Meta>
                <div className="row">
                  <div className="col-xs-3">
                    <Icon color="yellow" size="large" name="trophy" />
                  </div>
                  <div className="col-xs-3">
                    <Icon color="grey" size="large" name="trophy" />
                  </div>
                  <div className="col-xs-3">
                    <Icon color="brown" size="large" name="trophy" />
                  </div>
                </div>
                { this.props.profile.achievements ?
                  <div className="row">
                    <div className="col-xs-2">
                      <span style={{ marginLeft: '5px' }} className="badge badge-pill badge-warning">{this.props.profile.achievements.data.achievement.gold}</span>
                    </div>
                    <div className="col-xs-2">
                      <span style={{ marginLeft: '5px' }} className="badge badge-pill badge-warning">{this.props.profile.achievements.data.achievement.silver}</span>
                    </div>
                    <div className="col-xs-2">
                      <span style={{ marginLeft: '5px' }} className="badge badge-pill badge-warning">{this.props.profile.achievements.data.achievement.bronze}</span>
                    </div>
                  </div> : ''
                            }
              </Card.Meta>

            </Card.Header>
          </Card.Content>

          <Card.Content>
            <List>
              {this.renderAchievements()}
            </List>
          </Card.Content>

        </Card>
      </div>
    );
  }
}

export default connect(null, { fetchAchievements })(Achievements);
