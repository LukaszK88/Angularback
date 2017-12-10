import React, { Component } from 'react';
import { Modal, Icon,Tab } from 'semantic-ui-react'
import PointsChart from './charts/points';
import FightsChart from './charts/fights';

export default class PerformanceCharts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            tabs:[]
        };
    }

    componentDidMount(){
        this.state = {tabs:[
            { menuItem: 'Points', render: () => <Tab.Pane attached={false}><PointsChart clubs={this.props.clubs}/></Tab.Pane> },
            { menuItem: 'Fights', render: () => <Tab.Pane attached={false}><FightsChart clubs={this.props.clubs}/></Tab.Pane> }
        ]};
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });
  render() {

    return (
        <Modal  closeIcon size="large" open={this.state.modalOpen}  onClose={this.handleClose} trigger={<Icon style={{color:'green'}} onClick={this.handleOpen} size="large" name="bar chart"/>}>
            <Modal.Header>{this.props.club.name} Score Overview</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Tab className="table-responsive-custom"  panes={this.state.tabs} />
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
  }
}
