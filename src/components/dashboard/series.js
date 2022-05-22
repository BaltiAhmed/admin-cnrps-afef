import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';

import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';



export default class SerieDashboard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            valueField="young"
            argumentField="state"
            name="Young"
          />
          <BarSeries
            valueField="middle"
            argumentField="state"
            name="Middle"
          />
          <BarSeries
            valueField="older"
            argumentField="state"
            name="Older"
          />
          <Stack />
        </Chart>
      </Paper>
    );
  }
}
