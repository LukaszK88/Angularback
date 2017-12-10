import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEventsByType } from '../../actions/events';
import DefaultLayout from '../../layouts/defaultLayout';
import { Feed, Icon, Flag, Card } from 'semantic-ui-react';
import _ from 'lodash';
import { stringHelper } from '../../helpers/string';
import { Link } from 'react-router-dom';
import Countdown from 'react-cntdwn';

class EventsList extends Component {
  componentDidMount() {
    this.props.fetchEventsByType(1);
  }

  renderFutureEvents() {
    const { eventsList } = this.props.events;

    const events = _.orderBy(eventsList, ['date'], ['asc']);
    return _.map(events, (event) => {
      if (event.future == true && event.make_page && event.make_page != '0') {
        if ((this.props.currentUser.isLoggedIn && (event.club_id == this.props.currentUser.user.club_id)) || (event.global)) {
          return (
            <Card fluid >

              <Card.Content>
            <Feed.Event key={event.id}>
              <Link to={`/event/${event.id}`}>
              <Feed.Label > <Flag name={event.location} /></Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>  {event.title}</Feed.User> Added
                                    by: {event.user.name}

                  <Feed.Date>
                    <Countdown
                      targetDate={new Date(event.date)}
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
                  </Feed.Date>
                  <Feed.Date>
                                        To go!
                  </Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                  {event.category.length > 0 ? `${event.category.length} Categories` : 'no Categories'}
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="users" size="large" />
                    {event.attendance.length > 0 ? event.attendance.length : '0'}
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
              </Link>
            </Feed.Event>
              </Card.Content>

            </Card>
          );
        }
      }
    });
  }


  render() {
    return (
      <DefaultLayout>
        <div className="row">
          <div className="col-md-9">
            <Feed size="large">
              {this.renderFutureEvents()}
            </Feed>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    currentUser: state.currentUser,
  };
}


export default connect(mapStateToProps, { fetchEventsByType })(EventsList);
