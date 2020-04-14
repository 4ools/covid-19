import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Typography } from '@material-ui/core';
import TypePicker from '../type-picker/TypePicker';
import useColors from '../../hooks/useColors';

const CoronaTimeSeries = ({ data, pickType }) => {
  const colors = useColors();
  const colorKeys = Object.keys(colors);
  let index = 0;
  const getColor = () => {
    index += 1;
    if (!colors[colorKeys[index]]) {
      index = 0;
    }
    return colors[colorKeys[index]];
  };

  return data ? (
    <>
      <Typography
        variant="h5"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        Number of <TypePicker pickType={pickType} /> last 30 days
      </Typography>
      <div style={{ height: 500 }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 80 }}
          xScale={{ type: 'linear' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Days',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Total',
            legendOffset: -70,
            legendPosition: 'middle',
          }}
          colors={getColor}
          pointSize={5}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 10,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  ) : (
    <div>Loading</div>
  );
};

export default CoronaTimeSeries;
