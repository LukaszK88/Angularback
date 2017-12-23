import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from '../../../layouts/defaultLayout';
import { Image, List, Flag, Button } from 'semantic-ui-react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { fetchClubs, fetchClubsByCountry } from '../../../actions/clubs';
import { Field, reduxForm } from 'redux-form';
import { config } from '../../../config';

class Clubs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipOpen: false,
      searchCountry: null,
    };
  }

  renderClubs() {
    return _.map(this.props.clubs.clubs, (club, index) => (
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

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  componentDidMount() {
    this.props.fetchClubs();
  }
  //
  // reFetchClubsByCountry(e,country){
  //     this.setState({searchCountry:country});
  //     this.props.fetchClubsByCountry(country);
  // }


  render() {
    const { clubs } = this.props.clubs;
    if (!clubs.length) {
      return (<p>Loading...</p>);
    }

    const locations = _.map(clubs, (club) => {
      const txt = _.find(config.select.locations, location => location.countryCode == club.country);
      return {
        key: club.id, flag: club.country, value: club.country, text: txt.name,
      };
    });
    return (
      <DefaultLayout>
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
    clubs: state.clubs,
  };
}


export default reduxForm({ form: 'filterClubsByCountry' })(connect(mapStateToProps, { fetchClubs, fetchClubsByCountry })(Clubs));
