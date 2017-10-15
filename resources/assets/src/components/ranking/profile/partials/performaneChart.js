import React, { Component } from 'react';
import { Modal, Icon,Tab } from 'semantic-ui-react'
import BohurtChart from './charts/bohurt';
import ProfightChart from './charts/profight';
import StandardChart from './charts/standard';

export default class PerformanceChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            tabs:[]
        };
    }

    componentDidMount(){
        this.state = {tabs:[
            { menuItem: '5v5', render: () => <Tab.Pane attached={false}><BohurtChart profile={this.props.profile}/></Tab.Pane> },
            { menuItem: 'Profight', render: () => <Tab.Pane attached={false}><ProfightChart profile={this.props.profile}/></Tab.Pane> },
            { menuItem: 'Sword&Shield', render: () => <Tab.Pane attached={false}><StandardChart category="sword_shield" profile={this.props.profile}/></Tab.Pane> },
            { menuItem: 'Sword&Buckler', render: () => <Tab.Pane attached={false}><StandardChart category="sword_buckler" profile={this.props.profile}/></Tab.Pane> },
            { menuItem: 'Longsword', render: () => <Tab.Pane attached={false}><StandardChart category="longsword" profile={this.props.profile}/></Tab.Pane> },
            { menuItem: 'Polearm', render: () => <Tab.Pane attached={false}><StandardChart category="polearm" profile={this.props.profile}/></Tab.Pane> },
            { menuItem: 'Triathlon', render: () => <Tab.Pane attached={false}><StandardChart category="triathlon" profile={this.props.profile}/></Tab.Pane> },

        ]};
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });
  render() {
    return (
        <Modal  closeIcon size="large" open={this.state.modalOpen}  onClose={this.handleClose} trigger={<Icon style={{color:'green'}} onClick={this.handleOpen} size="large" name="line chart"/>}>
            <Modal.Header>{this.props.profile.user.name} Performance Overview</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Tab className="table-responsive-custom"  panes={this.state.tabs} />
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
  }
}
