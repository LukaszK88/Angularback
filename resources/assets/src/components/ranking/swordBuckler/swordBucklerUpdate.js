import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {withRouter} from 'react-router-dom';
import { storeRanking} from '../../../actions/ranking';
import _ from 'lodash';
import { input } from '../../../helpers/input';
import LastRecords from './../partials/lastRecords';

class UpdateSwordBuckler extends Component{
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };
    }

    onSubmit(values){
        values.user_id = this.props.fighter.id;
        this.props.storeRanking(values,'sword_buckler');
        this.setState({modalOpen:false});
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    render(){
        const handleSubmit = this.props.handleSubmit;

        const countryOptions = _.map(this.props.events,event => {
            return {
                key: event.event_id,
                value: event.event_id,
                flag: event.location,
                text: `${event.title} ${event.date.substring(0, 4)}`
            };
        });
        const events = _.filter(countryOptions, function(o) { return o != undefined });


        return(
            <Modal closeIcon size={'tiny'}  open={this.state.modalOpen}  onClose={this.handleClose}  trigger={<Icon onClick={this.handleOpen} name="edit"></Icon>}>
                <Modal.Header>Update {this.props.fighter.name}
                    { (this.props.fighter.sword_buckler.length  > 0 ) &&
                    <LastRecords category="sword_buckler" fighter={this.props.fighter}/>
                    }
                    </Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Win"
                                name="win"
                                value={this.state.value}
                                max={20}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={input.renderSlider}
                            />
                            <br/>
                            <Field
                                label="Lost"
                                name="loss"
                                value={this.state.value}
                                max={20}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={input.renderSlider}
                            />
                            <br/>
                            <Field
                                name="event_id"
                                options={events}
                                placeholder="Select Competition"
                                component={input.renderSelect}
                            />
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

    if(!values.event_id){
        errors.event_id = "You must select an event";
    }

    return errors;
}

export default withRouter(reduxForm({validate:validate, form: 'UpdateSwordShield'})(connect(null,{storeRanking})(UpdateSwordBuckler)));