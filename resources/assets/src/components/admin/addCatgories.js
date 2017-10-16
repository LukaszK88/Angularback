import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Icon } from 'semantic-ui-react';
import { Field, reduxForm,change } from 'redux-form';
import _ from 'lodash';
import { Tooltip } from 'reactstrap';
import { input } from '../../helpers/input';
import { config } from '../../config';
import {addEventCategories} from '../../actions/events';

class AddCategories extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            tooltipOpen: false,
            value: 50
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    onSubmit(values){
        values.event_id = this.props.event.id;
        this.props.addEventCategories(values);
        this.handleClose();
    }

    renderCategories() {
        return _.map(config.select.categories, (category,key) => {
            return(
                <span>
                    <div style={{display:'-webkit-inline-box',marginBottom:'10px'}} className="col-md-5">
                        <Field
                            label={category.value}
                            name={category.value}
                            component={input.renderSwitchCheckbox}
                        />

                    </div>
                </span>
            )
        });
    }

    handleOpen = () => {
        this.props.reset();
        this.setState({ modalOpen: true });
        _.forEach(this.props.event.category,(category) => {
            this.props.dispatch(change('addCategoriesForm',category.name,'on'));
        });
    }

    handleClose = () => {
        this.setState({ modalOpen: false });
    }

    render(){

        const handleSubmit = this.props.handleSubmit;

        return(

            <Modal closeIcon size="tiny" open={this.state.modalOpen}  onClose={this.handleClose}
                   trigger={

                       <Icon id="category" className="icon-md-margin-right" onClick={this.handleOpen} size="large" name="shield">
                           <Tooltip placement="left" isOpen={this.state.tooltipOpen} target="category"
                                    toggle={this.toggle.bind(this)}>
                               Click to add categories
                           </Tooltip>
                       </Icon>
                   }>
                <Modal.Header>Add Categories</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            {this.renderCategories()}

                            <Button color={'black'} type="submit">Submit</Button>
                        </form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

function validate(values) {
    const errors = {};

    if(!values.title){
        errors.title = "Event title is mandatory";
    }
    if(!values.location){
        errors.location = "Event location is mandatory";
    }
    if(!values.event_type_id){
        errors.event_type_id = "Type is mandatory";
    }
    if(!values.date){
        errors.date = "Event date is mandatory";
    }

    return errors;
}


function mapStateToProps(state, ownProps) {
    return { currentUser:state.currentUser};
}

let InitializeFromStateForm = reduxForm({
    validate:validate,
    form: 'addCategoriesForm'
})(AddCategories);

InitializeFromStateForm = connect(
    mapStateToProps,{addEventCategories}
)(InitializeFromStateForm);

export default InitializeFromStateForm;