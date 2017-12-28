import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFighterFromClub, replaceCaptain, fetchEventsAchievements } from '../../../actions';
import { Card, Icon, Image, List, Button, Popup, Grid } from 'semantic-ui-react';
import { userHelper } from '../../../helpers/user';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import AddFighter from '../partials/AddFighter';
import { DeleteConfirmIcon } from '../../index';
import UpdateBohurt from '../../ranking/bohurt/bohurtUpdate';
import UpdateProfight from '../../ranking/profight/profightUpdate';
import UpdateLongsword from '../../ranking/longsword/longswordUpdate';
import UpdatePolearm from '../../ranking/polearm/polearmUpdate';
import UpdateTriathlon from '../../ranking/triathlon/triathlonUpdate';
import UpdateSwordBuckler from '../../ranking/swordBuckler/swordBucklerUpdate';
import UpdateSwordShield from '../../ranking/swordShield/swordShieldUpdate';

import './ClubFighters.css';

class ClubFighters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: null,
    };
  }

  componentDidMount() {
    this.props.fetchEventsAchievements();
  }

  handleOpen(fighter) {
    this.setState({ isOpen: fighter.id });
  }

  handleClose() {
    this.setState({ isOpen: null });
  }

  renderClubFighters() {
    const { club } = this.props;

    return _.map(club.fighters, fighter => (
      <List.Item key={fighter.id}>
        {userHelper.isClubAdmin(this.props.currentUser, this.props.club.id) &&
        <List.Content floated="right">
          <Popup
            style={{zIndex: '10'}}
            trigger={<Icon onClick={() => this.handleClose()} name="plus"/>}
            flowing
            position="top left"
            on="click"
            open={this.state.isOpen === fighter.id}
            onOpen={() => this.handleOpen(fighter)}
            hoverable
          >
            <div className="updateFighterRecordContainer">
              <div>
                <UpdateBohurt events={this.props.events} fighter={fighter}/>
              </div>
              <div>
                <UpdateProfight events={this.props.events} fighter={fighter}/>
              </div>
              <div>
                <UpdateSwordShield events={this.props.events} fighter={fighter}/>
              </div>
              <div>
                <UpdateLongsword events={this.props.events} fighter={fighter}/>
              </div>
              <div>
                <UpdatePolearm events={this.props.events} fighter={fighter}/>
              </div>
              <div>
                <UpdateSwordBuckler events={this.props.events} fighter={fighter}/>
              </div>
              <div>
                <UpdateTriathlon events={this.props.events} fighter={fighter}/>
              </div>
            </div>
          </Popup>
          <DeleteConfirmIcon
            iconName="star"
            content="There can be only one captain..., promoting this fighter will demote you"
            header="change captain"
            action={() => this.props.replaceCaptain(fighter.id, this.props.currentUser.user)}
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
        }
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
            {(this.props.club.id !== 1 ? 'Club Fighters' : 'Mercenaries')}
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
  return {
    events: state.events.eventsAchievements,
  };
}

export default connect(mapStateToProps, { removeFighterFromClub, replaceCaptain, fetchEventsAchievements })(ClubFighters);
