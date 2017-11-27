import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { userHelper } from '../../../helpers/user';

class Total extends Component {
  renderFighters() {
    const fighters = _.orderBy(this.props.fighters, ['total_points'], ['desc']);
    return _.map(fighters, (fighter, index) => (
      <List.Item>
        <div className="row">
          {index + 1}
          <div className="col-sm-1 col-2">
            <Image avatar src={userHelper.getImage(fighter)} />
          </div>
          <div className="col-sm-9 col-6 ">
            <List.Content>
              <List.Header><Link to={`/profile/${fighter.id}`}> {fighter.name}</Link></List.Header>
              <Link to={`/club/${fighter.club.id}`}>{fighter.club.name}</Link>
            </List.Content>
          </div>
          <div className="col-sm-1 col-2 ">
            {fighter.total_points}
          </div>
        </div>

      </List.Item>
    ));
  }

  render() {
    return (
      <List celled size="large" relaxed="very">
        <List.Item>
          <div className="row">
            <div className="col-sm-1 col-2" />
            <div className="col-sm-9 col-6" />
            <div className="col-sm-1 col-2">
              Points
            </div>
          </div>

        </List.Item>
        {this.renderFighters()}
      </List>
    );
  }
}

export default Total;
