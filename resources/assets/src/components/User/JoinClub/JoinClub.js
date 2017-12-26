import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Dropdown } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { fetchClubs } from "../../../actions";
import { RegisterUser, RegisterClub } from '../../index';
import _ from 'lodash';

class JoinClub extends Component {
  constructor() {
    super();

    this.state = ({
      selectedClub:null,
      registerClub:false,
      modalOpen: false,
    });
  }


  handleOpen() {
    this.setState({
      modalOpen: true,
      selectedClub:null,
      registerClub:false,
    });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  selectClub(clubId) {
    this.setState({ selectedClub: clubId });
  }

  componentDidMount() {
    this.props.fetchClubs();
  }

  renderSelect = (field) => {
    const error = !!(field.meta.touched && field.meta.error);
    return(
      <div>
        <label>Select your club<br/></label>
        <Dropdown
          fluid
          search
          selection
          error={error}
          className={field.className} { ...field.input }
          onChange={(param,data) => {field.input.onChange(data.value); this.selectClub(data.value)}}
          placeholder={field.placeholder}
          value={field.input.value}
          options={field.options}
        />
        <div style={{color:'red'}} className="text-help">
          { field.meta.touched ? field.meta.error : '' }
        </div>
      </div>
    )
  };

  registerClub() {
    this.setState({ selectedClub: false, registerClub: true });
  }

  render() {

    const clubs = _.map(this.props.clubs,club => {
      return {
        key: club.id,
        value: club.id,
        flag: club.country,
        text: club.name,
      };
    });

    return (
      <Modal
        closeIcon
        size="tiny"
        open={this.state.modalOpen}
        onClose={() => this.handleClose()}
        trigger={<a className="nav-link" onClick={() => this.handleOpen()} >
          Join Club
        </a>
        }
      >
        <Modal.Header>Join your Club</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            {(this.state.selectedClub !== false) &&
            <Field
              name="club_id"
              placeholder="Select or type club name"
              options={clubs}
              component={this.renderSelect}
            />
            }
              {this.state.selectedClub &&
              <RegisterUser clubId={this.state.selectedClub} onClose={() => this.handleClose()}/>
              }
            {this.state.registerClub &&
            <RegisterClub onClose={() => this.handleClose()} />
            }
              <br/>
            {(this.state.registerClub === false) &&
            <div>If not listed, <span onClick={() => this.registerClub()} className="fake-link">register your Club</span></div>
            }
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    clubs: state.clubs.clubs,
  };
}

export default withRouter(reduxForm({ form: 'joinClubForm' })(connect(mapStateToProps,{ fetchClubs })(JoinClub)));
