import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Icon } from 'semantic-ui-react';
import { Field, reduxForm,change } from 'redux-form';
import _ from 'lodash';
import { Tooltip } from 'reactstrap';
import { input } from '../../../../helpers/input';
import { config } from '../../../../config';
import {attendEvent} from '../../../../actions/events';

class Attend extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    onSubmit(values){
        const { event, currentUser} = this.props;
        const attendance = _.find(event.attendance,function(o) { return o.user_id == currentUser.user.id });
        if(attendance) {
            _.forEach(attendance.event_attend_category, (category) => {
                if(!values.hasOwnProperty(category.name)){
                    values[category.name] = false;
                }
            });

        }
        this.props.attendEvent(values,this.props.event.id,this.props.currentUser.user.id);
        this.handleClose();
    }

    renderCategories() {
        return _.map(this.props.event.category, (category) => {

            return(
                <span key={category.id}>
                    <div style={{display:'-webkit-inline-box',marginBottom:'10px'}} className="col-md-5">
                        <Field
                            label={category.name}
                            name={category.name}
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
        const { event, currentUser} = this.props;
        const attendance = _.find(event.attendance,function(o) { return o.user_id == currentUser.user.id });
        if(attendance) {
            _.forEach(attendance.event_attend_category, (category) => {
                this.props.dispatch(change('attendForm', category.name, true));
            });
        }
    }

    handleClose = () => {
        this.setState({ modalOpen: false });
    }

    render(){

        const handleSubmit = this.props.handleSubmit;

        return(

            <Modal closeIcon size="tiny" open={this.state.modalOpen}  onClose={this.handleClose} trigger={<Button onClick={this.handleOpen} basic color='black'>Attend</Button>}>
                <Modal.Header>Attend Categories</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            {this.renderCategories()}
                            <br/>
                            <Button color={'black'} type="submit">Attend</Button>
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


function mapStateToProps(state, ownProps) {
    return { currentUser:state.currentUser};
}

let InitializeFromStateForm = reduxForm({
    validate:validate,
    form: 'attendForm'
})(Attend);

InitializeFromStateForm = connect(
    mapStateToProps,{attendEvent}
)(InitializeFromStateForm);

export default InitializeFromStateForm;