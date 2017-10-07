import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { recoverPassword } from '../../actions';
import {withRouter} from 'react-router-dom';
import {addFlashMessage} from '../../actions/flashMessages';
import { input } from '../../helpers/input';


class ForgotPassword extends Component{
    constructor(){
        super();

        this.state = ({
            modalOpen:false
        });
    }

    onSubmit(values){
        this.props.recoverPassword(values);
        this.setState({modalOpen:false});
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });


    render(){
        const handleSubmit = this.props.handleSubmit;

        return(
            <Modal closeIcon size={'tiny'} open={this.state.modalOpen}  onClose={this.handleClose} trigger={<Button className="float-right" size="tiny" color={'black'} onClick={this.handleOpen} >Forgot password?</Button>}>
                <Modal.Header>Forgot Password</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Email"
                                name="username"
                                type="text"
                                component={input.renderField}
                            />
                            <Button color={'black'} type="submit">Send</Button>
                        </form>

                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )

    }
}

function validate(values) {
    const errors = {};

    let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!values.username){
        errors.username = "Username cannot be empty";
    }
    if(values.username && values.username.length < 4){
        errors.username = "Username should be min 4 chars";
    }
    if(values.username && !regExp.test(values.username)){
        errors.username = "Username should be a valid email";
    }


    return errors;
}

function mapStateToProps(state) {
    return { };
}

export default withRouter(reduxForm({validate:validate, form: 'forgotPasswordForm'})(connect(mapStateToProps,{recoverPassword,addFlashMessage})(ForgotPassword)));