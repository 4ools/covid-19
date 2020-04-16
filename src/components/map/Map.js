import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import { Typography } from '@material-ui/core';
import ProgressBar from '../progress-bar/ProgressBar';
import useColors from '../../hooks/useColors';
import Picker from '../picker/Picker';
import map from '../../data/map.json';

const orderByValue = (a, b) => {
  if (a.value < b.value) {
    return 1;
  }
  if (a.value > b.value) {
    return -1;
  }
  return 0;
};

const Map = ({ data, titleEnd, titleStart, pick, options }) => {
  const colors = useColors();
  const getColor = (item) => colors[item.id];
  let domain = [];

  if (data[0]) {
    domain = [0, data.sort(orderByValue)[0].value];
  }

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
        <ResponsiveChoropleth
          data={data}
          features={map.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors="nivo"
          // colors={getColor}
          domain={domain}
          unknownColor="#fff"
          label="properties.name"
          valueFormat=".2s"
          projectionTranslation={[0.5, 0.5]}
          projectionRotation={[0, 0, 0]}
          enableGraticule
          graticuleLineColor="#dddddd"
          borderWidth={0.5}
          borderColor="#152538"
          legends={[
            {
              anchor: 'bottom-left',
              direction: 'column',
              justify: true,
              translateX: 20,
              translateY: -100,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: 'left-to-right',
              itemTextColor: '#444444',
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000000',
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
    <div>
      <ProgressBar />
    </div>
  );
};

export default Map;
