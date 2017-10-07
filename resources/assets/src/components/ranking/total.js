import React,{Component} from 'react';
import { connect } from 'react-redux'
import { userHelper } from '../../helpers/user';
import { Header, Image, Table,Icon} from 'semantic-ui-react'
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Total extends Component{

    nameLink = (cell, row) => {
        return (
            <Header as='h4' image>
                <Image src={userHelper.getImage(row)} shape='rounded' size='mini' />
                <Header.Content>
                    <Link to={`/profile/${row.id}`}>  {row.name} </Link>
                    <Header.Subheader>{row.club.name}</Header.Subheader>
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



    render(){

        let fighters = _.orderBy(this.props.fighters,['total_points'],['desc']);
        return(
            <div>
                <BootstrapTable containerClass="table-responsive-custom" data={ fighters } hover pagination multiColumnSort={ 2 }>
                    <TableHeaderColumn  dataField='name' dataFormat={ this.nameLink } isKey>Fighter name</TableHeaderColumn>
                    <TableHeaderColumn width="20%" dataField='total_points' caretRender={this.renderCaret} dataSort={ true }>Points</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Total);