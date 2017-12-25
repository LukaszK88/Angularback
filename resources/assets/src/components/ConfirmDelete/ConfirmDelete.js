import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class ConfirmDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };
  }

  handleAccept() {
    this.props.action();
    this.handleClose();
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <Modal open={this.state.modalOpen} onClose={this.handleClose} trigger={<Button className={this.props.triggerClass} onClick={() => this.handleOpen()} size="tiny" >{this.props.triggerTitle}</Button>} basic size="small">
        <Header icon="trash outline" content={this.props.header} />
        <Modal.Content>
          <p>{this.props.content}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.handleClose()} basic color="red" inverted>
            <Icon name="remove" /> No
          </Button>
          <Button onClick={() => this.handleAccept()} color="green" inverted>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ConfirmDelete;
