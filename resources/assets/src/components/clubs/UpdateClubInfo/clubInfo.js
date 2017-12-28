import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { Field, reduxForm, change } from 'redux-form';
import { updateClub, fetchClub } from '../../../actions';
import { input } from '../../../helpers/input';
import _ from 'lodash';
import { config } from '../../../config';

class ClubInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      tooltipOpen: false,
      value: 50,
      showDatePicker: false,
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  onSubmit(values) {
    this.props.updateClub(this.props.club.id, values);
    this.handleClose();
  }

  handleOpen() {
    this.props.dispatch(change('updateClubInfo', 'name', this.props.club.name));
    this.props.dispatch(change('updateClubInfo', 'fb', this.props.club.fb));
    this.props.dispatch(change('updateClubInfo', 'description', this.props.club.description));
    this.props.dispatch(change('updateClubInfo', 'motto', this.props.club.motto));
    this.props.dispatch(change('updateClubInfo', 'foundation',
      (this.props.club.foundation === null ? new Date() : new Date(this.props.club.foundation.replace(' ', 'T')))));

    this.props.dispatch(change('updateClubInfo', 'country', this.props.club.country));
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }


  render() {
    const locations = _.map(config.select.locations, location => ({
      key: location.name, value: location.countryCode, text: location.name, flag: location.countryCode,
    }));
    const handleSubmit = this.props.handleSubmit;

    return (

      <Modal
        closeIcon
        size="mini"
        open={this.state.modalOpen}
        onClose={() => this.handleClose()}
        trigger={<span className={this.props.class} onClick={() => this.handleOpen()}>
          Manage Club Page
        </span>}
      >
        <Modal.Header>Update Club Info</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Club Name *"
                name="name"
                placeholder="Club name"
                type="text"
                component={input.renderField}
              />

              <Field
                label="Club FB page "
                name="fb"
                placeholder="Club FB fan page"
                type="text"
                component={input.renderField}
              />

              <Field
                label="Club motto"
                name="motto"
                placeholder="Your Clubs favourite motto..."
                type="text"
                component={input.renderField}
              />
              <br />
              <Field
                label="Club Description"
                name="description"
                component={input.renderTextField}
              />
              <br />
              <Field
                label="Date of Foundation *"
                name="foundation"
                component={input.renderDatepicker}
              />
              <br />
              <Field
                label="Country *"
                name="country"
                placeholder="Select Country"
                options={locations}
                component={input.renderSelect}
              />

              <br />
              <Button color="black" type="submit">Submit</Button>
            </form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Club name is essential';
  }
  if (!values.country) {
    errors.country = 'This is important..';
  }
  if (!values.foundation) {
    errors.foundation = 'Who remembers that..';
  }

  return errors;
}


function mapStateToProps(state, ownProps) {
  return { currentUser: state.currentUser };
}

let InitializeFromStateForm = reduxForm({
  validate,
  form: 'updateClubInfo',
})(ClubInfo);

InitializeFromStateForm = connect(mapStateToProps, { fetchClub, updateClub })(InitializeFromStateForm);

export default InitializeFromStateForm;
