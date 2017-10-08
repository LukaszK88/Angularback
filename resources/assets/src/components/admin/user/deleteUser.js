import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import {deleteUser} from '../../../actions/admin';

class DeleteConfirmation extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        };
    }

    deleteUser(user){
        this.props.deleteUser(user);
        this.handleClose();
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

render(){
    const {user} = this.props;
        return(
            <Modal open={this.state.modalOpen}  onClose={this.handleClose} trigger={<Icon onClick={this.handleOpen} name="user delete" size="large" color="red"></Icon>} basic size='small'>
                <Header icon='trash outline' content={`Delete ${user.username}`} />
                <Modal.Content>
                    <p>Are you sure? This will cause user to die?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.handleClose} basic color='red' inverted>
                        <Icon name='remove' /> No
                    </Button>
                    <Button onClick={this.deleteUser.bind(this, user)} color='green' inverted>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default connect(null,{deleteUser})(DeleteConfirmation);