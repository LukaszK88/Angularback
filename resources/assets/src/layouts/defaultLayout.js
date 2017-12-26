import React, { Component } from 'react';
import { Navbar, SideNavbar } from '../components';
import FlashMessages from '../helpers/message';
import { connect } from 'react-redux';

class DefaultLayout extends Component {
  render() {
    return (
      <div>
        <FlashMessages />
        {!this.props.isLoggedIn &&
        <Navbar />
        }
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className={!this.props.isLoggedIn ? 'col-12' : 'col-11'}>
                {this.props.children}
              </div>
              {this.props.isLoggedIn &&
              <div className="col-1 noMargin">
                <SideNavbar/>
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
