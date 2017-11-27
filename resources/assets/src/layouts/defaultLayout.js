import React, { Component } from 'react';
import NavbarComp from '../components/home/partials/navbar';
import FlashMessages from '../helpers/message';

class DefaultLayout extends Component {
  render() {
    return (
      <div>
        <FlashMessages />
        <NavbarComp />
        <div>
          <div className="container-fluid">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
