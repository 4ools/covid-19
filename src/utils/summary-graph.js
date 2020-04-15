const getSummaryChartFigures = (data) => {
  return data.map(
    ({
      country,
      cases,
      todayCases,
      deaths,
      todayDeaths,
      critical,
      recovered,
    }) => {
      return {
        country,
        cases,
        todayCases,
        deaths,
        todayDeaths,
        critical,
        recovered,
      };
    },
  );
};

export default getSummaryChartFigures;
