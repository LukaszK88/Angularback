import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import  NavbarComp from './partials/navbar';
import FlashMessages from '../../helpers/message';
import { Sticky } from 'semantic-ui-react'


class Home extends Component{
    state = {};

    handleContextRef = contextRef => this.setState({ contextRef });

    render() {
        const { contextRef } = this.state;

        return (
            <div ref={this.handleContextRef}>
                <FlashMessages/>

                <NavbarComp/>
                    <div className="bg">

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

export default connect(mapStateToProps,mapDispatchToProps)(Home);