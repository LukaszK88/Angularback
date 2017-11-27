import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Image } from 'semantic-ui-react';
import { userHelper } from '../../../helpers/user';
import { fetchLeaderboard } from '../../../actions/ranking';
import { Link } from 'react-router-dom';
import _ from 'lodash';

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
          <div className="col-sm-7 col-6 ">
            <List.Content>
              <List.Header><Link to={`/profile/${row.id}`}> {row.name}</Link></List.Header>
              <Link to={`/club/${row.club.id}`}>{row.club.name}</Link>
            </List.Content>
          </div>

          <div className="col-sm-1 text-center">
            {row.category}
          </div>
          <div className="col-sm-1 text-center">
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
            <div className="col-sm-1" />
            <div className="col-sm-7 " />
            <div className="col-sm-1 text-center">
                      Category
            </div>
            <div className="col-sm-1 text-center">
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
