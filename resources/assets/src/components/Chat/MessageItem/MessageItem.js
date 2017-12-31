import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import { userHelper } from '../../../helpers/user';

import './MessageItem.css';

class MessageItem extends Component {
  componentDidMount() {
    if (this.props.messageContainer) {
      const messagesContainer = ReactDOM.findDOMNode(this.props.messageContainer);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  componentDidUpdate() {
    if (this.props.messageContainer) {
      const messagesContainer = ReactDOM.findDOMNode(this.props.messageContainer);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  render() {
    const { message, user } = this.props;

    return (
      <div
        style={{ justifyContent: (message.from === user.id ? 'flex-end' : 'flex-start') }}
        className="messageContainer"
      >
        {(message.from !== user.id) &&
        <Image avatar src={userHelper.getImage(message.from_user)} />
        }
        <div className="messageBody">
          <div className="messageText">{message.body}
          </div>
        </div>

        {(message.from === user.id) &&
        <Image avatar src={userHelper.getImage(message.from_user)} />
        }
      </div>
    );
  }
}


export default connect(null)(MessageItem);
