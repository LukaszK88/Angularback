import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Header, Image, Icon } from 'semantic-ui-react'
import { userHelper } from '../../helpers/user';
import UpdateProfight from './updates/profight';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class Profight extends Component{

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

    format(cell, row,extra){
        return (
            <span>{cell[extra]}</span>
        )
    }

    update(cell, row,extra){
        const { admin, clubAdmin } = extra[1];

        if((clubAdmin == row.club_id) || admin) {
            return (
                <UpdateProfight events={extra[0]} fighter={row}></UpdateProfight>
            )
        }
    }



    render(){
        const { admin, clubAdmin } = this.props.currentUser;
        let fighters = _.orderBy(this.props.fighters,['profightTable.points'],['desc']);
        return(
            <div>
                <p className="category-points">
                    <span className="text-green">4pts</span> - KO |
                    <span className="text-green">3pts</span> - Win |
                    <span className="text-green">1pt</span> - Lost |
                    <span className="text-green">10pts</span> - FC I Win |
                    <span className="text-green">6pts</span> - FC II Win |
                    <span className="text-green">3pts</span> - FC III Win
                </p>
                <BootstrapTable containerClass="table-responsive-custom" tableContainerClass="table-responsive-custom" data={ fighters } hover pagination multiColumnSort={ 2 }>
                    <TableHeaderColumn width="180" dataField='name' dataFormat={ this.nameLink } isKey>Fighter name</TableHeaderColumn>
                    <TableHeaderColumn width="55" dataField='profightTable'  dataFormat={ this.format} formatExtraData="win" caretRender={this.renderCaret} dataSort={ true }>Win</TableHeaderColumn>
                    <TableHeaderColumn width="70" dataField='profightTable'  dataFormat={ this.format} formatExtraData="ko" caretRender={this.renderCaret} dataSort={ true }>KO</TableHeaderColumn>
                    <TableHeaderColumn width="80" dataField='profightTable'  dataFormat={ this.format} formatExtraData="loss" caretRender={this.renderCaret} dataSort={ true }>Loss</TableHeaderColumn>
                    <TableHeaderColumn width="70" dataField='profightTable'  dataFormat={ this.format} formatExtraData="fc1" caretRender={this.renderCaret} dataSort={ true }>FC I</TableHeaderColumn>
                    <TableHeaderColumn width="70" dataField='profightTable'  dataFormat={ this.format} formatExtraData="fc2" caretRender={this.renderCaret} dataSort={ true }>FC II</TableHeaderColumn>
                    <TableHeaderColumn width="70" dataField='profightTable'  dataFormat={ this.format} formatExtraData="fc3" caretRender={this.renderCaret} dataSort={ true }>FC III</TableHeaderColumn>
                    <TableHeaderColumn width="70" dataField='profightTable'  dataFormat={ this.format} formatExtraData="points" caretRender={this.renderCaret} dataSort={ true }>Points</TableHeaderColumn>
                    {(admin || clubAdmin) &&
                    <TableHeaderColumn width="50" dataField='profightTable' dataFormat={ this.update}
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

export default connect(mapStateToProps,mapDispatchToProps)(Profight);