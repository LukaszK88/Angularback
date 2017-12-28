import React, { Component } from 'react';
import { Navbar, SideNavbar } from '../components';
import { Icon } from 'semantic-ui-react';
import FlashMessages from '../helpers/message';
import { connect } from 'react-redux';

import './DefaultLayout.css';

class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileNavToggle: false,
    };
  }

  toggleMobileNav() {
    this.setState({ mobileNavToggle: !this.state.mobileNavToggle });
  }

  render() {
    return (
      <div>
        <FlashMessages />
        {!this.props.isLoggedIn &&
          <div>
            <div className="d-none d-md-block">
              <Navbar />
            </div>
            <div className="container-fluid">
              <div style={{ marginBottom: (!this.state.mobileNavToggle ? '5px' : '') }} className="row topMenuToggleButton">
                <Icon className="toggleBurger" onClick={() => this.toggleMobileNav()} size="large" name="content" />
              </div>
              {this.state.mobileNavToggle &&
                <div className="row">
                  <Navbar />
                </div>
              }
            </div>
          </div>
        }
        <div>
          <div className="container-fluid">
            {this.props.isLoggedIn &&
            <div className="row sideMenuToggleButton">
              <Icon className="toggleBurger" onClick={() => this.toggleMobileNav()} size="large" name="content" />
              {this.state.mobileNavToggle &&
              <SideNavbar toggleMobileNav={() => this.toggleMobileNav()} mobileNavToggle={this.state.mobileNavToggle} />
              }
            </div>
            }
            <div className="row">
              <div
                style={{ marginTop: (!this.props.isLoggedIn ? '5px' : '15px') }}
                className={(!this.props.isLoggedIn ? 'col-12' : 'col-sm-11 col-12')}
              >
                {this.props.children}
              </div>
              {this.props.isLoggedIn &&
              <div className="col-sm-1 hidden-sm-down noMargin sideNavContainer">
                <SideNavbar toggleMobileNav={() => this.toggleMobileNav()} mobileNavToggle={this.state.mobileNavToggle} />
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    isLoggedIn: state.currentUser.isLoggedIn,
  };
}

export default connect(mapStateToProps)(DefaultLayout);
