import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { Field, reduxForm, change } from 'redux-form';
import _ from 'lodash';
import { input } from '../../../helpers/input';
import { config } from '../../../config';
import { addEventCategories } from '../../../actions/events';

class AddCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };
  }

  onSubmit(values) {
    this.props.addCategoryToBag(values);
    this.handleClose();
  }

  handleOpen(e) {
    e.preventDefault();
    this.props.reset();
    this.setState({ modalOpen: true });
    _.forEach(this.props.categoryBag, (value, category) => {
      this.props.dispatch(change('addCategoriesForm', category, value));
    });
  }

  handleClose() {
    this.setState({ modalOpen: false });
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

  render() {
    const handleSubmit = this.props.handleSubmit;

    return (

      <Modal
        closeIcon
        size="tiny"
        open={this.state.modalOpen}
        onClose={() => this.handleClose()}
        trigger={
          <Button
            color="black"
            onClick={e => this.handleOpen(e)}
            size="tiny"
          >
            Add Categories
          </Button>
        }
      >
        <Modal.Header>Add Categories</Modal.Header>
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

function mapStateToProps(state, ownProps) {
  return { currentUser: state.currentUser };
}

let InitializeFromStateForm = reduxForm({
  form: 'addCategoriesForm',
})(AddCategories);

InitializeFromStateForm = connect(mapStateToProps, { addEventCategories })(InitializeFromStateForm);

export default InitializeFromStateForm;
