import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Image, List } from 'semantic-ui-react';
import { userHelper } from '../../../helpers/user';
import UpdateBohurt from './bohurtUpdate';

const styles = require('../ranking.css');

class Bohurt extends Component {
  renderFighters() {
    const { admin, clubAdmin } = this.props.currentUser;

    const fighters = _.orderBy(this.props.fighters, ['bohurtTable.points'], ['desc']);
    return _.map(fighters, (fighter, index) => (
      <List.Item>
        <div className="row">
          <div className="index-number">{index + 1}</div>
          <div className="col-sm-1 col-2">
            <Image avatar src={userHelper.getImage(fighter)} />
          </div>
          <div className="col-sm-4 col-6 ">
            <List.Content>
              <List.Header><Link to={`/profile/${fighter.id}`}> {fighter.name}</Link></List.Header>
              {(fighter.club_id !== 0) &&
              <Link to={`/club/${fighter.club.id}`}>{fighter.club.name}</Link>
              }
              {(fighter.club_id === 0) &&
              <span>mercenary</span>
              }
            </List.Content>
          </div>

          <div className="col-sm-1 text-center hidden-xs-down align-center">
            <div className="rankingRecordText">{fighter.bohurtTable.won}</div>
          </div>
          <div className="col-sm-1 text-center hidden-xs-down borderLeft">
            <div className="rankingRecordText">{fighter.bohurtTable.last}</div>
          </div>
          <div className="col-sm-1 text-center hidden-xs-down borderLeft">
            <div className="rankingRecordText">{fighter.bohurtTable.suicide}</div>
          </div>
          <div className="col-sm-1 text-center hidden-xs-down borderLeft">
            <div className="rankingRecordText">{fighter.bohurtTable.down}</div>
          </div>
          <div className="col-sm-1 text-center hidden-xs-down borderLeft">
            <div className="rankingRecordText">{userHelper.ratioBohurt(fighter)}%</div>
          </div>
          <div className="col-sm-1 text-center hidden-xs-down borderLeft">
            <div className="rankingRecordText">{fighter.bohurtTable.points}</div>
          </div>
          <div className="col-2 hidden-sm-up rankingRecordText">
            <div className="small text-center">points</div>
            <div className="small text-center">{fighter.bohurtTable.points}</div>
          </div>
          { ((clubAdmin === fighter.club_id) || admin) &&
          <div className="col-sm-1 col-2 update-ranking">
            <UpdateBohurt events={this.props.events} fighter={fighter} />
          </div>
          }
        </div>
        <hr className="hidden-sm-up" />
        <div className="row hidden-sm-up rankingRecordText">
          <div className="col-2">
            <div className="small text-center">win</div>
            <div className="small text-center">{fighter.bohurtTable.won}</div>
          </div>
          <div className="col-3">
            <div className="small text-center">last man</div>
            <div className="small text-center">{fighter.bohurtTable.last}</div>
          </div>
          <div className="col-2">
            <div className="small text-center">suicide</div>
            <div className="small text-center">{fighter.bohurtTable.suicide}</div>
          </div>
          <div className="col-2">
            <div className="small text-center">down</div>
            <div className="small text-center">{fighter.bohurtTable.down}</div>
          </div>
          <div className="col-2">
            <div className="small text-center">ratio</div>
            <div className="small text-center">{userHelper.ratioBohurt(fighter)}%</div>
          </div>
        </div>
      </List.Item>
    ));
  }

  render() {
    return (
      <List celled size="large" relaxed="very" verticalAlign="middle">
        <List.Item>
          <div className="row">
            <div className="col-sm-12 col-12">
              <p className="category-points">
                <span className="text-green">2pts</span> - Won and standing |
                <span className="text-green">1pt</span> - Last man standing |
                <span className="text-red">-3pts</span> - Suicide
              </p>
            </div>
          </div>
          <List.Item>
            <div className="row hidden-xs-down rankingRecordText">
              <div className="col-sm-1" />
              <div className="col-sm-4 " />
              <div className="col-sm-1 text-center">
                Win
              </div>
              <div className="col-sm-1 text-center">
                Last
              </div>
              <div className="col-sm-1 text-center">
                Suicide
              </div>
              <div className="col-sm-1 text-center ">
                Down
              </div>
              <div className="col-sm-1 text-center">
                Ratio
              </div>
              <div className="col-sm-1 text-center">
                Points
              </div>
            </div>

          </List.Item>
        </List.Item>
        {this.renderFighters()}
      </List>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps)(Bohurt);
