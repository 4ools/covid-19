const getSummaryChartFigures = (data) => {
  return data.map(
    ({
      country,
      cases,
      todayCases,
      deaths,
      todayDeaths,
      critical,
      active,
      recovered,
    }) => {
      return {
        country,
        cases,
        todayCases,
        deaths,
        todayDeaths,
        critical,
        active,
        recovered,
      };
    },
  );
};

export default getSummaryChartFigures;
