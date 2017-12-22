import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, List } from 'semantic-ui-react';
import { userHelper } from '../../../helpers/user';
import UpdateProfight from './profightUpdate';
import _ from 'lodash';
import { Link } from 'react-router-dom';


class Profight extends Component {
  renderFighters() {
    const { admin, clubAdmin } = this.props.currentUser;

    const fighters = _.orderBy(this.props.fighters, ['profightTable.points'], ['desc']);
    return _.map(fighters, (fighter, index) => (
      <List.Item>
        <div className="row">
          <div className="index-number">{index + 1}</div>
          <div className="col-sm-1 col-2">
            <Image className="blackBorder" avatar src={userHelper.getImage(fighter)} />
          </div>
          <div className="col-sm-3 col-6 ">
            <List.Content>
              <List.Header><Link to={`/profile/${fighter.id}`}> {fighter.name}</Link></List.Header>
              <Link to={`/club/${fighter.club.id}`}>{fighter.club.name}</Link>
            </List.Content>
          </div>

          <div className="col-sm-1 text-center hidden-xs-down align-center">
            <div className="rankingRecordText">{fighter.profightTable.win}</div>
          </div>
          <div className="col-sm-1 text-center hidden-xs-down borderLeft">
            <div className="rankingRecordText">{fighter.profightTable.loss}</div>
          </div>
          <div className="col-sm-1 text-center hidden-xs-down borderLeft">
            <div className="rankingRecordText">{fighter.profightTable.ko}</div>
          </div>
          <div className="col-sm-1 text-center hidden-xs-down borderLeft">
            <div className="rankingRecordText">{fighter.profightTable.fc_1}</div>
          </div>
          <div className="col-sm-1 text-center hidden-xs-down borderLeft">
            <div className="rankingRecordText">{fighter.profightTable.fc_2}</div>
          </div>
          <div className="col-sm-1 text-center hidden-xs-down borderLeft">
            <div className="rankingRecordText">{fighter.profightTable.fc_3}</div>
          </div>
          <div className="col-sm-1 text-center hidden-xs-down borderLeft">
            <div className="rankingRecordText">{fighter.profightTable.points}</div>
          </div>
          <div className="col-2 hidden-sm-up rankingRecordText">
            <div className="small text-center">points</div>
            <div className="small text-center">{fighter.profightTable.points}</div>
          </div>
          { ((clubAdmin === fighter.club_id) || admin) &&
            <div className="col-sm-1 col-2 update-ranking">
              <UpdateProfight events={this.props.events} fighter={fighter} />
            </div>
            }
        </div>
        <hr className="hidden-sm-up" />
        <div className="row hidden-sm-up rankingRecordText">
          <div className="col-2">
            <div className="small text-center">win</div>
            <div className="small text-center">{fighter.profightTable.win}</div>
          </div>
          <div className="col-2">
            <div className="small text-center">loss</div>
            <div className="small text-center">{fighter.profightTable.loss}</div>
          </div>
          <div className="col-2">
            <div className="small text-center">ko</div>
            <div className="small text-center">{fighter.profightTable.ko}</div>
          </div>
          <div className="col-2">
            <div className="small text-center">FC I</div>
            <div className="small text-center">{fighter.profightTable.fc_1}</div>
          </div>
          <div className="col-2">
            <div className="small text-center">FC II</div>
            <div className="small text-center">{fighter.profightTable.fc_2}</div>
          </div>
          <div className="col-2">
            <div className="small text-center">FCIII</div>
            <div className="small text-center">{fighter.profightTable.fc_3}</div>
          </div>
        </div>
      </List.Item>
    ));
  }


  render() {
    return (
      <List celled size="large" relaxed="very" verticalAlign="middle">
        <List.Item>
          <div className="row">
            <div className="col-sm-12 col-12">
              <p className="category-points">
                <span className="text-green">4pts</span> - KO |
                <span className="text-green">3pts</span> - Win |
                <span className="text-green">1pt</span> - Lost |
                <span className="text-green">10pts</span> - FC I Win |
                <span className="text-green">6pts</span> - FC II Win |
                <span className="text-green">3pts</span> - FC III Win
              </p>
            </div>
          </div>
          <List.Item>
            <div className="row hidden-xs-down rankingRecordText">
              <div className="col-sm-1" />
              <div className="col-sm-3 " />
              <div className="col-sm-1 text-center">
                            Win
              </div>
              <div className="col-sm-1 text-center">
                            Loss
              </div>
              <div className="col-sm-1 text-center">
                            KO
              </div>
              <div className="col-sm-1 text-center ">
                            FC I
              </div>
              <div className="col-sm-1 text-center">
                            FC II
              </div>
              <div className="col-sm-1 text-center">
                            FC III
              </div>
              <div className="col-sm-1 text-center">
                Points
              </div>
            </div>

          </List.Item>
        </List.Item>
        {this.renderFighters()}
      </List>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps)(Profight);
