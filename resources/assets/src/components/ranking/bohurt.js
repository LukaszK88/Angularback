import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { userHelper } from '../../helpers/user';
import { Header, Image, Icon } from 'semantic-ui-react'
import UpdateBohurt from './updates/bohurt';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';



class Bohurt extends Component{
    constructor(props){
        super(props);

    }

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

    ratio(cell, row){
        return (
            <span>{ userHelper.ratioBohurt(row) }%</span>
        )
    }

    update(cell, row,extra){
        const { admin, clubAdmin } = extra[1];

        if((clubAdmin == row.club_id) || admin) {
            return (
                <UpdateBohurt events={extra[0]} fighter={row}></UpdateBohurt>
            )
        }
    }

    render(){
        const { admin, clubAdmin } = this.props.currentUser;
        let fighters = _.orderBy(this.props.fighters,['bohurtTable.points'],['desc']);
        return(
        <div>
            <p className="category-points">
                <span className="text-green">2pts</span> - Won and standing |
                <span className="text-green">1pt</span> - Last man standing |
                <span className="text-red">-3pts</span> - Suicide
            </p>
            <BootstrapTable containerClass="table-responsive-custom" tableContainerClass="table-responsive-custom" data={ fighters } hover pagination multiColumnSort={ 2 }>
                <TableHeaderColumn width="180" dataField='name' dataFormat={ this.nameLink } isKey>Fighter name</TableHeaderColumn>
                <TableHeaderColumn width="55" dataField='bohurtTable'  dataFormat={ this.format} formatExtraData="won" caretRender={this.renderCaret} dataSort={ true }>Win</TableHeaderColumn>
                <TableHeaderColumn width="90" dataField='bohurtTable'  dataFormat={ this.format} formatExtraData="lastMan" caretRender={this.renderCaret} dataSort={ true }>Last Man</TableHeaderColumn>
                <TableHeaderColumn width="80" dataField='bohurtTable'  dataFormat={ this.format} formatExtraData="suicide" caretRender={this.renderCaret} dataSort={ true }>Suicide</TableHeaderColumn>
                <TableHeaderColumn width="70" dataField='bohurtTable'  dataFormat={ this.format} formatExtraData="down" caretRender={this.renderCaret} dataSort={ true }>Down</TableHeaderColumn>
                <TableHeaderColumn width="70" dataField='bohurtTable'  dataFormat={ this.ratio}  caretRender={this.renderCaret} dataSort={ true }>Ratio</TableHeaderColumn>
                <TableHeaderColumn width="70" dataField='bohurtTable'  dataFormat={ this.format} formatExtraData="points" caretRender={this.renderCaret} dataSort={ true }>Points</TableHeaderColumn>
                {(admin || clubAdmin) &&
                <TableHeaderColumn width="50" dataField='bohurtTable' dataFormat={ this.update}
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

export default connect(mapStateToProps,mapDispatchToProps)(Bohurt);