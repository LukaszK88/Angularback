import React, { Component } from 'react';
import { stringHelper } from '../../../../helpers/string';
import { Card } from 'semantic-ui-react'
import DropZone from './dropZone';
export default class UserImage extends Component {
  render() {
      const {user} = this.props.profile;
    return (
        <div className="col-md-3">
            <Card className="profile-card" fluid>
                <DropZone profile={this.props.profile} currentUser={this.props.currentUser}/>
                <Card.Content>
                    <Card.Header>
                        { user.name }
                    </Card.Header>
                    <Card.Meta>
                                    <span className='date'>
                                      Joined on { stringHelper.limitTo(user.created_at,10)}
                                    </span>
                    </Card.Meta>
                    <Card.Description>

                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
  }
}
