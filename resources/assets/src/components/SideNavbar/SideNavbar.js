import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label, Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { logout } from '../../actions';
import { UpdateUserInfo, ChangePassword } from '../index';
import { UpdateClubInfo } from '../clubs';

import './SideNavbar.css';

class SideNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'ranking',
    };

  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { user, clubAdmin, admin } = this.props;

    return (
      <Menu fluid size='mini' vertical>
        <Menu.Item name='ranking' active={activeItem === 'ranking'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to="/ranking">Ranking</Link>
        </Menu.Item>
        <Menu.Item name='clubs' active={activeItem === 'clubs'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to="/ranking-clubs">Clubs</Link>
        </Menu.Item>
        <Menu.Item name='events' active={activeItem === 'events'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to="/events">Events</Link>
        </Menu.Item>
        <Menu.Item name='myProfile' active={activeItem === 'myProfile'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to={`/profile/${user.id}`}>My Profile</Link>
        </Menu.Item>
        <Menu.Item name='myEvents' active={activeItem === 'myEvents'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to={`/my-events/${user.id}`}>My Events</Link>
        </Menu.Item>
        {user.club_id !== 0 &&
        <Menu.Item name='clubPage' active={activeItem === 'clubPage'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to={`/club/${user.club_id}`}>Club Page </Link>
        </Menu.Item>
        }
        {(admin || clubAdmin) &&
        <Menu.Item name='clubPage' active={activeItem === 'clubPage'} onClick={this.handleItemClick}>
          <div className="sideNavLink"><UpdateClubInfo club={user.club} /></div>
        </Menu.Item>
        }
        {(admin) &&
        <Menu.Item name='manageEvents' active={activeItem === 'manageEvents'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to="/events-admin">Manage events</Link>
        </Menu.Item>
        }
        { admin &&
        <Menu.Item name='manageEvents' active={activeItem === 'manageEvents'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to="/users">Manage users</Link>
        </Menu.Item>
        }
        { admin &&
        <Menu.Item name='manageEvents' active={activeItem === 'manageEvents'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to="/clubs-admin">Manage clubs</Link>
        </Menu.Item>
        }
        <Menu.Item name='account' active={activeItem === 'account'} onClick={this.handleItemClick}>
          <div className="sideNavLink"><Icon name={activeItem === 'account' ? 'chevron down' :"chevron right"}/>Account</div>
          {activeItem === 'account' &&
          <Menu.Menu>
            <Menu.Item name='userInfo' active={activeItem === 'userInfo'} onClick={this.handleItemClick}>
              <div className="sideNavLink"><Icon name="info"/><UpdateUserInfo/></div>
            </Menu.Item>
            <Menu.Item name='changePassword' active={activeItem === 'changePassword'} onClick={this.handleItemClick}>
              <div className="sideNavLink"><Icon name="key" /><ChangePassword/></div>
            </Menu.Item>
          </Menu.Menu>
          }
        </Menu.Item>
        <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick}>
          <div className="sideNavLink" onClick={() => this.props.logout()}>Logout</div>
        </Menu.Item>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    user: state.currentUser.user,
    admin: state.currentUser.admin,
    clubAdmin: state.currentUser.clubAdmin,
  };
}

export default connect(mapStateToProps, { logout })(SideNavbar);
