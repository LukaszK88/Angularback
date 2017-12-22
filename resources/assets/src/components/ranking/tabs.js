import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Bohurt,
  Profight,
  SwordShield,
  Longsword,
  SwordBuckler,
  Polearm,
  Triathlon,
  Leaderboard,
  Total,
} from '../ranking';
import { Button } from 'semantic-ui-react';
import { fetchFighters, fetchLeaderboard, setActiveCategory, setActiveSeason } from '../../actions/ranking';
import { fetchEvents } from '../../actions/events';
import { fetchClubs } from '../../actions/clubs';
import { Field, reduxForm, change } from 'redux-form';
import _ from 'lodash';
import { Tooltip } from 'reactstrap';
import { addFlashMessage } from '../../actions/flashMessages';
import UpdateUser from '../home/partials/userInfo';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import DefaultLayout from '../../layouts/defaultLayout';
import { input } from '../../helpers/input';

class TabsComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: [],
      navClass: '',
      open: false,
      openSecondary: false,
      clubId: null,
      tooltipOpen: false,
    };
  }

  componentDidMount() {
    this.props.fetchClubs();
    this.props.fetchFighters();
    this.props.fetchEvents();
    this.props.fetchLeaderboard();
    this.props.setActiveSeason('2017');
    this.props.setActiveCategory('Total');
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.clubId == null && nextProps.currentUser.isLoggedIn) {
      if (nextProps.currentUser.user.club == null) {
        if (!nextProps.currentUser.user.name || nextProps.currentUser.user.club_id == 0) {
          this.props.addFlashMessage('success', 'Update your club and name to be displayed', <UpdateUser class="fake-link" />);
        }
        this.props.dispatch(change('filterClubs', 'club_id', 0));
        this.props.fetchFighters(0);
        this.setState({ clubId: 0 });
      } else {
        this.props.dispatch(change('filterClubs', 'club_id', nextProps.currentUser.user.club.id));
        this.setState({ clubId: nextProps.currentUser.user.club.id });
        this.props.fetchFighters(nextProps.currentUser.user.club.id);
      }
    }
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }
  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleToggleSecondary() {
    this.setState({ openSecondary: !this.state.openSecondary });
  }

  reFetchFightersByClub(e, clubId) {
    this.setState({ clubId });
    this.props.fetchFighters(clubId);
  }

  reFetchFightersByYear(year) {
    this.props.fetchFighters(this.state.clubId, year);
    this.props.setActiveSeason(year);
    this.handleToggleSecondary();
  }

  switchCategory(category) {
    this.props.setActiveCategory(category);
    this.handleToggle();
  }

  render() {
    const all = [{ key: '0', value: '0', text: 'All Clubs' }];
    const clubs = _.map(this.props.clubs.clubs, club => ({
      key: club.id, value: club.id, flag: club.country, text: club.name,
    }));

    const options = all.concat(clubs);

    if (!this.props.ranking) {
      return <div>Loading...</div>;
    }

    return (
      <DefaultLayout>
        <div className="row topRow">
          <div className="col-4">
            <Button
              onClick={() => this.handleToggle()}
              color="black"
            >{this.props.ranking.category}
            </Button>
            <Drawer
              containerClassName="bg"
              width={150}
              onRequestChange={open => this.setState({ open })}
              docked={false}
              open={this.state.open}
            >
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('Total')}>Total</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('Leaderboard')}>Leaderboard</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('Bohurt')}>Bohurt</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('Profight')}>Profight</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('Sword&Shield')}>Sword&Shield</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('Longsword')}>Longsword</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('Sword&Buckler')}>Sword&Buckler</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('Triathlon')}>Triathlon</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('Polearm')}>Polearms</MenuItem>
            </Drawer>
          </div>
          <div className="col-4">
            <Tooltip
              placement="left"
              isOpen={this.state.tooltipOpen}
              target="select"
              toggle={this.toggle.bind(this)}
            >
              Select Club to filter Ranking
            </Tooltip>
            <div id="select" className="club-dropdown">
              <Field
                label="Filter by Club"
                name="club_id"
                placeholder="Filter by Club"
                options={options}
                component={input.renderSelect}
                onChange={this.reFetchFightersByClub.bind(this)}
              />
            </div>
          </div>
          <div className="col-4">
            <Button
              className="float-right"
              onClick={() => this.handleToggleSecondary()}
              color="black"
            >{this.props.ranking.season}
            </Button>
            <Drawer
              containerClassName="bg"
              width={80}
              openSecondary
              onRequestChange={openSecondary => this.setState({ openSecondary })}
              docked={false}
              open={this.state.openSecondary}
            >
              <MenuItem
                onClick={() => this.props.fetchFighters(this.state.clubId)}
                className="menuDrawerItem">
                Total
              </MenuItem>
              <MenuItem onClick={() => this.reFetchFightersByYear('2018')} className="menuDrawerItem">2018</MenuItem>
              <MenuItem onClick={() => this.reFetchFightersByYear('2017')} className="menuDrawerItem">2017</MenuItem>
            </Drawer>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {this.props.ranking.category === 'Total' &&
            <Total
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'Leaderboard' &&
            <Leaderboard
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'Bohurt' &&
            <Bohurt
              events={this.props.events}
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'Profight' &&
            <Profight
              events={this.props.events}
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'Sword&Shield' &&
            <SwordShield
              events={this.props.events}
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'Longsword' &&
            <Longsword
              events={this.props.events}
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'Sword&Buckler' &&
            <SwordBuckler
              events={this.props.events}
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'Triathlon' &&
            <Triathlon
              events={this.props.events}
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'Polearm' &&
            <Polearm
              events={this.props.events}
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    ranking: state.ranking,
    events: state.events,
    clubs: state.clubs,
    currentUser: state.currentUser,
    leaderboard: state.leaderboard,
  };
}

export default reduxForm({ form: 'filterClubs' })(connect(mapStateToProps, {
  fetchFighters,
  fetchEvents,
  fetchClubs,
  fetchLeaderboard,
  addFlashMessage,
  setActiveCategory,
  setActiveSeason,
})(TabsComp));
