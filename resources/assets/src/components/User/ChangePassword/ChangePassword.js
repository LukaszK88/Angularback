import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { addFlashMessage, updatePassword } from '../../../actions';
import { input } from '../../../helpers/input';


class ChangePassword extends Component {
  constructor() {
    super();

    this.state = ({
      modalOpen: false,
    });
  }

  onSubmit(values) {
    this.props.updatePassword(values);
    this.setState({ modalOpen: false });
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }


  render() {
    const handleSubmit = this.props.handleSubmit;

    return (
      <Modal
        closeIcon
        size="mini"
        open={this.state.modalOpen}
        onClose={() => this.handleClose()}
        trigger={<span onClick={() => this.handleOpen()} >
            Change password
        </span>}
      >
        <Modal.Header>Change Password</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Current Password"
                name="currentPassword"
                type="password"
                component={input.renderField}
              />
              <Field
                label="New Password"
                name="newPassword"
                type="password"
                component={input.renderField}
              />
              <Field
                label="Confirm New Password"
                name="newPasswordAgain"
                type="password"
                component={input.renderField}
              />
              <Button color="black" type="submit">Change</Button>
            </form>

          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.newPassword) {
    errors.newPassword = 'New Password cannot be empty';
  }
  if (values.newPassword !== values.newPasswordAgain) {
    errors.newPasswordAgain = 'Passwords must match';
  }
  if (!values.currentPassword) {
    errors.currentPassword = 'Current Password should not be empty';
  }

  return errors;
}

function mapStateToProps(state) {
  return { };
}

export default withRouter(reduxForm({ validate, form: 'changePasswordForm' })(connect(mapStateToProps, { addFlashMessage, updatePassword })(ChangePassword)));
