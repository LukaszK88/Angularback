import * as React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Popup, Icon, Image, List, Dropdown } from 'semantic-ui-react';
import { userHelper } from '../../../helpers/user';
import { fetchUsersForConversation, startConversationWithUser, activeChatConfig } from '../../../actions';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import './Converations.css';


class Conversations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    this.props.fetchUsersForConversation(this.props.user.conversations);
  }

  setActiveChat(conversationId, activeChatUser) {
    this.props.activeChatConfig(conversationId, activeChatUser);
  }

  handleConversationOpen(user) {
    this.setState({ isOpen: user.id });
  }

  handleConversationClose() {
    this.setState({ isOpen: null });
  }

  renderConversations() {

    return _.map(this.props.user.conversations, conversation => (
      <List.Item>
        {(conversation.from !== this.props.user.id) &&
          <div className="row">
            <div className="col-12 conversationPersonContainer">
              <Image avatar src={userHelper.getImage(conversation.from_user)} />
              <div>
                <div onClick={() => this.setActiveChat(conversation.id, conversation.from_user)} className="conversationPersonName">{conversation.from_user.name}</div>
              </div>
            </div>
          </div>
          }
        {(conversation.to !== this.props.user.id) &&
          <div className="row">
            <div className="col-12 conversationPersonContainer">
              <Image avatar src={userHelper.getImage(conversation.to_user)} />
              <div>
                <div onClick={() => this.setActiveChat(conversation.id, conversation.to_user)} className="conversationPersonName"> {conversation.to_user.name}</div>
              </div>
            </div>
          </div>
          }
      </List.Item>
    ));
  }

  selectUserForConversation(userId) {
    this.props.startConversationWithUser(userId,this.props.user.id, (response)=>{
      this.props.activeChat(response.data.id, response.data.to_user);
    });
  }

  renderSelect() {
    const users = _.map(this.props.usersForConversation, user => ({ key: user.id, value: user.id, text: user.name }));
    return (
      <div>
        <Dropdown
          fluid
          search
          selection
          options={users}
            onChange={(e,data) => this.selectUserForConversation(data.value)}
        />
      </div>
    );
  }

  render() {
    return (
      <Popup
        trigger={<span>
          <Icon className="hidden-sm-up mobileMessengerIcon" size="large" onClick={() => this.handleConversationClose()} name="comments" />
          <Icon className="hidden-sm-down" onClick={() => this.handleConversationClose()} name="comments" />
          <span className="hidden-sm-down">messages</span>
        </span>}
        content={
          <List>
            {this.renderSelect()}
            {this.renderConversations()}
          </List>}
        on="click"
        position="left center"
        open={this.state.isOpen === this.props.user.id}
        onOpen={() => this.handleConversationOpen(this.props.user)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    usersForConversation: state.messages.users,
  };
}

export default reduxForm({ form: 'messageChat' })(connect(mapStateToProps, { activeChatConfig, fetchUsersForConversation, startConversationWithUser })(Conversations));
