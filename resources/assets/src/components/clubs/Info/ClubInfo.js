import React from 'react';
import { Card, Icon, List } from 'semantic-ui-react';

const ClubInfo = ({
  club,
}) => (
  <Card fluid>
    <Card.Content>
      <Card.Header className="text-center">
        {club.name}
      </Card.Header>
      <Card.Meta className="text-center">
        {club.motto}
      </Card.Meta>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <List>
            <List.Item
              icon="certificate"
              content={`Total Points: ${club.total_points}`}
            />
            <List.Item icon="certificate" content="Attended Events: coming soon..." />
            <List.Item icon="certificate" content={`Total Fights: ${club.total_fights}`} />
            <List.Item icon="certificate" content="Rank : coming soon..." />
          </List>
        </div>
        <div className="col-md-6 ">
          <div className="row">
            <div className="col-xs-3">
              <Icon color="yellow" size="huge" name="trophy" />
            </div>
            <div className="col-xs-3">
              <Icon color="grey" size="huge" name="trophy" />
            </div>
            <div className="col-xs-3">
              <Icon color="brown" size="huge" name="trophy" />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3">
              <span style={{ marginLeft: '25px' }} className="badge badge-pill badge-warning">{club.gold}</span>
            </div>
            <div className="col-xs-3">
              <span style={{ marginLeft: '50px' }} className="badge badge-pill badge-warning">{club.silver}</span>
            </div>
            <div className="col-xs-3">
              <span style={{ marginLeft: '50px' }} className="badge badge-pill badge-warning">{club.bronze}</span>
            </div>
          </div>
        </div>
      </div>
    </Card.Content>
  </Card>
);

export default ClubInfo;
