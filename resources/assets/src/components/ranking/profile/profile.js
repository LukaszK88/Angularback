import React,{Component} from 'react';
import { connect } from 'react-redux'
import  NavbarComp from '../../home/partials/navbar';
import { fetchUser } from '../../../actions';
import { fetchAchievements } from '../../../actions/ranking';
import { baseUrl } from '../../../index';
import FlashMessages from '../../helpers/message';
import { fetchEvents,fetchUserEvents } from '../../../actions/events'
import UserImage from './partials/userImage';
import ProfileInfo from './partials/profileInfo';
import Achievements from './partials/achievements';

class Profile extends Component{

    componentWillReceiveProps(newProps){
        if(this.props.match.params.userId !== newProps.match.params.userId) {
            this.props.fetchUser(newProps.match.params.userId);
            this.props.fetchAchievements(newProps.match.params.userId);
        }
    }

    componentDidMount(){

        this.props.fetchUser(this.props.match.params.userId, (response) => {
            this.props.fetchUserEvents(response.data.club_id);
        });
        this.props.fetchAchievements(this.props.match.params.userId);
    }

    render(){
        const {profile} = this.props;

        if(!profile){
            return <div>Loading...</div>;
        }
        let bg ='';
       if(profile.user.club_id == '1'){
            bg = 'wc-bg'
       }
       if (profile.user.club_id == '2'){
           bg = 'ukfed-bg'
       }
        if (profile.user.club_id == '6'){
            bg = 'bad-bg'
        }

        return(
            <div>
                <FlashMessages/>
                <NavbarComp/>
                {profile.user &&
                <div className={bg}>
                <div className="container profile">
                    <div className="row">
                        <UserImage profile={profile} currentUser={this.props.currentUser}/>
                        <ProfileInfo profile={profile} />
                        <Achievements profile={profile} currentUser={this.props.currentUser} />
                    </div>
                </div>
                </div>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { profile: state.profile,
        currentUser: state.currentUser,
        events: state.events
    };
}



export default connect(mapStateToProps,{fetchUser,fetchAchievements,fetchEvents,fetchUserEvents})(Profile);