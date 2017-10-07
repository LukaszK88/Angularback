import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import LoginModal from '../../auth/login'
import Signup from '../../auth/singup';
import {logout} from '../../../actions';
import { Icon, Image } from 'semantic-ui-react';
import DropdownMenu from 'react-dd-menu';
import UpdateUser from './userInfo';
import ChangePassword from '../../auth/changePassword';
import { config } from '../../../config';



class NavbarComp extends Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isMenuOpen: false
        };
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.close = this.close.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
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

    renderLoggedIn(){
        const{user, admin, clubAdmin} = this.props.currentUser;
        if(user) {
            const menuOptions = {
                isOpen: this.state.isMenuOpen,
                close: this.close,
                toggle: <a className="nav-link"  onClick={this.toggleDropdown}>{user.username} <Icon name="chevron down"/></a>,
                align: 'right',
                closeOnInsideClick: false,
                closeOnOutsideClick: false
            };
            return (
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/ranking">Ranking</Link>
                    </li>
                    <DropdownMenu as="li" className="nav-item" {...menuOptions}>
                        <li><Link to={`/profile/${user.id}`}>Profile <Icon name="drivers license outline"/></Link></li>
                        <li><UpdateUser/></li>
                        <li><ChangePassword/></li>
                        {(admin || clubAdmin) &&
                        <li><Link to={`/events`}>Manage events <Icon name="fort awesome"/></Link></li>
                        }
                        { admin &&
                        <li><Link to={`/users`}>Manage users <Icon name="users"/></Link></li>
                        }
                    </DropdownMenu>

                    <li className="nav-item">
                        <a className="nav-link" onClick={this.logout.bind(this)}>Logout</a>
                    </li>
                </ul>
            )
        }

    }

    renderLoggedOut(){
        return (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/ranking">Ranking</Link>
                </li>
                <li className="nav-item">
                    <LoginModal/>
                </li>
                <li className="nav-item">
                    <Signup/>
                </li>
            </ul>
        )
    }

    render(){

        return(

            <nav className='navbar navbar-toggleable-md navbar-light bg-faded'>
                <button onClick={this.toggle} className="navbar-toggler navbar-toggler-right" type="button" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to="/"><Image  size={'tiny'} src={`${config.url.base}/storage/swords_black.png`}/></Link>

                <div className={(!this.state.isOpen ? 'collapse' : '') + ' navbar-collapse'}>
                    { this.props.currentUser.isLoggedIn ? this.renderLoggedIn() : this.renderLoggedOut()}
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, );
}

export default connect(mapStateToProps,{logout})(NavbarComp);
