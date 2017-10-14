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
                    name="email"
                    placeholder="Contact email"
                    type="text"
                    component={input.renderField}
                />
                <Field
                    label="Password *"
                    name="password"
                    placeholder="Password"
                    type="password"
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
    if(values.email && values.email.length < 4){
        errors.email = "Email should be min 4 chars";
    }
    if(values.email && !regExp.test(values.email)){
        errors.email = "Email should be a valid email";
    }
    if(!values.email){
        errors.email = "Email should not be empty";
    }
    if(!values.country){
        errors.country = "Country should not be empty";
    }
    if(!values.password){
        errors.password = "You need to secure your account...";
    }
    if(values.password && values.password.length < 6){
        errors.password = "give me six..";
    }

    return errors;
}

function mapStateToProps(state) {
    return { };
}

export default withRouter(reduxForm({validate:validate, form: 'signupClubForm'})(connect(mapStateToProps,{addFlashMessage,loading,registerClub})(SignupClub)));