const getMapData = (data, reportType) => {
  return data
    .filter((entry) => entry.country !== 'global')
    .map((entry) => ({
      id: entry.countryInfo.iso3,
      value: entry[reportType],
    }));
};

export default getMapData;
