import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Icon, Card, Popup, Grid, Button } from 'semantic-ui-react';
import { stringHelper } from '../../../helpers/string';
import EditEvent from './EditEvent';
import { EditCategories } from '../../events';
import { deleteEvent } from '../../../actions/events';
import { ConfirmDelete } from '../../../components';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import './Hosting.css';

class Hosting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: null,
    };
  }

  handleOpen(event) {
    this.setState({ isOpen: event.id });
  }

  handleClose() {
    this.setState({ isOpen: null });
  }

  renderEvents() {
    return _.map(_.orderBy(this.props.eventsHosted, ['created_at'], ['desc']), event => (
      <List.Item>
        <div className="row hostingEventListItemContainer">
          <div className="col-sm-5 col-5">
            {event.event_type_id === 1 &&
            <Icon name="fort awesome" />
            }
            {event.event_type_id === 2 &&
            <Icon name="shield" />
            }
            <Link to={`/event/${event.id}`}> {event.title}</Link>
          </div>
          <div className="col-sm-4 col-4">
            {event.club !== null ? event.club.name : 'Global'}
          </div>
          <div className="col-sm-3 col-3">
            <Popup
              trigger={<Icon name="info" />}
              flowing
              hoverable
            >
              <List verticalAlign="middle">
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>{event.attendance.length}</List.Content>
                </List.Item>
              </List>
              <List verticalAlign="middle">
                <List.Item>
                  {event.event_type_id === 1 &&
                  <Icon name="fort awesome" />
                  }
                  {event.event_type_id === 2 &&
                  <Icon name="shield" />
                  }
                  <List.Content>{event.type}</List.Content>
                </List.Item>
              </List>
              <List verticalAlign="middle">
                <List.Item>
                  <List.Icon name="calendar" />
                  <List.Content>{stringHelper.limitTo(event.date, 10)}</List.Content>
                </List.Item>
              </List>
            </Popup>
            <Popup
              style={{ zIndex: '10' }}
              trigger={<Button onClick={() => this.handleClose()} className="superMiniButton whiteButton">edit</Button>}
              flowing
              on="click"
              open={this.state.isOpen === event.id}
              onOpen={() => this.handleOpen(event)}
              hoverable
            >
              <div className="myEventsHostingEditButtonsContainer" >
                <div className="myEventsHostingEditButtons">
                  <EditEvent event={event} currentUser={this.props.currentUser} />
                </div>
                <div className="myEventsHostingEditButtons">
                  <EditCategories event={event} />
                </div>
                <div className="myEventsHostingEditButtons">
                  <ConfirmDelete
                    content="This action is irreversible"
                    action={() => this.props.deleteEvent(event)}
                    header="Are you sure?"
                    triggerTitle="delete"
                    triggerClass="redEmptyButton"
                  />
                </div>
              </div>
            </Popup>
          </div>
        </div>
      </List.Item>

    ));
  }

  render() {
    // todo will need two apis for past future as data grows
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header className="text-center">
            Hosting
          </Card.Header>
          {(this.props.eventsHosted.length === 0) &&
          <p className="text-center">To create an event head to <Link className="fake-link" to="/events">Events</Link></p>
          }
          {(this.props.eventsHosted.length > 0) &&
          <List divided verticalAlign="middle">
            {this.renderEvents()}
          </List>
          }
        </Card.Content>
      </Card>
    );
  }
}

export default connect(null, { deleteEvent })(Hosting);
