import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { checkUsername, loginWithFacebook } from '../../actions';
import {withRouter} from 'react-router-dom';
import { input } from '../../helpers/input';
import ForgotPassword from './forgotPassword';
import FacebookProvider, { Login } from 'react-facebook';
import { loading } from '../../actions/config';
import PasswordModal from './password';

class LoginModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
          modalOpen: false,
          passwordModal:false,
          username:null,
          createPassword:false,
        };
    }
    onSubmit(values){
        this.props.loading(true);
        this.props.checkUsername(values, (response) => {
          if(response.status === 200){
            console.log(response);
            this.setState({ passwordModal:true });
            this.setState({ username:values.username });
            if(response.data.password === 1) {
              this.setState({ createPassword:true })
            }
          }
        });
    }

    handleOpen = () => {
        this.setState({ modalOpen: true });
    };

    handleClose = () => this.setState({ modalOpen: false });

    handlePasswordOpen() {
      this.setState({ passwordModal: true });
    };

    handlePasswordClose() {
      this.setState({ passwordModal: false });
      this.setState({ createPassword:false })
    }


    render(){
        const handleSubmit = this.props.handleSubmit;

        return(
            <Modal closeIcon size={'tiny'}  trigger={<a className="nav-link">Login</a>}>
                <Modal.Header>Login </Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Username"
                                name="username"
                                type="text"
                                component={input.renderField}
                            />
                            <Button.Group className="hidden-md-up" size="tiny">

                            <Button loading={this.props.config.loading}  color={'black'} type="submit">Login</Button>
                                <Button.Or />

                            <FacebookProvider appId="1884018281856728">
                                <Login
                                    scope="email"
                                    onResponse={this.props.loginWithFacebook}

                                    render={({ isLoading, isWorking, onClick }) => (

                                        <span onClick={onClick}>
                                            <Button color='facebook'>
                                                <Icon name='facebook' /> Facebook
                                            </Button>
                                            </span>
                                    )}
                                />
                            </FacebookProvider>
                            </Button.Group>
                            <Button.Group className="hidden-md-down">

                               <PasswordModal
                                 username={this.state.username}
                                 passwordModal={this.state.passwordModal}
                                 handleOpen={() => this.handlePasswordOpen()}
                                 handleClose={() => this.handlePasswordClose()}
                                 createPassword={this.state.createPassword}
                               />
                                <Button.Or />

                                <FacebookProvider appId="1884018281856728">
                                    <Login
                                        scope="email"
                                        onResponse={this.props.loginWithFacebook}

                                        render={({ isLoading, isWorking, onClick }) => (

                                            <span onClick={onClick}>
                                            <Button color='facebook'>
                                                <Icon name='facebook' /> Facebook
                                            </Button>
                                            </span>
                                        )}
                                    />
                                </FacebookProvider>
                            </Button.Group>
                            <ForgotPassword/>
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
    return {config:state.config };
}

export default withRouter(reduxForm({validate:validate, form: 'addPostForm'})(connect(mapStateToProps,{checkUsername,loginWithFacebook,loading})(LoginModal)));