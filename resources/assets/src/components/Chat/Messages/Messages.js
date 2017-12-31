import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { fetchMessages, sendMessage, activeChatConfig } from '../../../actions';
import MessageItem from '../MessageItem';
import { input } from '../../../helpers/input';
import _ from 'lodash';
import io from 'socket.io-client';

// window.io = io;
//
// window.Echo = new Echo({
//   broadcaster: 'socket.io',
//   host:'http://localhost:3000'
// });

const socket = io('http://localhost:3000');
class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  onSubmit(values) {
    values.from = this.props.user.id;
    values.to = this.props.activeChat.activeChatUser.id;
    values.from_user = this.props.user;
    values.to_user = this.props.activeChat.activeChatUser;
    values.conversation_id = this.props.activeChat.conversationId;
    this.props.sendMessage(values);

    // post to server
  }

  componentDidMount() {
    this.props.fetchMessages(this.props.activeChat.conversationId);
    console.log('mount');
    socket.on('chatroom', (response) => {
      console.log(response);
      this.setState({ messages: this.state.messages.concat(response) });
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.messages.length === 0 && nextProps.messages.length) {
      this.setState({ messages: nextProps.messages });
    }
    if (nextProps.activeChat.conversationId !== this.props.activeChat.conversationId) {
      this.props.fetchMessages(nextProps.activeChat.conversationId);
    }
  }
  
  renderMessages() {
    const { user } = this.props;
    console.log(this.state.messages);
    return _.map(this.state.messages, (message, index) => (
      <MessageItem messageContainer={this.el} user={user} message={message} />
    ));
  }

  render() {
    const handleSubmit = this.props.handleSubmit;

    return (
      <div>
        <div className="chatPanel">
          <Header className="chatHeader">{this.props.activeChat.activeChatUser.name} <Icon onClick={() => this.props.activeChatConfig(null,null)} style={{ float:'right'}} name="remove"/></Header>
          <div
            ref={(el) => {
            this.el = el;
          }}
            className="messagesContainer"
          >
            {this.renderMessages()}
          </div>
          <form autoComplete="off" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Message"
              name="body"
              type="text"
              component={input.renderField}
            />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages.messages,
    activeChat: state.config.activeChat,
  };
}

export default reduxForm({ form: 'messageChat' })(connect(mapStateToProps, { fetchMessages, sendMessage, activeChatConfig })(Messages));
