import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFighterFromClub, replaceCaptain } from '../../../actions';
import { Card, Icon, Image, List, Button, Popup } from 'semantic-ui-react';
import { userHelper } from '../../../helpers/user';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import AddFighter from '../partials/AddFighter';
import { DeleteConfirmIcon } from '../../index';

import './ClubFighters.css';

class ClubFighters extends Component {
  renderClubFighters() {
    const { club } = this.props;

    return _.map(club.fighters, fighter => (
      <List.Item key={fighter.id}>
        <List.Content floated="right" >
          <Popup
            trigger={<Icon name="add" />}
            content="Add ranking record"
          />
          <DeleteConfirmIcon
            iconName="star"
            content="There can be only one captain..., promoting this fighter will demote you"
            header="change captain"
            action={() => this.props.replaceCaptain(fighter.id,this.props.currentUser.user)}
            popupText="Promote to Captain"
          />
          <DeleteConfirmIcon
            iconName="user delete"
            content="Are you sure you want to remove this fighter?"
            header="remove from club"
            action={() => this.props.removeFighterFromClub(fighter.id)}
            popupText="remove from club"
          />
        </List.Content>
        <List.Content floated="left">
          <Image src={userHelper.getImage(fighter)} shape="rounded" size="tiny" />
        </List.Content>
        <List.Content>
          <List.Header><a><Link to={`/profile/${fighter.id}`}>
            {fighter.name}
            {(fighter.club_admin_id === fighter.club_id) ? <Icon name="favorite" /> : ''}
          </Link>
          </a>
          </List.Header>
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
            <AddFighter clubId={this.props.club.id} />
          </div>
        </Card.Content>
        }
        <Card.Content>
          <Card.Header className="text-center" >
            Club Fighters
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

export default connect(mapStateToProps, { removeFighterFromClub, replaceCaptain })(ClubFighters);
