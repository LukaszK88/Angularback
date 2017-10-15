import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import _ from 'lodash';

export default class ProfightChart extends Component {
  render() {
      const data = _.map(this.props.profile.user.profight,(profight) => {
          const eventName = (profight.event != null ? profight.event.title : 'unknown');
          return {name:eventName,
              won: parseInt(profight.win),
              ko:parseInt(profight.ko),
              loss:parseInt(profight.loss)
          }
      });
      if(this.props.profile.user.profight.length < 2){
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
                  <Line type="monotone" dataKey="loss" stroke="#FF0000"/>
                  <Line type="monotone" dataKey="ko" stroke="#ee950d"/>

              </LineChart>
          );
      }
  }
}
