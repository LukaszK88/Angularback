import React, { Component } from 'react';
import _ from 'lodash';
import { Card, Image, List, Flag } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class ProfileInfo extends Component {
  renderFlags() {
    const { profile } = this.props;
    if (profile.achievements) {
      return _.map(this.props.profile.achievements.data.achievement.countries, achievement => (
        <Flag name={achievement.event.location} />
      ));
    }
  }


  render() {
    const { profile } = this.props;
    return (
      <div className="col-md-5">
        <Card className="profile-card" fluid>
          <Card.Content>
            <Card.Header className="text-center">
                        Fighter Info
            </Card.Header>

          </Card.Content>
          {(!_.isEmpty(profile.user)) &&
            <Card.Content>
              <Card.Header className="flags-display">
                {this.renderFlags()}
              </Card.Header>

              <div className="row">
                <div className="col-md-6">
                  <List>
                    <List.Item
                      icon="certificate"
                      content={`Total points: ${profile.user.total_points}`}
                    />
                    <List.Item icon="certificate" content={`Age: ${profile.user.age}`} />
                    <List.Item icon="certificate" content={`Weight: ${profile.user.weight}`} />
                    <List.Item icon="certificate" content="Quote :" />
                    <List.Item content={`"${profile.user.quote}"`} />
                    <List.Item icon="certificate" content="Club :" />
                    {profile.user.club_id != 0 &&
                    <Link to={`/club/${profile.user.club_id}`}> <Image
                      size="tiny"
                      src={profile.user.club.logo}
                    />
                    </Link>}
                  </List>
                </div>
                <div className="col-md-6">
                  <List>
                    <List.Item
                      icon="certificate"
                      content={`Total Fights: ${
                              profile.user.bohurtTable.fights + profile.user.profightTable.fights + profile.user.swordShieldTable.fights +
                                profile.user.swordBucklerTable.fights + profile.user.longswordTable.fights + profile.user.polearmTable.fights + profile.user.triathlonTable.fights}`}
                    />
                    <List.Item
                      icon="certificate"
                      content={`Bohurt fights: ${profile.user.bohurtTable.fights}`}
                    />
                    <List.Item
                      icon="certificate"
                      content={`S&S fights: ${profile.user.swordShieldTable.fights}`}
                    />
                    <List.Item
                      icon="certificate"
                      content={`S&B fights: ${profile.user.swordBucklerTable.fights}`}
                    />
                    <List.Item
                      icon="certificate"
                      content={`Longsword fights: ${profile.user.longswordTable.fights}`}
                    />
                    <List.Item
                      icon="certificate"
                      content={`Polearm fights: ${profile.user.polearmTable.fights}`}
                    />
                    <List.Item
                      icon="certificate"
                      content={`Triathlon fights: ${profile.user.triathlonTable.fights}`}
                    />
                    <List.Item
                      icon="certificate"
                      content={`Profights fights: ${profile.user.profightTable.fights}`}
                    />
                  </List>
                </div>
              </div>

              <hr />
              <Card.Header className="text-center">
                    About
              </Card.Header>
              <p>
                {profile.user.about}
              </p>
            </Card.Content>
                  }
        </Card>


      </div>
    );
  }
}
