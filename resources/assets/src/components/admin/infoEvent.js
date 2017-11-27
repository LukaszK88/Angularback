import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Icon, Radio } from 'semantic-ui-react';
import { Field, reduxForm, change } from 'redux-form';
import {updateEvent} from '../../actions/events';
import _ from 'lodash';
import { Tooltip } from 'reactstrap';
import { input } from '../../helpers/input';
import { config } from '../../config';
import { stringHelper } from '../../helpers/string';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class InfoEvent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            tooltipOpen: false,
            showDatePicker:true,
            address: '',
            value: 50
        };
        this.onChange = (address) => this.setState({ address });

    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    onSubmit(values) {
        values.user_id = this.props.currentUser.user.id;
        values.id = this.props.event.id;
        if (values.make_page == 'true') {
            values.make_page = true;
        } else {
            values.make_page = false;

        }
        if(this.state.address != '') {
            geocodeByAddress(this.state.address)
                .then(results => getLatLng(results[0]))
                .then(latLng => {
                    values.lat = latLng.lat;
                    values.lng = latLng.lng;
                    this.props.updateEvent(values);
                    if (values.end) {
                        this.setState({showDatePicker: false});
                    }
                    this.handleClose();

                })
                .catch(error => console.error('Error', error));
        }else{
            this.props.updateEvent(values);
            if (values.end) {
                this.setState({showDatePicker: false});
            }
            this.handleClose();
        }

    }

    radioGroupValue(){
      return this.props.event.make_page ? 'true' : false;
    }

    handleOpen = () => {
        this.props.reset();
        if(this.props.event.end){
            this.setState({ showDatePicker: false });
        }
        this.props.dispatch(change('infoEventForm','body',this.props.event.body));
        this.props.dispatch(change('infoEventForm','make_page',this.radioGroupValue()));

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
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        }
        const handleSubmit = this.props.handleSubmit;

        return(

            <Modal closeIcon size="mini" open={this.state.modalOpen}  onClose={this.handleClose}
                   trigger={
                       <Icon id="page" className="icon-md-margin-right" onClick={this.handleOpen} size="large" name="picture">
                           <Tooltip  placement="bottom" isOpen={this.state.tooltipOpen} target="page"
                                    toggle={this.toggle.bind(this)}>
                               Click to add event page
                           </Tooltip>
                       </Icon>
                   }>
                <Modal.Header>Create Event Page</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                            label="Make page"
                            name="make_page"
                            radioValue='true'
                            component={this.renderRadio}
                            />
                            <br/>
                            {(this.props.event.end && !this.state.showDatePicker) &&
                            <div>
                                <p onClick={() => {this.setState({ showDatePicker: true })}} id="date">{stringHelper.limitTo(this.props.event.end,10)}</p><br/>
                                <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="date"
                                         toggle={this.toggle.bind(this)}>
                                    Click to update
                                </Tooltip>
                            </div>
                            }
                            {(this.state.showDatePicker) &&
                            <Field
                                label="Event End"
                                name="end"
                                component={input.renderDatepicker}
                            />
                            }
                            <br/>
                            <Field
                                label="Description"
                                name="body"
                                component={input.renderTextField}
                            />
                            <br/>
                            <label>Tournament location</label>
                            <PlacesAutocomplete inputProps={inputProps} />
                            <br/>
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



    return errors;
}


function mapStateToProps(state) {
    return { currentUser:state.currentUser};
}

let InitializeFromStateForm = reduxForm({
    validate:validate,
    form: 'infoEventForm'
})(InfoEvent);

InitializeFromStateForm = connect(
    mapStateToProps,{updateEvent}
)(InitializeFromStateForm);

export default InitializeFromStateForm;