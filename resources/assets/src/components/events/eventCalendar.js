import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import FlashMessages from './../helpers/message';
import NavbarComp from '../home/partials/navbar';

class MyCalendar extends Component{
    render(){
        return(
            <div>
                <FlashMessages/>
                <NavbarComp/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <Card fluid>
                                <Card.Content>
                                </Card.Content>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, );
}

export default connect(mapStateToProps,mapDispatchToProps)(MyCalendar);