import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon, Radio } from 'semantic-ui-react';
import { Field, reduxForm, change } from 'redux-form';
import { updateEvent, getEventTypes } from '../../../../actions/events';
import _ from 'lodash';
import { input } from '../../../../helpers/input';
import { config } from '../../../../config';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import moment from 'moment';

class EditEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      modalOpen: false,
    };
    this.onChange = address => this.setState({ address });
  }

  onSubmit(values) {
    values.user_id = this.props.currentUser.user.id;
    values.id = this.props.event.id;
    if (values.club_id === true) {
      values.club_id = this.props.currentUser.user.club_id;
    } else {
      values.club_id = null;
    }
    if (this.state.address !== '') {
      geocodeByAddress(this.state.address)
        .then(results => getLatLng(results[0]))
        .then((latLng) => {
          values.lat = latLng.lat;
          values.lng = latLng.lng;
          this.props.updateEvent(values);
          this.handleClose();
        });
    } else {
      this.props.updateEvent(values);
      this.handleClose();
    }
  }

  componentDidMount() {
    this.props.getEventTypes();
  }

  handleOpen = () => {

      this.props.reset();

      this.props.dispatch(change('editEventForm', 'title', this.props.event.title));
      this.props.dispatch(change('editEventForm', 'location', this.props.event.location));
      this.props.dispatch(change('editEventForm', 'event_type_id', this.props.event.event_type_id));
      this.props.dispatch(change('editEventForm', 'club_id', this.props.event.club_id !== null));
      this.props.dispatch(change('editEventForm', 'body', this.props.event.body));
      this.props.dispatch(change('editEventForm', 'date', new Date(this.props.event.date.replace(' ', 'T'))));
      this.props.dispatch(change('editEventForm', 'date', new Date(this.props.event.end.replace(' ', 'T'))));
    this.setState({ modalOpen: true });
  }


  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const eventTypes = _.map(this.props.eventTypes, type => ({ key: type.id, value: type.id, text: type.type }));

    const locations = _.map(config.select.locations, location => ({
      key: location.name, value: location.countryCode, text: location.name, flag: location.countryCode,
    }));

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    };

    const handleSubmit = this.props.handleSubmit;

    return (
      <Modal closeIcon size="mini" open={this.state.modalOpen}  onClose={this.handleClose}
             trigger={
               <Button className="greenEmptyButton" onClick={this.handleOpen}size="tiny">Edit</Button>
             }>
        <Modal.Header>Edit Event</Modal.Header>
        <Modal.Content>
          <Modal.Description>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Event Title *"
            name="title"
            placeholder="Event Title"
            type="text"
            component={input.renderField}
          />
          <br />
          <div className="row">
            <div className="col-sm-6">
              <Field
                label="Club only"
                name="club_id"
                component={input.renderSwitchCheckbox}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-6">
              <Field
                label="Event Type"
                name="event_type_id"
                placeholder="Select Event Type"
                options={eventTypes}
                component={input.renderSelect}
              />
            </div>
            <div className="col-sm-6">
              <Field
                label="Event Location"
                name="location"
                placeholder="Select Event Location"
                options={locations}
                component={input.renderSelect}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-6">
              <Field
                label="Event Start"
                name="date"
                component={input.renderDatepicker}
              />
            </div>
            <div className="col-sm-6">
              <Field
                label="Event End"
                name="end"
                component={input.renderDatepicker}
              />
            </div>
          </div>
          <br />
          <Field
            label="Description"
            name="body"
            component={input.renderTextField}
          />
          <br />
          <label>Tournament location</label>
          <PlacesAutocomplete inputProps={inputProps} />
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

  if (!values.title) {
    errors.title = 'Event title is mandatory';
  }
  if (!values.location) {
    errors.location = 'Event location is mandatory';
  }
  if (!values.date) {
    errors.date = 'Event date is mandatory';
  }

  return errors;
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    eventTypes: state.events.eventTypes,
  };
}

let InitializeFromStateForm = reduxForm({
  validate,
  form: 'editEventForm',
})(EditEvent);

InitializeFromStateForm = connect(mapStateToProps, { updateEvent, getEventTypes })(InitializeFromStateForm);

export default InitializeFromStateForm;
