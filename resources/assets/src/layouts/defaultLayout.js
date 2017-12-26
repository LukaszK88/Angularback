import React, { Component } from 'react';
import { Navbar } from '../components';
import FlashMessages from '../helpers/message';

class DefaultLayout extends Component {
  render() {
    return (
      <div>
        <FlashMessages />
        <Navbar />
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
