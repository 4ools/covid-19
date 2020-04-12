const getSummaryChartFigures = (data) => {
  return data.map(
    ({
      Country,
      NewConfirmed,
      TotalConfirmed,
      NewDeaths,
      TotalDeaths,
      NewRecovered,
      TotalRecovered,
    }) => {
      return {
        Country,
        NewConfirmed,
        TotalConfirmed,
        NewDeaths,
        TotalDeaths,
        NewRecovered,
        TotalRecovered,
      };
    },
  );
};

export default getSummaryChartFigures;
