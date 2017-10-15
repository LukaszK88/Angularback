import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import _ from 'lodash';

export default class BohurtChart extends Component {
  render() {
      const data = _.map(this.props.profile.user.bohurt,(bohurt) => {
          const eventName = (bohurt.event != null ? bohurt.event.title : 'unknown');
          return {name: eventName,
              won:parseInt(bohurt.won),
              down:parseInt(bohurt.down),
              suicide:parseInt(bohurt.suicide),
              lastMan:parseInt(bohurt.last)
          }
      });
      if(this.props.profile.user.bohurt.length < 2){
          return <p>You need minimum two records to render a chart</p>
      }else {
          return (
              <LineChart width={800} height={300} data={data}
                         margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <Tooltip/>
                  <Legend />
                  <Line type="monotone" dataKey="won" stroke="#2d871f" activeDot={{r: 8}}/>
                  <Line type="monotone" dataKey="down" stroke="#FF0000"/>
                  <Line type="monotone" dataKey="suicide" stroke="#ee950d"/>
                  <Line type="monotone" dataKey="lastMan" stroke="#0900ff"/>
              </LineChart>
          );
      }
  }
}
