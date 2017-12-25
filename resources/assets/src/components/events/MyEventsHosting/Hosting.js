import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Icon, Flag, Card, Image, Popup, Grid, Button } from 'semantic-ui-react';
import { stringHelper } from '../../../helpers/string';
import EditEvent from './EditEvent';

import _ from 'lodash';

import './Hosting.css';

class Hosting extends Component {
  renderEvents() {
    return _.map(this.props.eventsHosted, event => (

      <List.Item>
        <div className="row">
          <div className="col-sm-5">
            <Icon name="fort awesome" />
            {event.title}
          </div>
          <div className="col-sm-4">
            {event.club !== null ? event.club.name : 'Global'}
          </div>
          <div className="col-sm-3">
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
                  <List.Icon name="fort awesome" />
                  <List.Content>{event.type}</List.Content>
                </List.Item>
              </List>
              <List verticalAlign="middle">
                <List.Item>
                  <List.Icon name="calendar" />
                  <List.Content>{stringHelper.limitTo(event.date,10)}</List.Content>
                </List.Item>
              </List>
            </Popup>
            <Popup
              trigger={<Button className="superMiniButton">edit</Button>}
              flowing
              hoverable
            >
              <Grid className="myEventsHostingEditButtons" centered divided columns={3}>
                <Grid.Column textAlign="center">
                  <EditEvent event={event} currentUser={this.props.currentUser} />
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <Button size="tiny">Edit Categories</Button>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <Button size="tiny">Cancel Event</Button>
                </Grid.Column>
              </Grid>
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
          <List divided verticalAlign="middle">
            {this.renderEvents()}
          </List>
        </Card.Content>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(Hosting);
