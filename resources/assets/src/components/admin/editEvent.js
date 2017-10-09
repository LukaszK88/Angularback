import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, List, Radio } from 'semantic-ui-react';
import { Field, reduxForm, change } from 'redux-form';
import {updateEvent} from '../../actions/events';
import _ from 'lodash';
import { Tooltip } from 'reactstrap';
import { input } from '../../helpers/input';
import { config } from '../../config';
import { stringHelper } from '../../helpers/string';

class EditEvent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            tooltipOpen: false,
            showDatePicker:false,
            value: 50
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    onSubmit(values){
        values.user_id = this.props.currentUser.user.id;
        values.id = this.props.event.id;
        if(values.radioGroup == 'club_id') {
            values.club_id = this.props.currentUser.user.club_id;
            values.global = false;
        }else if (values.radioGroup == 'global'){
            values.global = true;
            values.club_id = null;
        }
        delete values.radioGroup;
        this.props.updateEvent(values);
        this.setState({ showDatePicker: false });
        this.handleClose();
    }

    radioGroupValue(){
      return this.props.event.global ? 'global' : 'club_id';
    }

    handleOpen = () => {
        this.props.reset();

        this.props.dispatch(change('editEventForm','title',this.props.event.title));
        this.props.dispatch(change('editEventForm','location',this.props.event.location));
        this.props.dispatch(change('editEventForm','radioGroup',this.radioGroupValue()));

        this.setState({ modalOpen: true });
    };

    renderRadio(field){
        return(
            <div>
                <Radio slider
                       {...field.input}
                       label={field.label}
                       value={field.radioValue}
                       checked={field.input.value === field.radioValue}
                       onChange={(e, { value }) => field.input.onChange(value)}

                />
                <div style={{color:'red'}} className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        )
    }

    handleClose = () => {
        this.setState({ modalOpen: false });
    };

    render(){

        const locations = _.map(config.select.locations,(location) => {
            return {key:location.name,value:location.countryCode,text:location.name,flag:location.countryCode}
        });

        const handleSubmit = this.props.handleSubmit;

        return(

            <Modal closeIcon size="mini" open={this.state.modalOpen}  onClose={this.handleClose} trigger={<List.Icon className="icon-md-margin-right" onClick={this.handleOpen} size="large" name="edit"/>}>
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
                            <br/>
                            <div className="row">
                                <div className="col-sm-6">
                                    <Field
                                        label="Global Event"
                                        name="radioGroup"
                                        radioValue="global"
                                        component={this.renderRadio}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <Field
                                        label="Club only"
                                        name="radioGroup"
                                        radioValue="club_id"
                                        component={this.renderRadio}
                                    />
                                </div>
                            </div>
                            <br/>
                            <p>{this.props.event.event_type.type}</p>
                            <br/>
                            <Field
                                label="Event Location"
                                name="location"
                                placeholder="Select Event Location"
                                options={locations}
                                component={input.renderSelect}
                            />
                            <br/>
                            {(this.props.event.date && !this.state.showDatePicker) &&
                            <div>
                                <p onClick={() => {this.setState({ showDatePicker: true })}} id="date">{stringHelper.limitTo(this.props.event.date,10)}</p><br/>
                                <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="date"
                                         toggle={this.toggle.bind(this)}>
                                    Click to update
                                </Tooltip>
                            </div>
                            }
                            {(this.state.showDatePicker) &&
                            <Field
                                label="Event Date"
                                name="date"
                                component={input.renderDatepicker}
                            />
                            }
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
    if(!values.date){
        errors.date = "Event date is mandatory";
    }
    if(!values.radioGroup){
        errors.radioGroup = "Select one option";
    }

    return errors;
}


function mapStateToProps(state) {
    return { currentUser:state.currentUser};
}

let InitializeFromStateForm = reduxForm({
    validate:validate,
    form: 'editEventForm'
})(EditEvent);

InitializeFromStateForm = connect(
    mapStateToProps,{updateEvent}
)(InitializeFromStateForm);

export default InitializeFromStateForm;