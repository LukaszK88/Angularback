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
import { fetchEventsAchievements } from '../../actions/events';
import { fetchClubs } from '../../actions/clubs';
import { Field, reduxForm, change } from 'redux-form';
import _ from 'lodash';
import { Tooltip } from 'reactstrap';
import { addFlashMessage } from '../../actions/flashMessages';
import { UpdateUserInfo } from '../index';
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
      clubId: 0,
      tooltipOpen: false,
    };
  }

  componentDidMount() {
    this.props.fetchClubs();
    this.props.fetchFighters();
    this.props.fetchEventsAchievements();
    this.props.fetchLeaderboard();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.clubId == null && nextProps.currentUser.isLoggedIn) {
      if (nextProps.currentUser.user.club == null) {
        if (!nextProps.currentUser.user.name || nextProps.currentUser.user.club_id == 0) {
          this.props.addFlashMessage('success', 'Update your club and name to be displayed', <UpdateUserInfo class="fake-link" />);
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
    if (year === 'total') {
      this.props.fetchFighters(this.state.clubId);
      this.props.setActiveSeason('Total');
    } else {
      this.props.fetchFighters(this.state.clubId, year);
      this.props.setActiveSeason(year);
    }
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
        <div className="row">
          <div className="col-4">
            <Button
              onClick={() => this.handleToggle()}
              color="black"
            >{this.props.ranking.category.replace('_',' ')}
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
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('bohurt')}>Bohurt</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('profight')}>Profight</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('sword_shield')}>Sword&Shield</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('longsword')}>Longsword</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('sword_buckler')}>Sword&Buckler</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('triathlon')}>Triathlon</MenuItem>
              <MenuItem className="menuDrawerItem" onClick={() => this.switchCategory('polearm')}>Polearms</MenuItem>
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
                onClick={() => this.reFetchFightersByYear('total')}
                className="menuDrawerItem"
              >
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
            {this.props.ranking.category === 'bohurt' &&
            <Bohurt
              events={this.props.eventsAchievements}
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'profight' &&
            <Profight
              events={this.props.eventsAchievements}
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'sword_shield' &&
            <SwordShield
              events={this.props.eventsAchievements}
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'longsword' &&
            <Longsword
              events={this.props.eventsAchievements}
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'sword_buckler' &&
            <SwordBuckler
              events={this.props.eventsAchievements}
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'triathlon' &&
            <Triathlon
              events={this.props.eventsAchievements}
              fetchFighters={this.props.fetchFighters}
              fighters={this.props.ranking.fighters}
            />
            }
            {this.props.ranking.category === 'polearm' &&
            <Polearm
              events={this.props.eventsAchievements}
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
    eventsAchievements: state.events.eventsAchievements,
    clubs: state.clubs,
    currentUser: state.currentUser,
    leaderboard: state.leaderboard,
  };
}

export default reduxForm({ form: 'filterClubs' })(connect(mapStateToProps, {
  fetchFighters,
  fetchEventsAchievements,
  fetchClubs,
  fetchLeaderboard,
  addFlashMessage,
  setActiveCategory,
  setActiveSeason,
})(TabsComp));
