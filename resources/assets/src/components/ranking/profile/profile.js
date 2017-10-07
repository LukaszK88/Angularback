import React,{Component} from 'react';
import { connect } from 'react-redux'
import  NavbarComp from '../../home/partials/navbar';
import { Card, Icon, Image, List, Flag } from 'semantic-ui-react'
import { fetchUser } from '../../../actions';
import { userHelper } from '../../../helpers/user';
import { uploadProfileImage } from '../../../actions';
import Dropzone from 'react-dropzone'
import { Tooltip } from 'reactstrap';
import { fetchAchievements, deleteAchievement } from '../../../actions/ranking';
import _ from 'lodash';
import { stringHelper } from '../../../helpers/string';
import AddAchievement from './addAchievement';
import UpdateAchievement from './updateAchievement';
import { baseUrl } from '../../../index';
import FlashMessages from '../../helpers/message';
import { fetchEvents } from '../../../actions/events'


class Profile extends Component{
    constructor(props){
        super(props);

        this.state = {
            tooltipOpen: false,
            imgPreview : null
        }

    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    componentWillReceiveProps(newProps){
        if(this.props.match.params.userId !== newProps.match.params.userId) {
            this.props.fetchUser(newProps.match.params.userId);
            this.props.fetchAchievements(newProps.match.params.userId);
        }
    }

    componentDidMount(){
        this.props.fetchEvents();
        this.props.fetchUser(this.props.match.params.userId);
        this.props.fetchAchievements(this.props.match.params.userId);
    }

    onDrop(acceptedFiles, rejectedFiles) {
        //acceptedFiles.forEach(file => {
            //console.log(file);
            this.props.uploadProfileImage(this.props.match.params.userId,acceptedFiles);
       // });
        this.setState({
            imgPreview: acceptedFiles[0].preview
        });

    }

    deleteAch(achievement,e){
        this.props.deleteAchievement(achievement);
    }

    isCurrentlyLoggedInUser(){
        if(this.props.currentUser.user && this.props.profile.user) {
            if(this.props.currentUser.user.id == this.props.profile.user.id){
                return true
            }
        }

        return false
    }

    renderAchievements(){
        if(this.props.profile.achievements){
            return _.map(this.props.profile.achievements.data.data, (achievement) => {

                return (
                    <List.Item>
                        <List.Icon dangerouslySetInnerHTML={{__html: achievement.cup}}/>
                        <List.Content>
                            <List.Header><Flag name={achievement.event.location}/>{achievement.event.title}</List.Header>
                            <List.Description>
                                {achievement.category} | {achievement.place} | {stringHelper.limitTo(achievement.event.date,10)}
                            </List.Description>
                        </List.Content>
                        { this.isCurrentlyLoggedInUser() &&
                        <List.Icon onClick={this.deleteAch.bind(this, achievement)} size="large" name="delete"/>
                        }
                        { this.isCurrentlyLoggedInUser() &&
                        <UpdateAchievement events={this.props.events} achievement={achievement}/>
                        }
                    </List.Item>
                )
            });
        }
    }

    renderDropzone(){
        const {profile} = this.props;
        if(this.props.currentUser.user){
            if(this.props.currentUser.user.id == profile.user.id) {
                return ( <Dropzone id="upload" name="file" style={{width: 'max-width'}} onDrop={this.onDrop.bind(this)}>
                        <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="upload"
                                 toggle={this.toggle.bind(this)}>
                            Click or drop image to upload
                        </Tooltip>
                        { this.state.imgPreview ? <Image src={this.state.imgPreview}/>
                            :
                            <Image src={userHelper.getImage(profile.user)}/> }
                    </Dropzone>
                )
            }
        }

            if(profile.user) {

                return (
                    <div>
                        <Image src={userHelper.getImage(profile.user)}/>
                    </div>
                )
            }

    }

    renderUserImage(){
        const {profile} = this.props;
        if(profile.user) {
            return (
                    <div className="col-md-3">
                        <Card className="profile-card" fluid>
                            {this.renderDropzone()}
                            <Card.Content>
                                <Card.Header>
                                    { profile.user.name }
                                </Card.Header>
                                <Card.Meta>
                                    <span className='date'>
                                      Joined on { stringHelper.limitTo(profile.user.created_at,10)}
                                    </span>
                                </Card.Meta>
                                <Card.Description>

                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </div>

            )
        }
    }

    renderFlags(){
        const {profile} = this.props;
        if(profile.achievements) {
            return _.map(this.props.profile.achievements.data.achievement.countries, (achievement) => {

                return (
                    <Flag name={achievement.event.location}/>
                );
            });
        }
    }

    renderUserProfile(){
        const {profile} = this.props;
        if(profile.user) {
            return (
                <div className="col-md-5">
                    <Card className="profile-card" fluid>
                        <Card.Content>
                            <Card.Header className="text-center">
                                Fighter Info
                            </Card.Header>

                        </Card.Content>
                        <Card.Content>
                            <Card.Header className="flags-display">
                                {this.renderFlags()}
                            </Card.Header>

                            <div className="row">
                                <div className="col-md-6">
                                    <List>
                                        <List.Item icon='certificate'
                                                   content={'Total points: ' + profile.user.total_points}/>
                                        <List.Item icon='certificate' content={'Age: ' + profile.user.age}/>
                                        <List.Item icon='certificate' content={'Weight: ' + profile.user.weight}/>
                                        <List.Item icon='certificate' content={'Quote :' }/>
                                        <List.Item content={'"' + profile.user.quote + '"'}/>
                                        <List.Item icon='certificate' content={'Club :' }/>
                                        {profile.user.club_id != 0 &&
                                        <Image size={'tiny'} src={profile.user.club.logo}/>}
                                    </List>
                                </div>
                                <div className="col-md-6">
                                    <List>
                                        <List.Item icon='certificate' content={'Total Fights: ' +
                                        (profile.user.bohurtTable.fights + profile.user.profightTable.fights + profile.user.swordShieldTable.fights +
                                        profile.user.swordBucklerTable.fights + profile.user.longswordTable.fights + profile.user.polearmTable.fights + profile.user.triathlonTable.fights)}/>
                                        <List.Item icon='certificate'
                                                   content={'Bohurt fights: ' + profile.user.bohurtTable.fights}/>
                                        <List.Item icon='certificate'
                                                   content={'S&S fights: ' + profile.user.swordShieldTable.fights}/>
                                        <List.Item icon='certificate'
                                                   content={'S&B fights: ' + profile.user.swordBucklerTable.fights}/>
                                        <List.Item icon='certificate'
                                                   content={'Longsword fights: ' + profile.user.longswordTable.fights}/>
                                        <List.Item icon='certificate'
                                                   content={'Polearm fights: ' + profile.user.polearmTable.fights}/>
                                        <List.Item icon='certificate'
                                                   content={'Triathlon fights: ' + profile.user.triathlonTable.fights}/>
                                        <List.Item icon='certificate'
                                                   content={'Profights fights: ' + profile.user.profightTable.fights}/>
                                    </List>
                                </div>
                            </div>
                            <hr/>
                            <Card.Header className="text-center">
                                About
                            </Card.Header>
                            <p>
                                { profile.user.about }
                            </p>
                        </Card.Content>
                    </Card>


                </div>

            )
        }
    }



    render(){
        const {profile} = this.props;

        if(!profile){
            return <div>Loading...</div>;
        }

        return(
            <div>
                <FlashMessages/>
                <NavbarComp/>
                {profile.user &&
                <div className={profile.user.club_id == '1' ? 'wc-bg' : 'ukfed-bg'}>
                <div className="container profile">
                    <div className="row">
                        {this.renderUserImage()}
                        {this.renderUserProfile()}
                        <div className="col-md-4">
                            <Card className="profile-card" fluid>
                                <Card.Content>
                                    <Card.Header>
                                        Achievements
                                        {this.isCurrentlyLoggedInUser() &&
                                            <AddAchievement events={this.props.events}/>
                                        }
                                        <Card.Meta>
                                            <div className="row">
                                                <div className="col-xs-3">
                                                    <Icon color="yellow" size="large" name="trophy"/>
                                                </div>
                                                <div className="col-xs-3">
                                                    <Icon color="grey" size="large" name="trophy"/>
                                                </div>
                                                <div className="col-xs-3">
                                                    <Icon color="brown" size="large" name="trophy"/>
                                                </div>
                                            </div>
                                            { this.props.profile.achievements ?
                                                <div  className="row">
                                                <div className="col-xs-2">
                                                <span style={{ marginLeft:'5px'}} className="badge badge-pill badge-warning">{this.props.profile.achievements.data.achievement.gold}</span>
                                                </div>
                                                <div className="col-xs-2">
                                                <span style={{ marginLeft:'5px'}} className="badge badge-pill badge-warning">{this.props.profile.achievements.data.achievement.silver}</span>
                                                </div>
                                                <div className="col-xs-2">
                                                <span style={{ marginLeft:'5px'}} className="badge badge-pill badge-warning">{this.props.profile.achievements.data.achievement.bronze}</span>
                                                </div>
                                                </div> : ''
                                            }
                                        </Card.Meta>

                                    </Card.Header>
                                </Card.Content>

                                    <Card.Content>
                                        <List>
                                            {this.renderAchievements()}
                                        </List>
                                    </Card.Content>

                            </Card>
                        </div>
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



export default connect(mapStateToProps,{fetchUser,uploadProfileImage,fetchAchievements,deleteAchievement,fetchEvents})(Profile);