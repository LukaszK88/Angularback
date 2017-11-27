import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';
import { removeFlashMessage } from '../actions/flashMessages';

class FlashMessages extends Component {
  componentWillUpdate() {
    window.setTimeout(() => {
      this.props.removeFlashMessage();
    }, 3000);
  }

  render() {
    if (!this.props.message) {
      return null;
    }
    return (
      <div
        className="flash-message-mobile"
        style={
                { zIndex: '10000', position: 'fixed', right: '0' }
            }
      >

        <Message icon color={this.props.message.type === 'success' ? 'green' : 'red'}>

          <Message.Content>
            <Message.Header>{this.props.message.text}</Message.Header>
            {this.props.message.sub}
          </Message.Content>
          <Icon style={{ fontSize: '2em', marginLeft: '15px' }} onClick={() => { this.props.removeFlashMessage(); }} name="delete" />

        </Message>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.flashMessage };
}

export default connect(mapStateToProps, { removeFlashMessage })(FlashMessages);
