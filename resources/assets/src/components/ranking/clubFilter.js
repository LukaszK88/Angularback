import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {updateUser} from '../../../actions';
import {fetchClubs} from '../../../actions/clubs';
import { input } from '../../../helpers/input';
import _ from 'lodash';
import { Tooltip } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

class UpdateUser extends Component{
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

    componentDidMount(){
        this.props.fetchClubs();
    }

    onSubmit(values){
        this.props.updateUser(values);
        this.handleClose();
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    renderClubSelection(){
        const options = _.map(this.props.clubs, (club) => {
            return {key:club.id , value:club.id, flag:club.country, text:club.name}
        });

        if(this.props.currentUser.user.club){
            return (<div>
                    <p id="club">{this.props.currentUser.user.club.name}</p>
                    <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="club"
                             toggle={this.toggle.bind(this)}>
                        Contact your Team Captain to change your club
                    </Tooltip>
                </div>
            )
        }else{
            return(
                <Field
                    label="Your Club *"
                    name="club_id"
                    placeholder="Your Club"
                    options={options}
                    component={input.renderSelect}
                />
            )
        }
    }

    render(){

        const handleSubmit = this.props.handleSubmit;



        return(

            <Modal size="mini" open={this.state.modalOpen}  onClose={this.handleClose} trigger={<button type="button" onClick={this.handleOpen}>Personal Info </button>}>
                <Modal.Header>Info</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Your Name *"
                                name="name"
                                placeholder="Your name"
                                type="text"
                                component={input.renderField}
                            />
                            <br/>
                            {this.renderClubSelection()}
                            <br/>
                            <Field
                                label="Weight *"
                                name="weight"
                                min={50}
                                max={140}
                                placeholder="Your weight"
                                component={input.renderSlider}
                            />
                            <br/>
                            <Field
                                label="Favourite Quote"
                                name="quote"
                                placeholder="Your favourite quote..."
                                type="text"
                                component={input.renderField}
                            />
                            <br/>
                            <Field
                                label="About"
                                name="about"
                                component={input.renderTextField}
                            />
                            <br/>
                            <Field
                                label="Date of birth *"
                                name="age"
                                component={input.renderDatepicker}
                            />

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

    if(!values.name){
        errors.name = "Enter your name";
    }
    if(!values.club){
        errors.club = "Select your Club";
    }
    if(!values.weight){
        errors.weight = "Weight is mandatory";
    }
    if(!values.age){
        errors.age = "Age is mandatory";
    }

    return errors;
}


function mapStateToProps(state, ownProps) {
    return {currentUser: state.currentUser,
        clubs: state.clubs
    };
}

let InitializeFromStateForm = reduxForm({
    validate:validate,
    form: 'clubFilter',
    enableReinitialize : true
})(UpdateUser);

InitializeFromStateForm = connect(
    mapStateToProps,{updateUser,fetchClubs}
)(InitializeFromStateForm);

export default InitializeFromStateForm;