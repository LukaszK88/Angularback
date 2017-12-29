import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { Field, reduxForm, change } from 'redux-form';
import { addEvent, getEventTypes } from '../../../actions/events';
import _ from 'lodash';
import { input } from '../../../helpers/input';
import { config } from '../../../config';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import moment from 'moment';

class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      address: '',
      categoryBag: {},
      startDate: null,
      endDate: null,
      showCategories: false,
    };
    this.onChange = address => this.setState({ address });
    this.addCategoryToBag = this.addCategoryToBag.bind(this);
  }

  componentDidMount() {
    this.props.getEventTypes();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.startDate && nextState.endDate === null) {
      this.props.dispatch(change('addEventForm', 'end', new Date(moment(nextState.startDate).add(1, 'days'))));
    }
  }

  onSubmit(values) {
    values.user_id = this.props.currentUser.user.id;
    values.categories = this.state.categoryBag;
    if (values.club_id === true) {
      values.club_id = this.props.currentUser.user.club_id;
    }
    if (this.state.address !== '') {
      geocodeByAddress(this.state.address)
        .then(results => getLatLng(results[0]))
        .then((latLng) => {
          values.lat = latLng.lat;
          values.lng = latLng.lng;
          this.props.addEvent(values);
        });
    } else {
      this.props.addEvent(values);
    }
    this.setState({ categoryBag: [], showCategories: false });
    this.handleClose();
  }

  addCategoryToBag(category, value) {
    this.setState({ categoryBag: Object.assign({}, this.state.categoryBag, this.state.categoryBag[category] = value) });
  }

  handleOpen() {
    this.props.reset();
    _.forEach(this.props.categoryBag, (value, category) => {
      this.props.dispatch(change('addEventForm', category, value));
    });
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  showCategories(e) {
    e.preventDefault();
    this.setState({ showCategories: !this.state.showCategories });
  }

  renderCategories() {
    return _.map(config.select.categories, (category, key) => (
      <span>
        <div style={{ display: '-webkit-inline-box', marginBottom: '10px' }} className="col-md-6 col-6">
          <Field
            label={category.value}
            name={category.value}
            component={input.renderSwitchCheckbox}
            onChange={(e, value) => this.addCategoryToBag(category.value, value)}
          />
        </div>
      </span>
    ));
  }


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

      <Modal
        closeIcon
        size="tiny"
        open={this.state.modalOpen}
        onClose={() => this.handleClose()}
        trigger={<Button className="float-right" color="black" onClick={() => this.handleOpen()}>Add Event </Button>}
      >
        <Modal.Header>Add Event</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className="row">
                <div className="col-sm-9">
                  <Field
                    label="Event Title *"
                    name="title"
                    placeholder="Event Title"
                    type="text"
                    component={input.renderField}
                  />
                </div>
                <div style={{ alignSelf: 'flex-end' }} className="col-sm-3">
                  <Field
                    label="Club Only"
                    name="club_id"
                    radioValue="club_id"
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
                    placeholder="Select Event Country"
                    options={locations}
                    component={input.renderSelect}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <Field
                    label="Event Start"
                    name="date"
                    onChange={(e, value) => this.setState({ startDate: value })}
                    component={input.renderDatepicker}
                  />
                </div>
                <div className="col-sm-6">
                  <Field
                    label="Event End"
                    name="end"
                    onChange={(e, value) => this.setState({ endDate: value })}
                    component={input.renderDatepicker}
                  />
                </div>
              </div>
              <Field
                label="Description"
                name="body"
                component={input.renderTextField}
              />
              <br />
              {/* categories */}
              <div className="row">
                <div className="col-sm-12">
                  {this.state.showCategories &&
                  <Icon style={{ marginBottom: '15px' }}  onClick={e => this.showCategories(e)} name="remove" />
                  }
                  {!this.state.showCategories &&
                  <Button
                    color="black"
                    onClick={e => this.showCategories(e)}
                    size="tiny"
                  >
                    Add Categories
                  </Button>
                  }
                </div>
              </div>
                  {this.state.showCategories &&
                  <div className="row">
                    <div className="col-sm-12">
                      { this.renderCategories()}
                    </div>
                  </div>
                  }


              <br />
              <label>Tournament location</label>
              <PlacesAutocomplete inputProps={inputProps} />
              <br />
              <Button color="black" type="submit">Create Event</Button>
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
  if (!values.event_type_id) {
    errors.event_type_id = 'Type is mandatory';
  }
  if (!values.date) {
    errors.date = 'Event start date is mandatory';
  }

  return errors;
}


function mapStateToProps(state, ownProps) {
  return {
    currentUser: state.currentUser,
    eventTypes: state.events.eventTypes,
  };
}

let InitializeFromStateForm = reduxForm({
  validate,
  form: 'addEventForm',
})(AddEvent);

InitializeFromStateForm = connect(mapStateToProps, { addEvent, getEventTypes })(InitializeFromStateForm);

export default InitializeFromStateForm;
