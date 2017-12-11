import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../../actions';
import { withRouter } from 'react-router-dom';
import { input } from '../../helpers/input';
import { loading } from '../../actions/config';

class PasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }
  onSubmit(values) {
    values.username = this.props.username;
    this.props.loading(true);
    this.props.loginUser(values, this.props.createPassword);
  }

  render() {
    const handleSubmit = this.props.handleSubmit;

    return (
      <Modal closeIcon size="tiny" open={this.props.passwordModal} onClose={this.props.handleClose} trigger={<Button loading={this.props.config.loading} color="black" type="submit">Login</Button>}>
        <Modal.Header>Login </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Password"
                name="password"
                type="password"
                component={input.renderField}
              />
              {this.props.createPassword &&
              <Field
                label="Confirm Password"
                name="newPasswordAgain"
                type="password"
                component={input.renderField}
              />
              }
              <br />
              <Button loading={this.props.config.loading} color="black" type="submit">Login</Button>
            </form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.password) {
    errors.password = 'Password should not be empty';
  }
  if (!values.newPasswordAgain) {
    errors.newPassword = 'Password confirmation cannot be empty';
  }
  if (values.newPasswordAgain !== values.password) {
    errors.newPasswordAgain = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { config: state.config };
}

export default withRouter(reduxForm({ validate, form: 'passwordForm' })(connect(mapStateToProps, { loginUser, loading })(PasswordModal)));
