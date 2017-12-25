import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { Field, reduxForm, change } from 'redux-form';
import _ from 'lodash';
import { input } from '../../../helpers/input';
import { config } from '../../../config';
import { addEventCategories } from '../../../actions/events';

class EditCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };
  }

  onSubmit(values) {
    values.event_id = this.props.event.id;
    values.user_id = this.props.currentUser.user.id;
    // preset to false unless is true
    _.forEach(config.select.categories, (category) => {
      if (!values.hasOwnProperty(category.value)) {
        values[category.value] = false;
      }
    });
    this.props.addEventCategories(values);
    this.handleClose();
  }

  renderCategories() {
    return _.map(config.select.categories, (category, key) => (
      <span>
        <div style={{ display: '-webkit-inline-box', marginBottom: '10px' }} className="col-md-5">
          <Field
            label={category.value}
            name={category.value}
            component={input.renderSwitchCheckbox}
          />

        </div>
      </span>
    ));
  }

  handleOpen() {
    this.props.reset();
    this.setState({ modalOpen: true });
    // set event active cat to true
    _.forEach(this.props.event.category, (category) => {
      this.props.dispatch(change('editCategoriesForm', category.name, true));
    });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    const handleSubmit = this.props.handleSubmit;

    return (
      <Modal
        closeIcon
        size="tiny"
        open={this.state.modalOpen}
        onClose={() => this.handleClose()}
        trigger={
          <Button className="greenEmptyButton" onClick={() => this.handleOpen()} size="tiny">Categories</Button>
             }
      >
        <Modal.Header>Edit Categories</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              {this.renderCategories()}
              <Button color="black" type="submit">Assign</Button>
            </form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

let InitializeFromStateForm = reduxForm({
  form: 'editCategoriesForm',
})(EditCategories);

InitializeFromStateForm = connect(mapStateToProps, { addEventCategories })(InitializeFromStateForm);

export default InitializeFromStateForm;
