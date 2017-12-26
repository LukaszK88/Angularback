import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal,Select,Dropdown } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {addAchievement} from '../../../actions/ranking';
import _ from 'lodash';
import { config } from '../../../config';
import { input } from '../../../helpers/input';


class AddAchievement extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
          selectedEventCategories:null
        };
    }

    onSubmit(values){
        values.event_id = this.state.selectedEvent.event_id;
        values.user_id = this.props.currentUser.user.id;
        this.props.addAchievement(values);
        this.setState({modalOpen:false});
        this.setState({selectedEvent:null});
    }

    handleOpen() {
      this.setState({
        modalOpen: true
      });
    }

    handleClose() {
      this.setState({ modalOpen: false });
    }

    renderSelect = (field) => {
        const error = !!(field.meta.touched && field.meta.error);
        return(
            <div>
              <label>Search by Tournament Name<br/></label>
                <Dropdown
                  fluid
                  search
                  selection
                  error={error}
                  className={field.className} { ...field.input }
                  onChange={(param,data) => {field.input.onChange(data.value);this.selectEvent(data.value)}}
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

    selectEvent(eventId){
      const event = _.find(this.props.events,['event_id',eventId]);
        this.setState({ selectedEvent: event });
    }

    renderCategories(){
        if(this.state.selectedEvent){
          return _.map(this.state.selectedEvent.category, category => {
            return {
              key: category.id,
              value: category.name,
              text: category.name
            };
          });
        }
    }

    render(){
        const{user} = this.props.currentUser;
        const handleSubmit = this.props.handleSubmit;

        const places = config.select.places;
        const categories = this.renderCategories();

        const events = _.map(_.filter(this.props.events,(e) => { return e.category.length !== 0}),event => {
            return {
              key: event.event_id,
              categories: event.category,
              value: event.event_id,
              flag: event.location,
              text: `${event.title} ${event.date.substring(0, 4)}`
            };
        });

        return(
            <Modal closeIcon size="mini" open={this.state.modalOpen}  onClose={() => this.handleClose()} trigger={<Button disabled={this.props.events.length == 0 ? true : false} color={'black'}  onClick={() => this.handleOpen()} className="float-right">{this.props.events.length == 0 ? 'No events':'Add'}</Button>}>
                <Modal.Header>Add Achievement</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                name="event_id"
                                placeholder="Select competition"
                                options={events}
                                component={this.renderSelect}
                            />
                            <br/>
                            {this.state.selectedEvent &&
                                <span>
                            <Field
                                name="category"
                                placeholder="Category"
                                options={categories}
                                component={input.renderSelect}
                            />
                            <br/>
                            < Field
                                name="place"
                                placeholder="Place"
                                options={places}
                                component={input.renderSelect}
                                />
                                </span>
                            }
                            <br/>
                            <Button color={'black'}  type="submit">Add</Button>
                        </form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

function validate(values) {
    const errors = {};

    if(!values.event_id){
        errors.event_id = "You must select an event";
    }
    if(!values.category){
        errors.category = "You must select an category";
    }
    if(!values.place){
        errors.place = "You must select an place";
    }

    return errors;
}


function mapStateToProps(state) {
    return {currentUser: state.currentUser};
}


export default reduxForm({validate:validate, form: 'addAchievement'})(connect(mapStateToProps,{addAchievement})(AddAchievement));