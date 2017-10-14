import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import {deleteEvent} from '../../actions/events';

class DeleteConfirmation extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        };
    }

    deleteEvent(event){
        this.props.deleteEvent(event);
        this.handleClose();
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

render(){
    const {event} = this.props;
        return(
            <Modal open={this.state.modalOpen}  onClose={this.handleClose} trigger={<Icon className="icon-md-margin-right" onClick={this.handleOpen} size="large" name="delete"></Icon>} basic size='small'>
                <Header icon='trash outline' content={`Delete ${event.title} Event`} />
                <Modal.Content>
                    <p>Are you sure? This will cause related achievements to be deleted?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.handleClose} basic color='red' inverted>
                        <Icon name='remove' /> No
                    </Button>
                    <Button onClick={this.deleteEvent.bind(this, event)} color='green' inverted>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default connect(null,{deleteEvent})(DeleteConfirmation);