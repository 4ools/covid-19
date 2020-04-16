import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Typography } from '@material-ui/core';
import useColors from '../../hooks/useColors';
import Picker from '../picker/Picker';
import ProgressBar from '../progress-bar/ProgressBar';

const BarChart = ({ data, titleStart, titleEnd, pick, options }) => {
  const keys = data[0] ? Object.keys(data[0]) : [];
  const colors = useColors();
  const getColor = (item) => colors[item.id];

  return data[0] ? (
    <>
      <Typography
        variant="h5"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {titleStart}
        <Picker pick={pick} options={options} />
        {titleEnd}
      </Typography>
      <br />
      <div
        style={{
          height: 500,
          backgroundColor: 'white',
          borderRadius: 5,
          color: 'black',
        }}
      >
        <ResponsiveBar
          data={data}
          keys={keys.slice(1, keys.length)}
          indexBy="country"
          margin={{ top: 50, right: 50, bottom: 50, left: 80 }}
          padding={0.3}
          colors={getColor}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Country',
            legendPosition: 'middle',
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Total',
            legendPosition: 'middle',
            legendOffset: -70,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['brighter', 1.6]] }}
          animate
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </>
  ) : (
    <div>
      <ProgressBar />
    </div>
  );
};

export default BarChart;
