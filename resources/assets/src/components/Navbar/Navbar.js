import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import LoginModal from '../auth/login';
import { logout } from '../../actions';
import { Image } from 'semantic-ui-react';
import { config } from '../../config';
import { JoinClub } from '../index';


class NavbarComp extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isMenuOpen: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.close = this.close.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  toggleDropdown() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close() {
    this.setState({ isMenuOpen: false });
  }

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
          <Link className="nav-link" to="/events">Events</Link>
        </li>
        <li className="nav-item">
          <LoginModal />
        </li>
        <li className="nav-item">
          <JoinClub />
        </li>
      </ul>
    );
  }

  render() {
    return (

      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <Link className="navbar-brand" to="/"><Image size="tiny" src={`${config.url.base}/storage/swords_black.png`} /></Link>
        <div className={`${!this.state.isOpen ? 'collapse' : ''} navbar-collapse`}>
          {this.renderLoggedOut()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({});
}

export default connect(mapStateToProps, { logout })(NavbarComp);
