import React,{Component} from 'react';
import { connect } from 'react-redux'
import FlashMessages from './../helpers/message';
import NavbarComp from '../home/partials/navbar';
import { List, Card, Flag, Button, Icon,Header } from 'semantic-ui-react'
import AddEvent from './addEvent';
import {getEventTypes,fetchEvents} from '../../actions/events';
import _ from 'lodash';
import { stringHelper } from '../../helpers/string';
import EditEvent from './editEvent';
import AddCategories from './addCatgories';
import DeleteConfirmation from './deleteEvent';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from 'react-router-dom';

class Events extends Component{
    componentDidMount(){
        this.props.getEventTypes();
        this.props.fetchEvents();

    }

    formatTitle(cell,row){
        return(
            <Header as='h4' image>
                <Flag name={row.location} />
                <Header.Content>
                    {/*<Link to={`/profile/${row.id}`}>  {row.name} </Link>*/}
                    <Link to={`/event/${row.id}`}> {row.title} </Link>
                    {row.category.length == null ? ' - No Categories' : ` - ${row.category.length} categories`}
                    <Header.Subheader>{row.club != null ? row.club.name : 'Global   '} Added by: {row.user != null ? ` ${row.user.username}` : ' unknown'} </Header.Subheader>
                </Header.Content>
            </Header>
        )
    }

    formatDate(cell,row){
        return (
            <span>{stringHelper.limitTo(row.date, 10)}</span>
        )
    }

    actions(cell,row,currentUser ){
        if ((row.club_id == currentUser.user.club_id || (row.global && row.user_id == currentUser.user.id) )|| currentUser.admin) {

            return (
                <div className="row" >
                    <AddCategories event={row}/>
                    <EditEvent event={row}/>
                    <DeleteConfirmation  event={row} />
                </div>
            )
        }
    }

    render(){

        const {events, eventTypes} = this.props.events;

       const eventsOrdered = _.orderBy(events,['created_at'],['desc']);
        return(
            <div>
                <FlashMessages/>
                <NavbarComp/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <span className="float-right">
                                <AddEvent eventTypes={eventTypes}/>
                            </span>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                    <Card fluid >
                        <Card.Content>
                            {(events.length > 0) &&
                            <BootstrapTable data={ eventsOrdered } pagination>
                                <TableHeaderColumn dataField='title' dataFormat={this.formatTitle} isKey filter={ {type: 'TextFilter', delay: 1000} }>Tournament Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='date'  dataFormat={this.formatDate} filter={ {type: 'TextFilter', delay: 1000} }>Date</TableHeaderColumn>
                                <TableHeaderColumn dataField='actions' style={{display:"table-inline"}} dataFormat={this.actions} formatExtraData={this.props.currentUser} >Actions</TableHeaderColumn>

                            </BootstrapTable>
                            }
                        </Card.Content>
                    </Card>
                    </div>

                </div>
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {events: state.events,
        currentUser:state.currentUser
    };
}



export default connect(mapStateToProps,{getEventTypes,fetchEvents})(Events);