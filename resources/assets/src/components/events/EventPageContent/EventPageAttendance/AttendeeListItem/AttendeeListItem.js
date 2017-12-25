import React from 'react';
import { Feed } from 'semantic-ui-react';
import { userHelper } from '../../../../../helpers/user';
import { stringHelper } from '../../../../../helpers/string';
import { Link } from 'react-router-dom';

const AttendeeListItem = ({
  attendee,
}) => (
  <Feed.Event>
    <Feed.Label image={userHelper.getImage(attendee.user)} />
    <Feed.Content>
      <Feed.Summary>
        <Link to={`/profile/${attendee.user.id}`}>   {attendee.user.name === null ? 'anonymous?' : attendee.user.name} </Link>
      </Feed.Summary>
      <Feed.Date>{stringHelper.limitTo(attendee.created_at, 10)}</Feed.Date>
    </Feed.Content>
  </Feed.Event>
);

export default AttendeeListItem;
