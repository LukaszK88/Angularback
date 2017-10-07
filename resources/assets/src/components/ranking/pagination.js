import React,{Component} from 'react';
import { connect } from 'react-redux'
import {fetchFightersByPage} from '../../actions/ranking';
import { Table, Menu, Icon} from 'semantic-ui-react'

class Pagination extends Component{
    movePage(page){
        this.props.fetchFightersByPage(page);
    }

    renderPagination(){
        const {next_page_url, prev_page_url} = this.props.fighters;

        if(next_page_url && !prev_page_url){
            return (<Menu floated='right' pagination>
                <Menu.Item disabled={true} as='a' icon>
                    <Icon name='left chevron' /> Prev
                </Menu.Item>
                <Menu.Item onClick={() => this.movePage(next_page_url)} as='a' icon>
                    Next <Icon name='right chevron' />
                </Menu.Item>
            </Menu>)
        }
        if(!next_page_url && !prev_page_url){
            return (<Menu floated='right' pagination>
                <Menu.Item disabled={true} as='a' icon>
                    <Icon name='left chevron' /> Prev
                </Menu.Item>
                <Menu.Item disabled={true} as='a' icon>
                    Next <Icon name='right chevron' />
                </Menu.Item>
            </Menu>)
        }
        if(!next_page_url && prev_page_url){
            return (<Menu floated='right' pagination>
                <Menu.Item onClick={() => this.movePage(prev_page_url)} as='a' icon>
                    <Icon name='left chevron' /> Prev
                </Menu.Item>
                <Menu.Item disabled={true} as='a' icon>
                    Next <Icon name='right chevron' />
                </Menu.Item>
            </Menu>)
        }
        if(next_page_url && prev_page_url){
            return (<Menu floated='right' pagination>
                <Menu.Item onClick={() => this.movePage(prev_page_url)} as='a' icon>
                    <Icon name='left chevron' /> Prev
                </Menu.Item>
                <Menu.Item onClick={() => this.movePage(next_page_url)} as='a' icon>
                    Next <Icon name='right chevron' />
                </Menu.Item>
            </Menu>)
        }

    }
    render(){
        return(
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='16'>
                        <Menu floated='left' pagination>
                            <Menu.Item icon>
                                {this.props.fighters.total}
                            </Menu.Item>
                        </Menu>
                        {this.renderPagination()}
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        )
    }
}

function mapStateToProps(state) {
    return { };
}

export default connect(mapStateToProps,{fetchFightersByPage})(Pagination);