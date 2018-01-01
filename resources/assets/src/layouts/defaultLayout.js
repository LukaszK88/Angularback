import React, { Component } from 'react';
import { Navbar, SideNavbar, ChatConvrsations, Messages } from '../components';
import { Icon } from 'semantic-ui-react';
import FlashMessages from '../helpers/message';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { currentLoggedInUser} from "../actions/user";


import './DefaultLayout.css';
const socket = io('http://localhost:3000');

class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileNavToggle: false,
    };
  }

  componentDidMount() {
    // get user to notify him that he has unread message when the chat window is closed!
    socket.on('chatroom', (response) => {
      if (response.from !== this.props.currentUser.user.id) {
        if(this.props.activeChat.conversationId === null) {
          this.props.currentLoggedInUser(window.localStorage.getItem('token'));
        }
      }
    });
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
              <ChatConvrsations user={this.props.currentUser.user} />
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
        {(this.props.activeChat.conversationId !== null) &&
        <Messages user={this.props.currentUser.user} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    isLoggedIn: state.currentUser.isLoggedIn,
    activeChat: state.config.activeChat,
  };
}

export default connect(mapStateToProps, { currentLoggedInUser })(DefaultLayout);
