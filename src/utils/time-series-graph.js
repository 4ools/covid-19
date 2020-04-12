import UKData from '../data/mockDayOneUnitedKingdom.json';
import ITData from '../data/mockDayOneItaly.json';

// @TODO keep ref to old requests in le cache for when we change the report type

const makeRequestsForTopFiveData = (topFiveSlugs) => {
  // here we would make the requests to get the day one data for the top five
  // if it is not cached, for now though we can just grab the mocks

  // @TODO request all the data, add to an array

  const data = [UKData, ITData];

  return data;
};

const formatDataForGraph = (jsonData, reportType) => {
  return jsonData.map((countryData) => ({
    id: countryData[0].Country,
    data: countryData
      .filter((entry) => entry.Province === '')
      .map((date, index) => ({
        x: index + 1,
        y: date[reportType],
      })),
  }));
};

// arg for the top fixe countries is an array of the slugs
// [italy, united-states ...]
const getDataForTimeSeriesGraph = (topFiveSlugs, reportType) => {
  return formatDataForGraph(
    makeRequestsForTopFiveData(topFiveSlugs),
    reportType,
  );
};

export default getDataForTimeSeriesGraph;
