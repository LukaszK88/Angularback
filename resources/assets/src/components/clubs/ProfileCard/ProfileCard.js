import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import DropZone from '../dropZone';
import PerformanceCharts from '../performaneCharts';

const ProfileCard = ({
  clubId,
  currentUser,
  club,
  clubs,
}) => (
  <Card fluid>
    <DropZone
      clubId={clubId}
      currentUser={currentUser}
      club={club}
    />
    <Card.Content>
      <Card.Header />
      <Card.Meta>
        <span className="date">
          {club.created_at}
        </span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <Icon name="users" size="large" />
      {club.users ? club.users.length : ''}
      <div className="float-right">
        <PerformanceCharts club={club} clubs={clubs} />
      </div>
    </Card.Content>
    { club.fb &&
      <Button
        as="a"
        target="_blank"
        href={club.fb}
        color="facebook"
      >
        <Icon name="facebook" /> Facebook
      </Button>
      }
  </Card>
);

export default ProfileCard;
