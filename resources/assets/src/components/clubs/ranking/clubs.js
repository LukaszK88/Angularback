import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Header, Image, Icon, Flag, Button } from 'semantic-ui-react'
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {fetchClubs,fetchClubsByCountry} from '../../../actions/clubs';
import  NavbarComp from '../../home/partials/navbar';
import FlashMessages from '../../helpers/message';
import { input } from '../../../helpers/input';
import { Tooltip } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import {config} from '../../../config';

class Clubs extends Component{
    constructor(props){
        super(props);

        this.state = {
            tooltipOpen: false,
            searchCountry: null
        }
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    componentDidMount(){
        this.props.fetchClubs();
    }

    nameLink = (cell, row) => {
        return (
            <Header as='h4' image>
                <Image src={row.logo} shape='rounded' size='mini' />
                <Header.Content>
                    <Link to={`/club/${row.id}`}>  {row.name} </Link>
                    <Header.Subheader>{ row.users.length ? `${row.users.length} Fighters` : 'No Fighters'}</Header.Subheader>
                </Header.Content>
            </Header>
        )
    }

    renderCaret = (direction, fieldName) => {
        if (direction === 'asc') {
            return (
                <Icon name='chevron up'/>
            );
        }
        if (direction === 'desc') {
            return (
                <Icon name='chevron down'/>
            );
        }
        return (
            <span> <Icon name='chevron up'/>    <Icon name='chevron down'/></span>
        );
    }


    flag(cell, row){
        return (
            <Flag name={row.country}></Flag>
        )
    }

    reFetchClubsByCountry(e,country){
        this.setState({searchCountry:country});
        this.props.fetchClubsByCountry(country);
    }


    render(){

        const { clubs } = this.props.clubs;
        if(!clubs.length){
            return (<p>Loading...</p>)
        }else {

           const locations = _.map(clubs,(club) => {
               let txt = _.find(config.select.locations,(location) => {return location.countryCode == club.country});

                   return {key: club.id, flag: club.country, value: club.country, text: txt.name}


           });
            return (
                <div>
                    <FlashMessages/>
                    <NavbarComp/>
                    <div className="wc-bg">
                        <div className="container" >
                            <div className="row">
                                <div className="col-md-12 top-row">
                                        <span className="float-left">
                                        <Button size="tiny" color={'black'}>Total</Button>
                                        <Button size="tiny"  color={'black'}>Season 2017</Button>
                                    </span>
                                    {/*<Tooltip placement="left" isOpen={this.state.tooltipOpen} target="select"*/}
                                             {/*toggle={this.toggle.bind(this)}>*/}
                                        {/*Select Country to filter Ranking*/}
                                    {/*</Tooltip>*/}
                                    {/*<span id="select" className="float-right">*/}
                                        {/*<Field*/}
                                            {/*className="club-dropdown"*/}
                                            {/*label="Filter by Country"*/}
                                            {/*name="club_id"*/}
                                            {/*placeholder="Filter by Country"*/}
                                            {/*options={locations}*/}
                                            {/*component={input.renderSelect}*/}
                                            {/*onChange={this.reFetchClubsByCountry.bind(this)}*/}
                                        {/*/>*/}
                                    {/*</span>*/}
                                </div>
                                    <div className="row">
                                    <BootstrapTable containerClass="white-bg"
                                                     data={ clubs } hover pagination
                                                    multiColumnSort={ 2 }>
                                        <TableHeaderColumn width="180" dataField='name' dataFormat={ this.nameLink } isKey>Club
                                            name</TableHeaderColumn>
                                        <TableHeaderColumn width="75" dataField='country' dataFormat={ this.flag } >Country</TableHeaderColumn>
                                        <TableHeaderColumn width="75" dataField='total_points' caretRender={this.renderCaret} dataSort={ true } >Total Points</TableHeaderColumn>

                                    </BootstrapTable>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
    }
}

function mapStateToProps(state) {
    return { currentUser:state.currentUser,
        clubs: state.clubs
    };
}


export default reduxForm({form: 'filterClubsByCountry'})(connect(mapStateToProps,{fetchClubs,fetchClubsByCountry})(Clubs));
