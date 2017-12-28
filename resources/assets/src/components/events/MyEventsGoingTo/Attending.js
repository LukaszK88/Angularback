import React, { Component } from 'react';
import { List, Icon, Flag, Card } from 'semantic-ui-react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Countdown from 'react-cntdwn';

class Attending extends Component {
  renderCategories(attending) {
    return _.map(attending.event_attend_category, category => (
      <span>
        <Icon name="protect" size="small" /> <b key={category.id}>{category.name}</b> <br />
      </span>
    ));
  }


  renderMyEvents() {
    return _.map(this.props.attendence, (attending) => {
      if (new Date(attending.event.date.replace(' ', 'T')) >= new Date()) {
        return (
          <List.Item key={attending.id}>
            <List.Content floated="right" />
            <List.Content floated="left">
              <Flag name={attending.event.location} />
            </List.Content>
            <List.Content>

              <List.Header>
                <Link to={`/event/${attending.event.id}`}>{attending.event.title}</Link>
                <Countdown
                  targetDate={new Date(attending.event.date.replace(' ', 'T'))}
                  format={{
                    day: 'DD',
                    hour: 'HH',
                  }}
                  interval={1000}
                  timeSeparator=":"
                  leadingZero
                />
              </List.Header>
              {(attending.event_attend_category.length > 0) &&
              <List.Description>
                Fighting in:<br/>
                {this.renderCategories(attending)}
              </List.Description>
              }
            </List.Content>
          </List.Item>
        );
      }
    });
  }

  render() {
    return (
      <Card style={{ marginBottom: '5px' }} fluid>
        <Card.Content>
          <Card.Header className="text-center">
            You are going to
          </Card.Header>
          {(this.props.attendence === undefined || this.props.attendence.length === 0) &&
          <p className="text-center">To attend an event head to <Link className="fake-link" to="/events">Events</Link> and select one you are interested in</p>
          }
          {(this.props.attendence !== undefined && this.props.attendence.length > 0) &&
          <List divided verticalAlign="middle">
            {this.renderMyEvents()}
          </List>
          }
        </Card.Content>
      </Card>
    );
  }
}

export default (Attending);
