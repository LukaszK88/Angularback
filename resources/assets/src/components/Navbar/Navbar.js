import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Login } from '../index';
import { logout } from '../../actions';
import { Image } from 'semantic-ui-react';
import { config } from '../../config';
import { JoinClub } from '../index';

import './Navbar.css';

class NavbarComp extends Component {
  logout() {
    this.props.logout();
  }

  renderLoggedOut() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/ranking">Ranking</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/ranking-clubs">Clubs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/events">Feed / Events</Link>
        </li>
        <li className="nav-item">
          <Login />
        </li>
        <li className="nav-item">
          <JoinClub />
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div className="navbar">
        <Link className="navbar-brand" to="/"><Image size="tiny" src={`${config.url.base}storage/swords_black.png`} /></Link>
          {this.renderLoggedOut()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, { logout })(NavbarComp);
