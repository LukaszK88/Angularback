import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Icon, Image, List, Button } from 'semantic-ui-react';
import { userHelper } from '../../../helpers/user';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import AddFighter from '../partials/AddFighter';

import './ClubFighters.css';

class ClubFighters extends Component {
  renderClubFighters() {
    const { club } = this.props;

    return _.map(club.users, fighter => (
      <List.Item key={fighter.id}>
        <List.Content floated="right" />
        <List.Content floated="left">
          <Image src={userHelper.getImage(fighter)} shape="rounded" size="tiny" />
        </List.Content>
        <List.Content>
          <List.Header><a><Link to={`/profile/${fighter.id}`}>{fighter.name}</Link></a></List.Header>
        </List.Content>
      </List.Item>
    ));
  }

  render() {
    return (
      <Card fluid>
        {userHelper.isClubAdmin(this.props.currentUser, this.props.club.id) &&
        <Card.Content extra>
          <div className="float-right">
            <AddFighter clubId={this.props.club.id}/>
          </div>
        </Card.Content>
        }
        <Card.Content>
          <Card.Header className="text-center" >
            Clubs Fighters
          </Card.Header>
          <List divided verticalAlign="middle">
            {this.renderClubFighters()}
          </List>
        </Card.Content>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({});
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubFighters);
