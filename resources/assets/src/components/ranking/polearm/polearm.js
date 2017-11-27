import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';
import { userHelper } from '../../../helpers/user';
import UpdatePolearm from './polearmUpdate';

class Polearm extends Component {
  renderFighters() {
    const { admin, clubAdmin } = this.props.currentUser;

    const fighters = _.orderBy(this.props.fighters, ['polearmTable.points'], ['desc']);
    return _.map(fighters, (fighter, index) => (
      <List.Item>
        <div className="row">
          <div className="index-number">{index + 1}</div>
          <div className="col-sm-1 col-2">
            <Image avatar src={userHelper.getImage(fighter)} />
          </div>
          <div className="col-sm-7 col-6 ">
            <List.Content>
              <List.Header><Link to={`/profile/${fighter.id}`}> {fighter.name}</Link></List.Header>
              <Link to={`/club/${fighter.club.id}`}>{fighter.club.name}</Link>
            </List.Content>
          </div>

          <div className="col-sm-1 text-center hidden-xs-down align-center">
            {fighter.polearmTable.win}
          </div>
          <div className="col-sm-1 text-center hidden-xs-down borderLeft">
            {fighter.polearmTable.loss}
          </div>
          <div className="col-sm-1 text-center hidden-xs-down borderLeft">
            {fighter.polearmTable.points}
          </div>
          <div className="col-2 hidden-sm-up">
            <div className="small text-center">points</div>
            <div className="small text-center">{fighter.polearmTable.points}</div>
          </div>
          { ((clubAdmin === fighter.club_id) || admin) &&
            <div className="col-sm-1 col-2 update-ranking">
              <UpdatePolearm events={this.props.events} fighter={fighter} />
            </div>
            }
        </div>
        <hr className="hidden-sm-up" />
        <div className="row hidden-sm-up">
          <div className="col-6">
            <div className="small text-center">win</div>
            <div className="small text-center">{fighter.polearmTable.win}</div>
          </div>
          <div className="col-6">
            <div className="small text-center">last man</div>
            <div className="small text-center">{fighter.polearmTable.loss}</div>
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
                <span className="text-green">1pt</span> - Win
              </p>
            </div>
          </div>
          <List.Item>
            <div className="row hidden-xs-down">
              <div className="col-sm-1" />
              <div className="col-sm-7 " />
              <div className="col-sm-1 text-center">
                          Win
              </div>
              <div className="col-sm-1 text-center">
                          Lost
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

export default connect(mapStateToProps)(Polearm);
