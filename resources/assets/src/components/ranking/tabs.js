import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Container} from 'reactstrap';
import  NavbarComp from '../home/partials/navbar';
import Total from './total';
import Leaderboard from './leaderboard';
import Bohurt from './bohurt';
import SwordShield from './swordShield';
import Profight from    './profight';
import SwordBuckler from    './swordBuckler';
import Longsword from    './longsword';
import Polearm from    './polearm';
import Triathlon from    './triathlon';
import { Tab, Button } from 'semantic-ui-react'
import { fetchFighters, fetchLeaderboard } from '../../actions/ranking';
import { fetchEvents } from '../../actions/events';
import { fetchClubs } from '../../actions/clubs';
import FlashMessages from './../helpers/message';
import {Visibility} from 'semantic-ui-react';
import { Field, reduxForm,change } from 'redux-form';
import { input } from '../../helpers/input';
import _ from 'lodash';
import { Tooltip } from 'reactstrap';
import {addFlashMessage} from '../../actions/flashMessages';
import UpdateUser from '../home/partials/userInfo';


class TabsComp extends Component{
    constructor(props) {
        super(props);

        this.state = {
            tabs:[],
            navClass:'',
            clubId:null,
            tooltipOpen: false,
            calculations: {
                height: 0,
                width: 0,
                topPassed: false,
                bottomPassed: false,
                pixelsPassed: 0,
                percentagePassed: 0,
                topVisible: false,
                bottomVisible: false,
                fits: false,
                passing: false,
                onScreen: false,
                offScreen: false,
            }
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    componentWillReceiveProps(nextProps){
        if(this.state.clubId == null && nextProps.currentUser.isLoggedIn){
            if(nextProps.currentUser.user.club == null){
                if(!nextProps.currentUser.user.name || nextProps.currentUser.user.club_id == 0){
                    this.props.addFlashMessage('success','Update your club and name to be displayed',<UpdateUser class={'fake-link'}/>);
                }
                this.props.dispatch(change('filterClubs','club_id',0));
                this.props.fetchFighters(0);
                this.setState({clubId: 0});
            }else {
                this.props.dispatch(change('filterClubs', 'club_id', nextProps.currentUser.user.club.id));
                this.setState({clubId: nextProps.currentUser.user.club.id});
                this.props.fetchFighters(nextProps.currentUser.user.club.id);
            }
        }
    }

    componentDidMount(){
        this.props.fetchClubs();
        this.props.fetchFighters();
        this.props.fetchEvents();
        this.props.fetchLeaderboard();

        this.state = {tabs:[
            { menuItem: 'Total', render: () => <Tab.Pane attached={false}><Total fetchFighters={this.props.fetchFighters} fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Leaderboard', render: () => <Tab.Pane attached={false}><Leaderboard fighters={this.props.leaderboard}/></Tab.Pane> },
            { menuItem: 'Bohurt', render: () => <Tab.Pane attached={false}><Bohurt events={this.props.events} fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Profight', render: () => <Tab.Pane attached={false}><Profight events={this.props.events} fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Sword & Shield', render: () => <Tab.Pane attached={false}><SwordShield events={this.props.events} fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Sword & Buckler', render: () => <Tab.Pane attached={false}><SwordBuckler events={this.props.events} fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Longsword', render: () => <Tab.Pane attached={false}><Longsword events={this.props.events} fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Polearm', render: () => <Tab.Pane attached={false}><Polearm events={this.props.events} fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Triathlon', render: () => <Tab.Pane attached={false}><Triathlon events={this.props.events} fighters={this.props.fighters}/></Tab.Pane> },
        ]};

    }

    handleUpdate = (e, { calculations }) => this.setState({ calculations });

    reFetchFightersByClub(e,clubId){
        this.setState({clubId:clubId});
        this.props.fetchFighters(clubId);
    }

    reFetchFightersByDate(date){
        this.props.fetchFighters(this.state.clubId,date);
    }

    render(){

        const { calculations} = this.state;
        const all = [{key:'0' , value:'0', text:'All Clubs'}];
        const clubs = _.map(this.props.clubs.clubs, (club) => {
            return {key:club.id , value:club.id, flag:club.country, text:club.name}
        });

        const options = all.concat(clubs);

        if(!this.props.fighters){
            return <div>Loading...</div>;
        }
        return(
            <div >
                <Visibility onUpdate={this.handleUpdate}>
                <FlashMessages/>
                    <NavbarComp />
                    <div className="wc-bg">
                        <Container >
                            <div className="row">
                                <div className="col-md-12 top-row">
                                    <span className="float-left">
                                        <Button size="tiny" color={'black'}>Total</Button>
                                        <Button size="tiny" onClick={() => this.reFetchFightersByDate('2017')} color={'black'}>Season 2017</Button>
                                    </span>
                                    <Tooltip placement="left" isOpen={this.state.tooltipOpen} target="select"
                                             toggle={this.toggle.bind(this)}>
                                        Select Club to filter Ranking
                                    </Tooltip>
                                    <span id="select" className="float-right">
                                        <Field
                                            className="club-dropdown"
                                            label="Filter by Club"
                                            name="club_id"
                                            placeholder="Filter by Club"
                                            options={options}
                                            component={input.renderSelect}
                                            onChange={this.reFetchFightersByClub.bind(this)}
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <Tab className="table-responsive-custom" menu={{ secondary: true, pointing: true }} panes={this.state.tabs} />
                            </div>
                        </Container>
                    </div>
                </Visibility>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        fighters: state.fighters,
        events: state.events,
        clubs: state.clubs,
        currentUser:state.currentUser,
        leaderboard: state.leaderboard
    };
}

export default reduxForm({form: 'filterClubs'})(connect(mapStateToProps,{fetchFighters,fetchEvents,fetchClubs,fetchLeaderboard,addFlashMessage})(TabsComp));