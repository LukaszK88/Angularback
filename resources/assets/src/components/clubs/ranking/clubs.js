import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from '../../../layouts/defaultLayout';
import { Image, List, Flag, Button } from 'semantic-ui-react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { fetchClubs } from '../../../actions/clubs';
import { setActiveSeason } from '../../../actions/ranking';
import { Field, reduxForm } from 'redux-form';
import { config } from '../../../config';
import { input } from '../../../helpers/input';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Clubs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountry: 0,
      countryOptions: [],
      openSecondary: false,
    };
  }

  componentDidMount() {
    this.props.fetchClubs();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.clubs.length > 0 && nextState.countryOptions.length === 0) {
      this.prepareClubCountryLocations(nextProps.clubs);
    }
  }

  prepareClubCountryLocations(clubs) {
    const all = [{ key: 0, value: 0, text: 'All' }];
    const locations = _.map(clubs, (club) => {
      const txt = _.pick(_.find(config.select.locations, location => location.countryCode === club.country),_.identity);
      return {
        key: club.id, flag: club.country, value: club.country, text: txt.name,
      };
    });
    this.setState({ countryOptions: all.concat(locations) });
  }

  renderClubs() {
    const clubs = _.orderBy(this.props.clubs, ['total_points'], ['desc']);
    return _.map(clubs, (club, index) => (
      <List.Item>
        <div className="row">
          <div className="index-number">{index + 1}</div>
          <div className="col-sm-1 col-2">
            <Image src={club.logo} shape="rounded" size="mini" />
          </div>
          <div className="col-sm-8 col-5 ">
            <List.Content>
              <List.Header><Link to={`/club/${club.id}`}> {club.name}</Link></List.Header>
              {club.fighters > 0 ? `${club.fighters} Fighters` : 'No Fighters'}
            </List.Content>
          </div>
          <div className="col-sm-1 col-2 text-center align-center">
            <Flag name={club.country} />
          </div>
          <div className="col-sm-1 col-2 text-center borderLeft ">
            <div className="rankingRecordText">{club.total_points}</div>
          </div>
        </div>
      </List.Item>
    ));
  }

  reFetchClubsByCountry(e, country) {
    this.setState({ selectedCountry: country });
    this.props.fetchClubs(country, (this.props.season === 'Total' ? 0 : this.props.season));
  }

  reFetchClubsByYear(year) {
    if (year === 'total') {
      this.props.fetchClubs(this.state.selectedCountry);
      this.props.setActiveSeason('Total');
    } else {
      this.props.fetchClubs(this.state.selectedCountry, year);
      this.props.setActiveSeason(year);
    }
    this.handleToggleSecondary();
  }

  handleToggleSecondary() {
    this.setState({ openSecondary: !this.state.openSecondary });
  }

  render() {
    return (
      <DefaultLayout>
        <div className="row">
          <div className="col-sm-4 offset-sm-4 col-8">
            <div id="select" className="club-dropdown">
              <Field
                label="Filter by Country"
                name="club_id"
                placeholder="Filter by Country"
                options={_.uniqBy(this.state.countryOptions, 'value')}
                component={input.renderSelect}
                onChange={this.reFetchClubsByCountry.bind(this)}
              />
            </div>
          </div>
          <div className="col-4">
            <Button
              className="float-right"
              onClick={() => this.handleToggleSecondary()}
              color="black"
            >{this.props.season}
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
                onClick={() => this.reFetchClubsByYear('total')}
                className="menuDrawerItem"
              >
                Total
              </MenuItem>
              <MenuItem onClick={() => this.reFetchClubsByYear('2018')} className="menuDrawerItem">2018</MenuItem>
              <MenuItem onClick={() => this.reFetchClubsByYear('2017')} className="menuDrawerItem">2017</MenuItem>
            </Drawer>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 top-row">
            <List celled size="large" relaxed="very" verticalAlign="middle">
              <List.Item>
                <List.Item>
                  <div className="row hidden-xs-down rankingRecordText">
                    <div className="col-sm-1" />
                    <div className="col-sm-8 " />
                    <div className="col-sm-1 text-center">
                              Country
                    </div>
                    <div className="col-sm-1 text-center">
                              Points
                    </div>
                  </div>
                </List.Item>
              </List.Item>
              {this.renderClubs()}
            </List>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    clubs: state.clubs.clubs,
    season: state.ranking.season,
  };
}


export default
reduxForm({ form: 'filterClubsByCountry' })(connect(mapStateToProps, {
  fetchClubs,
  setActiveSeason,
})(Clubs));
