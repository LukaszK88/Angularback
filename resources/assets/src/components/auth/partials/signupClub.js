import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Icon, Tab } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {withRouter} from 'react-router-dom';
import {addFlashMessage} from '../../../actions/flashMessages';
import { input } from '../../../helpers/input';
import { loading } from '../../../actions/config';
import _ from 'lodash';
import { config } from '../../../config';
import {registerClub} from '../../../actions/clubs';

class SignupClub extends Component{

    onSubmit(values){
        this.props.loading(true);
        this.props.registerClub(values);
        this.props.onClose();
    }

    render(){
        const handleSubmit = this.props.handleSubmit;
        const locations = _.map(config.select.locations,(location) => {
            return {key:location.name,value:location.countryCode,text:location.name,flag:location.countryCode}
        });
        return(

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Club Name *"
                    name="name"
                    placeholder="Club name"
                    type="text"
                    component={input.renderField}
                />
                <Field
                    label="Country *"
                    name="country"
                    placeholder="Select Country"
                    options={locations}
                    component={input.renderSelect}
                />
                <Field
                    label="Captain Email *"
                    name="founder"
                    placeholder="Contact email"
                    type="text"
                    component={input.renderField}
                />
                <Field
                    label="Your FB"
                    name="fb"
                    placeholder="For Contact purposes"
                    type="text"
                    component={input.renderField}
                />

                <Button color={'black'} type="submit">Register</Button>
            </form>

        )

    }
}

function validate(values) {
    const errors = {};

    let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!values.name){
        errors.name = "Club name cannot be empty";
    }
    if(values.founder && values.founder.length < 4){
        errors.founder = "Email should be min 4 chars";
    }
    if(values.founder && !regExp.test(values.founder)){
        errors.founder = "Email should be a valid email";
    }
    if(!values.founder){
        errors.founder = "Email should not be empty";
    }
    if(!values.country){
        errors.country = "Country should not be empty";
    }

    return errors;
}

function mapStateToProps(state) {
    return { };
}

export default withRouter(reduxForm({validate:validate, form: 'signupClubForm'})(connect(mapStateToProps,{addFlashMessage,loading,registerClub})(SignupClub)));