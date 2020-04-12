const getSummaryChartFigures = (data) => {
  return data.map(
    ({
      CountryCode,
      NewConfirmed,
      TotalConfirmed,
      NewDeaths,
      TotalDeaths,
      NewRecovered,
      TotalRecovered,
    }) => {
      return {
        CountryCode,
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
