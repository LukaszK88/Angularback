import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label, Menu, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { logout, setActiveMenuItem } from '../../actions';
import { UpdateUserInfo, ChangePassword } from '../index';
import { UpdateClubInfo } from '../clubs';
import { userHelper } from '../../helpers/user';

import './SideNavbar.css';

class SideNavbar extends Component {

  handleItemClick = (e, { name }) => {
    this.props.setActiveMenuItem(name);
  }

  render() {
    const { user, clubAdmin, admin, activeMenuItem } = this.props;

    return (
      <div className='showSideNav'>
      <Menu  fluid size='mini' vertical>
        <Menu.Item name='avatar' active={activeMenuItem === 'avatar'} onClick={this.handleItemClick}>
          <Icon className="hidden-sm-up" onClick={() => this.props.toggleMobileNav()} name="chevron right" />
          <div className="sideNavAvatar"><Image avatar src={userHelper.getImage(user)}/></div>
        </Menu.Item>
        <Menu.Item name='ranking' active={activeMenuItem === 'ranking'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to="/ranking">Ranking</Link>
        </Menu.Item>
        <Menu.Item name='clubs' active={activeMenuItem === 'clubs'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to="/ranking-clubs">Clubs</Link>
        </Menu.Item>
        <Menu.Item name='events' active={activeMenuItem === 'events'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to="/events">Events</Link>
        </Menu.Item>
        <Menu.Item name='myProfile' active={activeMenuItem === 'myProfile'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to={`/profile/${user.id}`}>My Profile</Link>
        </Menu.Item>
        <Menu.Item name='myEvents' active={activeMenuItem === 'myEvents'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to={`/my-events/${user.id}`}>My Events</Link>
        </Menu.Item>
        {user.club_id !== 0 &&
        <Menu.Item name='clubPage' active={activeMenuItem === 'clubPage'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to={`/club/${user.club_id}`}>Club Page </Link>
        </Menu.Item>
        }
        {(admin || clubAdmin) &&
        <Menu.Item name='clubPage' active={activeMenuItem === 'clubPage'} onClick={this.handleItemClick}>
          <div className="sideNavLink"><UpdateClubInfo club={user.club} /></div>
        </Menu.Item>
        }
        {(admin) &&
        <Menu.Item name='manageEvents' active={activeMenuItem === 'manageEvents'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to="/events-admin">Manage events</Link>
        </Menu.Item>
        }
        { admin &&
        <Menu.Item name='manageEvents' active={activeMenuItem === 'manageEvents'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to="/users">Manage users</Link>
        </Menu.Item>
        }
        { admin &&
        <Menu.Item name='manageEvents' active={activeMenuItem === 'manageEvents'} onClick={this.handleItemClick}>
          <Link className="sideNavLink" to="/clubs-admin">Manage clubs</Link>
        </Menu.Item>
        }
        <Menu.Item name='account' active={activeMenuItem === 'account'} onClick={this.handleItemClick}>
          <div className="sideNavLink"><Icon name={activeMenuItem === 'account' ? 'chevron down' :"chevron right"}/>Account</div>
          {activeMenuItem === 'account' &&
          <Menu.Menu>
            <Menu.Item name='userInfo' active={activeMenuItem === 'userInfo'} onClick={this.handleItemClick}>
              <div className="sideNavLink"><Icon name="info"/><UpdateUserInfo/></div>
            </Menu.Item>
            <Menu.Item name='changePassword' active={activeMenuItem === 'changePassword'} onClick={this.handleItemClick}>
              <div className="sideNavLink"><Icon name="key" /><ChangePassword/></div>
            </Menu.Item>
          </Menu.Menu>
          }
        </Menu.Item>
        <Menu.Item name='logout' active={activeMenuItem === 'logout'} onClick={this.handleItemClick}>
          <div className="sideNavLink" onClick={() => this.props.logout()}>Logout</div>
        </Menu.Item>
      </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    user: state.currentUser.user,
    admin: state.currentUser.admin,
    clubAdmin: state.currentUser.clubAdmin,
    activeMenuItem: state.config.activeMenuItem,
  };
}

export default connect(mapStateToProps, { logout, setActiveMenuItem })(SideNavbar);
