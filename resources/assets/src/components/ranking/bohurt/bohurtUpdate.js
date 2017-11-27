import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Icon} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {withRouter} from 'react-router-dom';
import { storeRanking} from '../../../actions/ranking';
import _ from 'lodash';
import { input } from '../../../helpers/input';
import LastRecords from '../partials/lastRecords';

class UpdateBohurt extends Component{
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };
    }

    onSubmit(values){
        values.user_id = this.props.fighter.id;
        this.props.storeRanking(values,'bohurt');
        this.setState({modalOpen:false});
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    render(){

        const handleSubmit = this.props.handleSubmit;

        const countryOptions = _.map(this.props.events.events,event => {
            if(this.props.fighter.club_id != 0 && ((event.club_id == this.props.fighter.club.id) || event.global)) {
                return {
                    key: event.location,
                    value: event.id,
                    flag: event.location,
                    text: `${event.title} ${event.date.substring(0, 4)}`
                };
            }
        });
        const events = _.filter(countryOptions, function(o) { return o != undefined });

        return(
                <Modal closeIcon size={'tiny'}  open={this.state.modalOpen}  onClose={this.handleClose}  trigger={<Icon size="large" onClick={this.handleOpen} name="edit"></Icon>}>
                <Modal.Header>Update {this.props.fighter.name}
                    { (this.props.fighter.bohurt.length  > 0 ) &&
                    <LastRecords category="bohurt" fighter={this.props.fighter}/>
                    }
                </Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Win"
                                name="won"
                                value={this.state.value}
                                max={20}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={input.renderSlider}
                            />
                            <br/>
                            <Field
                                label="Last Man Standing"
                                name="last"
                                value={this.state.value}
                                max={10}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={input.renderSlider}
                            />
                            <br/>
                            <Field
                                label="Down"
                                name="down"
                                value={this.state.value}
                                max={15}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={input.renderSlider}
                            />
                            <br/>
                            <Field
                                label="Suicides"
                                name="suicide"
                                value={this.state.value}
                                max={10}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={input.renderSlider}
                            />
                            <br/>
                            <Field
                                name="event_id"
                                options={events}
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

export default withRouter(reduxForm({validate:validate, form: 'updateBohurt'})(connect(null,{storeRanking})(UpdateBohurt)));