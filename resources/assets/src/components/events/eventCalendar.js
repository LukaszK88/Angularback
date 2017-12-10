import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from '../../layouts/defaultLayout';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { List, Icon, Flag, Card } from 'semantic-ui-react';
import _ from 'lodash';
import { currentLoggedInUser } from '../../actions';
import { withRouter } from 'react-router-dom';
import { config } from '../../config';
import { Link } from 'react-router-dom';
import Countdown from 'react-cntdwn';

BigCalendar.momentLocalizer(moment);

class MyCalendar extends Component {
  componentWillReceiveProps(newProps) {

    // if(this.props.match.params.userId !== newProps.match.params.userId) {
    //     this.props.currentUser(window.localStorage.getItem('token'));
    //
    // }
  }


  componentDidMount() {
    this.props.currentLoggedInUser(window.localStorage.getItem('token'));
  }

  goToEvent(event) {
    return this.props.history.push(`/event/${event.id}`);
  }


  renderCategories(attendance) {
    return _.map(attendance.event_attend_category, category => (

      <span><Icon name="protect" size="small" /> <b key={category.id}>{category.name}</b> <br /></span>

    ));
  }


  renderMyEvents() {
    return _.map(this.props.currentUser.user.attendence, (attendance) => {
      if (new Date(attendance.event.date) >= new Date()) {
        return (
          <List.Item key={attendance.id}>
            <List.Content floated="right" />
            <List.Content floated="left">
              <Flag name={attendance.event.location} />
            </List.Content>
            <List.Content>

              <List.Header>
                <a><Link to={`/event/${attendance.event.id}`}>{attendance.event.title}</Link></a>
                <Countdown
                  targetDate={new Date(attendance.event.date)}
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
                {this.renderCategories(attendance)}
              </List.Description>
            </List.Content>
          </List.Item>
        );
      }
    });
  }


  render() {
    const events = _.map(this.props.currentUser.user.attendence, (attendance) => {
      if (new Date(attendance.event.date) >= new Date()) {
        return {
          id: attendance.event.id,
          title: attendance.event.title,
          start: new Date(attendance.event.date),
          end: moment(attendance.event.date).add(1, 'days'),
        };
      }
    });

    return (
      <DefaultLayout>
        <div className="row">
          <div className="col-md-9">
            <Card fluid>
              <Card.Content style={{ height: '500px' }}>
                <BigCalendar
                  selectable
                  events={events}
                  startAccessor="start"
                  views={['month']}
                  onSelectEvent={event => this.goToEvent(event)}
                />

              </Card.Content>
            </Card>
          </div>
          <div className="col-md-3">
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
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default withRouter(connect(mapStateToProps, { currentLoggedInUser })(MyCalendar));
