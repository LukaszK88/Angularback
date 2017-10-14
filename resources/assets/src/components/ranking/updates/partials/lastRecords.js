import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, List, Accordion,Icon } from 'semantic-ui-react';
import { Field, reduxForm,change } from 'redux-form';
import {withRouter} from 'react-router-dom';
import { updateRanking} from '../../../../actions/ranking';
import _ from 'lodash';
import { input } from '../../../../helpers/input';
import { stringHelper } from '../../../../helpers/string';

class LastRecords extends Component{
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            activeIndex:0

        };
    }
    handleClick = (e, record) => {

        this.props.reset();
        switch (this.props.category){
            case 'bohurt':
                this.props.dispatch(change('editLastRecordsBohurt','won',record.index.won));
                this.props.dispatch(change('editLastRecordsBohurt','last',record.index.last));
                this.props.dispatch(change('editLastRecordsBohurt','down',record.index.down));
                this.props.dispatch(change('editLastRecordsBohurt','suicide',record.index.suicide));
                break;
            case 'profight':
                this.props.dispatch(change('editLastRecordsBohurt','win',record.index.win));
                this.props.dispatch(change('editLastRecordsBohurt','ko',record.index.ko));
                this.props.dispatch(change('editLastRecordsBohurt','loss',record.index.loss));
                this.props.dispatch(change('editLastRecordsBohurt','fc_1',record.index.fc_1));
                this.props.dispatch(change('editLastRecordsBohurt','fc_2',record.index.fc_2));
                this.props.dispatch(change('editLastRecordsBohurt','fc_3',record.index.fc_3));
                break;
            default:
                this.props.dispatch(change('editLastRecordsBohurt','win',record.index.win));
                this.props.dispatch(change('editLastRecordsBohurt','loss',record.index.loss));
                break;

        }


        const  index  = record.index.id;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex })
    };

    renderRecordList(){
        const { activeIndex } = this.state;
         const handleSubmit = this.props.handleSubmit;

         const records = _.slice(_.orderBy(this.props.fighter[this.props.category],['created_at','updated_at'],[ 'desc']),0,5);

        return _.map(records, (record) => {

                return (
                  <div>
                      <Accordion.Title active={activeIndex === record.id} index={record} onClick={this.handleClick}>
                          <Icon name='dropdown' />
                          {`${record.id} `}
                          event: {record.event != null ? `${record.event.title} ` : 'unknown '}
                          date: {record.event != null ? `${stringHelper.limitTo(record.event.date,10)} ` : 'unknown '}
                          updated: { record.updated_at ? `${stringHelper.limitTo(record.updated_at,10)} ` : `${stringHelper.limitTo(record.created_at,10)} ` }
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === record.id}>
                          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                              { (this.props.category == 'bohurt') &&
                                  <span>
                              <Field
                                  label="Win"
                                  name="won"
                                  value={this.state.value}
                                  max={20}
                                  min={0}
                                  onChange={value => this.setState({ value })}
                                  component={input.renderSlider}
                              />
                              <br/>
                              <Field
                                  label="Last Man Standing"
                                  name="last"
                                  value={this.state.value}
                                  max={10}
                                  min={0}
                                  onChange={value => this.setState({ value })}
                                  component={input.renderSlider}
                              />
                              <br/>
                              <Field
                                  label="Down"
                                  name="down"
                                  value={this.state.value}
                                  max={15}
                                  min={0}
                                  onChange={value => this.setState({ value })}
                                  component={input.renderSlider}
                              />
                              <br/>
                              <Field
                                  label="Suicides"
                                  name="suicide"
                                  value={this.state.value}
                                  max={10}
                                  min={0}
                                  onChange={value => this.setState({ value })}
                                  component={input.renderSlider}
                              />
                              <br/>
                                  </span>
                              }
                              { (this.props.category == 'profight') &&
                                  <span>
                                      <Field
                                          label="Win"
                                          name="win"
                                          value={this.state.value}
                                          max={1}
                                          min={0}
                                          onChange={value => this.setState({ value })}
                                          component={input.renderSlider}
                                      />
                            <br/>
                            <Field
                                label="KO"
                                name="ko"
                                value={this.state.value}
                                max={1}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={input.renderSlider}
                            />
                            <br/>
                            <Field
                                label="Loss"
                                name="loss"
                                value={this.state.value}
                                max={1}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={input.renderSlider}
                            />
                            <br/>
                            <Field
                                label="First Class I"
                                name="fc_1"
                                value={this.state.value}
                                max={1}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={input.renderSlider}
                            />
                            <br/>
                            <Field
                                label="First Class II"
                                name="fc_2"
                                value={this.state.value}
                                max={1}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={input.renderSlider}
                            />
                            <br/>
                            <Field
                                label="First Class III"
                                name="fc_3"
                                value={this.state.value}
                                max={1}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={input.renderSlider}
                            />
                            <br/>
                                  </span>
                              }
                              { (this.props.category == 'polearm' ||
                              this.props.category == 'triathlon' ||
                              this.props.category == 'sword_shield' ||
                                  this.props.category == 'sword_buckler' ||
                                  this.props.category == 'longsword'
                              ) &&
                                  <span>
                             <Field
                                 label="Win"
                                 name="win"
                                 value={this.state.value}
                                 max={20}
                                 min={0}
                                 onChange={value => this.setState({ value })}
                                 component={input.renderSlider}
                             />
                            <br/>
                            <Field
                                label="Lost"
                                name="loss"
                                value={this.state.value}
                                max={20}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={input.renderSlider}
                            />
                            <br/>
                                  </span>
                              }


                              <Button color={'black'} type="submit">Submit</Button>
                          </form>
                      </Accordion.Content>
                  </div>
                )


        });
    }




    onSubmit(values){
        values.user_id = this.props.fighter.id;
        console.log(values);
        console.log(this.state.activeIndex);
        this.props.updateRanking(values,this.props.category,this.state.activeIndex,this.props.fighter.id);
       // this.setState({modalOpen:false});
    }

    handleOpen = () => this.setState({ open: true });

    handleClose = () => this.setState({ open: false });

    render(){


        return(
                <Modal  closeIcon size={'tiny'}  open={this.state.open}  onClose={this.handleClose}  trigger={<Button style={{background:'white'}} className="float-right"  onClick={this.handleOpen}>Edit Last Records</Button>}>
                <Modal.Header>Last records for {this.props.fighter.name}</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Accordion style={{width: '100%'}} styled>
                            {this.renderRecordList()}
                        </Accordion>
                    </Modal.Description>
                </Modal.Content>
            </Modal>

        )
    }
}

function validate(values) {
    const errors = {};


    return errors;
}

export default withRouter(reduxForm({validate:validate, form: 'editLastRecordsBohurt'})(connect(null,{updateRanking})(LastRecords)));