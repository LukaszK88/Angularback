import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClub, fetchClubs } from '../../actions/clubs';
import { ProfileCard, ClubInfo, ClubFighters } from '../../components/clubs';
import { Card } from 'semantic-ui-react';
import DefaultLayout from '../../layouts/defaultLayout';

class ClubPage extends Component {
  componentDidMount() {
    this.props.fetchClub(this.props.match.params.clubId);
    this.props.fetchClubs();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.clubId !== newProps.match.params.clubId) {
      this.props.fetchClub(newProps.match.params.clubId);
    }
  }

  render() {
    const { club } = this.props;
    return (
      <DefaultLayout>
        {club &&
        <div className="row">
          <div className="col-md-3">
            <ProfileCard
              clubId={this.props.match.params.clubId}
              currentUser={this.props.currentUser}
              club={club}
              clubs={this.props.clubs}
            />
          </div>
          <br/>
          <div className="col-md-6">
            <div className="row">
              <ClubInfo club={club}/>
            </div>
            <div className="row">
              <ClubFighters currentUser={this.props.currentUser} club={club} />
            </div>
          </div>
          {club.description &&
          <div className="col-md-3">
            <Card fluid>
              <Card.Content>
                <Card.Header className="text-center">
                  Description
                </Card.Header>
                <hr/>
                {club.description}
              </Card.Content>
            </Card>
          </div>
          }
        </div>
        }
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    club: state.club.club,
    clubs: state.clubs,
    currentUser: state.currentUser,
  };
}


export default connect(mapStateToProps, { fetchClub, fetchClubs })(ClubPage);
