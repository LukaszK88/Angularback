import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { registerClubFighter } from '../../../actions/clubs';
import { input } from '../../../helpers/input';

class AddFighter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  onSubmit(values) {
    values.club_id = this.props.clubId;
    this.props.registerClubFighter(values);
    this.handleClose();
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

      <Modal closeIcon size="mini" open={this.state.modalOpen} onClose={() => this.handleClose()} trigger={<Button onClick={() => this.handleOpen()} color="black" size="tiny" content="Add Fighters" />}>
        <Modal.Header>Add Fighter</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Fighters Name *"
                name="name"
                placeholder="Fighters Name"
                type="text"
                component={input.renderField}
              />
              <br />
              <Field
                label="Fighters email *"
                name="email"
                placeholder="Fighters email"
                type="text"
                component={input.renderField}
              />
              <br />
              <Button color="black" type="submit">Add</Button>
            </form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

function validate(values) {
  const errors = {};
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (values.email && !regExp.test(values.email)) {
    errors.email = 'Email should be a valid email';
  }
  if (!values.name) {
    errors.name = 'Enter Fighters name';
  }
  if (!values.email) {
    errors.email = 'Email is compulsory to';
  }
  return errors;
}


export default reduxForm({ validate, form: 'addFighter' })(connect(null,{ registerClubFighter })(AddFighter));
