import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Header, Image, Table, Icon } from 'semantic-ui-react'
import { userHelper } from '../../helpers/user';
import { fetchLeaderboard } from '../../actions/ranking';
import {Link} from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import _ from 'lodash';

class Leaderboard extends Component{
    constructor(){
        super();
        this.state = {
            fighters: []
        }
    }
    renderRows(){
        return _.map(this.props.leaderboard, row => {
            return(
                <Table.Row key={row.category}>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Image src={userHelper.getImage(row)} shape='rounded' size='mini' />
                            <Header.Content>
                                <Link to={`/profile/${row.id}`}>  {row.name}</Link>
                                <Header.Subheader>{row.club}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell width="2" >
                        {row.category}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {row.max_points}
                    </Table.Cell>
                </Table.Row>
            )
        });
    }


    nameLink = (cell, row) => {
        return (
            <Header as='h4' image>
                <Image src={userHelper.getImage(row)} shape='rounded' size='mini' />
                <Header.Content>
                    <Link to={`/profile/${row.id}`}>  {row.name} </Link>
                    <Header.Subheader>{row.club}</Header.Subheader>
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

    cleanKeys(){
        let leaderBoard = this.props.fighters;
        let fighters = [];
        for(let key in leaderBoard){
            fighters.push(leaderBoard[key]);
        }
        this.setState({fighters:fighters})
    }

    componentDidMount(){
        this.cleanKeys();
    }

    render(){

            return (
                <div>
                    <BootstrapTable containerClass="table-responsive-custom"
                                    tableContainerClass="table-responsive-custom" data={this.state.fighters} hover pagination
                                    multiColumnSort={ 2 }>
                        <TableHeaderColumn width="150" dataField='name' dataFormat={ this.nameLink } isKey>Fighter
                            name</TableHeaderColumn>
                        <TableHeaderColumn width="40" dataField='category' >Category</TableHeaderColumn>
                        <TableHeaderColumn width="40" dataField='max_points' caretRender={this.renderCaret} dataSort={ true }>Points</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
        }

}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps,{fetchLeaderboard})(Leaderboard);