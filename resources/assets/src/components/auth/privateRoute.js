import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    if (!this.props.currentUser.isLoggedIn) {
      return <Redirect to="/ranking" />;
    }
    if (this.props.admin && this.props.currentUser.admin == false) {
      return <Redirect to="/ranking" />;
    }

    return <Route {...this.props} />;
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps)(PrivateRoute);
