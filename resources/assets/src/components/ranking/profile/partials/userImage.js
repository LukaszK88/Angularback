import React, { Component } from 'react';
import { stringHelper } from '../../../../helpers/string';
import { Card, Icon } from 'semantic-ui-react';
import DropZone from './dropZone';
import PerformanceChart from './performaneChart';

export default class UserImage extends Component {
  render() {
    return (
      <div className="col-md-3">
        {(this.props.user !== null) &&
        <Card className="profile-card" fluid>
          <DropZone user={this.props.user} currentUser={this.props.currentUser} />
          <Card.Content>
            <Card.Header>
              {this.props.user.name}
            </Card.Header>
            <Card.Meta>
              <span className="date">
                          Joined on {stringHelper.limitTo(this.props.user.created_at, 10)}
              </span>
              <div className="float-right">
                <PerformanceChart profile={this.props.profile}/>
              </div>
            </Card.Meta>
            <Card.Description/>
          </Card.Content>
        </Card>
          }
      </div>
    );
  }
}
