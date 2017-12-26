import React from 'react';
import { Feed, Icon, Flag, Card, Popup, List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Countdown from 'react-cntdwn';
import _ from 'lodash';
import { userHelper } from '../../../helpers/user';

import './EventListCard.css';

const EventListCard = ({
  event,
}) => (
  <Card fluid >
    <Card.Content style={{ padding: '5px 5px' }}>
      <Feed.Event>
        <Feed.Content >
          <Feed.Summary>
            <div className="row eventListTitleContainer">
              <Link to={`/event/${event.id}`}>   <div className="eventListCardTitle"><Flag name={event.location} />  {event.title}</div> </Link>
              <div className="eventListCardHost">Added by: {event.user.name}</div>
            </div>
            <div className="row eventListCountdownContainer">
              <div className="eventListCardCountdown">
                <Countdown
                  targetDate={new Date(event.date)}
                  format={{
                    day: 'DD',
                    hour: 'HH',
                  }}
                  interval={1000}
                  timeSeparator=":"
                  leadingZero
                />
              </div>
              <div className="eventListCardCountdownText">
                <span> To go!</span>
              </div>
            </div>
          </Feed.Summary>
          <div className="row">
            <div className="col-sm-6 eventListCategoriesContainer">
              {(event.category.length > 0) &&
                <Popup
                  trigger={
                    <div className="eventListCardCategories">
                      {`${event.category.length} Categories`}
                    </div>
                  }
                  flowing
                >
                  <List>
                    {_.map(event.category, category => (
                      <List.Item key={category.id}>
                        <List.Icon name="shield" />
                        <List.Content>{category.name}</List.Content>
                      </List.Item>
                    ))}
                  </List>
                </Popup>
                }
              {(event.category.length === 0) &&
                <div className="eventListCardCategories">
                  No Categories
                </div>
                }
              {(event.attendance.length > 0) &&
              <Popup
                trigger={
                  <div className="eventListCardAttendance">
                    <Icon name="users" size="large" />
                    {event.attendance.length}
                  </div>
                }
                flowing
                hoverable
              >
                <List horizontal>
                  {_.map(event.attendance, attendee => (
                    <List.Item key={attendee.id}>
                      <Popup
                        trigger={<Image avatar src={userHelper.getImage(attendee)} />}
                        flowing
                        hoverable
                      >
                        {attendee.user.name === null ? 'anonymous' : attendee.user.name }
                      </Popup>
                    </List.Item>
                  ))}
                </List>
              </Popup>
              }
              {(event.attendance.length === 0) &&
              <div className="eventListCardAttendance">
                <Icon name="users" size="large" />
                0
              </div>
              }
            </div>
            {event.club !== null &&
              <div style={{ marginLeft: '-10px' }} className="col-sm-6">
                <div className="eventListCardClub">{event.club.name} event</div>
              </div>
              }
          </div>
        </Feed.Content>
      </Feed.Event>
    </Card.Content>
  </Card>
);

export default EventListCard;
