import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import _ from 'lodash';

export default class PointsChart extends Component {
  render() {
      const data = _.map(this.props.clubs.clubs,(club) => {
          return {name:club.name,
              points: parseInt(club.total_points),
          }
      });

      return (
          <BarChart width={800} height={300} data={data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <Bar dataKey="points" fill="#2d871f" />
          </BarChart>
      );

  }
}
