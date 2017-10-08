import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { deleteAchievement } from '../../../../actions/ranking';

class DeleteConfirmation extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        };
    }

    deleteAch(achievement,e){
        this.props.deleteAchievement(achievement);
        this.handleClose();
    }
    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

render(){
    const {achievement} = this.props;
        return(
            <Modal open={this.state.modalOpen}  onClose={this.handleClose} trigger={<Icon onClick={this.handleOpen} size="large" name="delete"></Icon>} basic size='small'>
                <Header icon='trash outline' content={`Delete ${achievement.event.title} Achievement`} />
                <Modal.Content>
                    <p>Are you sure?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.handleClose} basic color='red' inverted>
                        <Icon name='remove' /> No
                    </Button>
                    <Button onClick={this.deleteAch.bind(this, achievement)} color='green' inverted>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default connect(null,{deleteAchievement})(DeleteConfirmation);