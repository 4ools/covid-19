const dataForSummaryGraph = (data) => {
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

const sortDataByConfirmedCases = (data) => {
  if (!data.length) {
    return [];
  }
  data.sort((a, b) => a.TotalConfirmed - b.TotalConfirmed);

  return data.reverse().slice(1, 6);
};

// get the data for the summary chart public function
const getSummaryChartFigures = (data) => {
  const countriesDataForSummaryFigures = dataForSummaryGraph(data);

  return sortDataByConfirmedCases(countriesDataForSummaryFigures);
};

export default getSummaryChartFigures;
