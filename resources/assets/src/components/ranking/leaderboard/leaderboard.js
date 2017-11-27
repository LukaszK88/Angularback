import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { List, Image } from 'semantic-ui-react';
import { userHelper } from '../../../helpers/user';
import { fetchLeaderboard } from '../../../actions/ranking';

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      fighters: [],
    };
  }

  renderFighters() {
    return _.map(this.props.leaderboard, row => (
      <List.Item>
        <div className="row">
          <div className="col-sm-1 col-2">
            <Image avatar src={userHelper.getImage(row)} />
          </div>
          <div className="col-sm-8 col-5 ">
            <List.Content>
              <List.Header><Link to={`/profile/${row.id}`}> {row.name}</Link></List.Header>
              <Link to={`/club/${row.club.id}`}>{row.club.name}</Link>
            </List.Content>
          </div>

          <div className="col-sm-1 col-3 leaderboardCategory">
            {row.category}
          </div>
          <div className="col-sm-1 col-2 text-center align-center">
            {row.max_points}
          </div>
        </div>
      </List.Item>
    ));
  }

  render() {
    return (
      <List celled size="large" relaxed="very" verticalAlign="middle">
        <List.Item>
          <div className="row ">
            <div className="col-sm-1 col-2" />
            <div className="col-sm-8 col-5" />
            <div className="col-sm-1 col-3 text-center">
                      Category
            </div>
            <div className="col-sm-1 col-2 text-center">
                      Stat
            </div>
          </div>
        </List.Item>
        {this.renderFighters()}
      </List>
    );
  }
}

function mapStateToProps(state) {
  return {leaderboard: state.leaderboard};
}

export default connect(mapStateToProps, { fetchLeaderboard })(Leaderboard);
