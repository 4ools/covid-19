import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const SummaryGraph = ({ figures }) => {
  const theme = useTheme();

  const keys = figures[0] ? Object.keys(figures[0]) : [];

  // colours for the char
  const colors = {
    NewConfirmed: theme.palette.primary.light,
    TotalConfirmed: theme.palette.primary.dark,
    NewDeaths: theme.palette.error.light,
    TotalDeaths: theme.palette.error.dark,
    NewRecovered: theme.palette.success.light,
    TotalRecovered: theme.palette.success.dark,
  };

  const getColor = (bar) => colors[bar.id];
  return figures[0] ? (
    <>
      <Typography variant="h5">Top 5 Countries</Typography>
      <div style={{ height: 500 }}>
        <ResponsiveBar
          data={figures}
          keys={keys.slice(1, keys.length)}
          indexBy="CountryCode"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
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
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Summary',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </>
  ) : (
    <div>Loading</div>
  );
};

export default SummaryGraph;
