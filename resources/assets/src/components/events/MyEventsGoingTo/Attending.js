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
      if (new Date(attending.event.date) >= new Date()) {
        return (
          <List.Item key={attending.id}>
            <List.Content floated="right" />
            <List.Content floated="left">
              <Flag name={attending.event.location} />
            </List.Content>
            <List.Content>

              <List.Header>
                <a><Link to={`/event/${attending.event.id}`}>{attending.event.title}</Link></a>
                <Countdown
                  targetDate={new Date(attending.event.date)}
                  format={{
                    day: 'DD',
                    hour: 'HH',
                    minute: 'MM',
                    second: 'SS',
                  }}
                  interval={1000}
                  timeSeparator=":"
                  leadingZero
                />
              </List.Header>
              <List.Description>
                Fighting in:<br />
                {this.renderCategories(attending)}
              </List.Description>
            </List.Content>
          </List.Item>
        );
      }
    });
  }

  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header className="text-center">
            You are going to
          </Card.Header>
          <List divided verticalAlign="middle">
            {this.renderMyEvents()}
          </List>
        </Card.Content>
      </Card>
    );
  }
}

export default (Attending);
