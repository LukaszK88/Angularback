import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Header, Image,Icon  } from 'semantic-ui-react'
import { userHelper } from '../../helpers/user';
import UpdateSwordShield from './updates/swordShield';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class SwordShield extends Component{

    nameLink = (cell, row) => {
        return (
            <Header as='h4' image>
                <Image src={userHelper.getImage(row)} shape='rounded' size='mini' />
                <Header.Content>
                    <Link to={`/profile/${row.id}`}>  {row.name} </Link>
                    <Header.Subheader><Link to={`/club/${row.club.id}`}>{row.club.name}</Link></Header.Subheader>
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

    format(cell, row,extra){
        return (
            <span>{cell[extra]}</span>
        )
    }

    update(cell, row,extra){
        const { admin, clubAdmin } = extra[1];

        if((clubAdmin == row.club_id) || admin) {
            return (
                <UpdateSwordShield events={extra[0]} fighter={row}></UpdateSwordShield>
            )
        }
    }

    render(){
        const { admin, clubAdmin } = this.props.currentUser;
        let fighters = _.orderBy(this.props.fighters,['swordShieldTable.points'],['desc']);
        return(
            <div>
                <p className="category-points">
                    <span className="text-green">1pt</span> - Win
                </p>
                <BootstrapTable containerClass="table-responsive-custom" tableContainerClass="table-responsive-custom" data={ fighters } hover pagination multiColumnSort={ 2 }>
                    <TableHeaderColumn width="150" dataField='name' dataFormat={ this.nameLink } isKey>Fighter name</TableHeaderColumn>
                    <TableHeaderColumn width="40" dataField='swordShieldTable'  dataFormat={ this.format} formatExtraData="win" caretRender={this.renderCaret} dataSort={ true }>Win</TableHeaderColumn>
                    <TableHeaderColumn width="40" dataField='swordShieldTable'  dataFormat={ this.format} formatExtraData="loss" caretRender={this.renderCaret} dataSort={ true }>Lost</TableHeaderColumn>
                    {(admin || clubAdmin) &&
                    <TableHeaderColumn width="50" dataField='swordShieldTable' dataFormat={ this.update}
                                       formatExtraData={[this.props.events, this.props.currentUser]}>Update</TableHeaderColumn>
                    }
                </BootstrapTable>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { currentUser:state.currentUser };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, );
}

export default connect(mapStateToProps,mapDispatchToProps)(SwordShield);