import UKData from '../data/mockDayOneUnitedKingdom.json';
import ITData from '../data/mockDayOneItaly.json';

const makeRequestsForTopFiveData = (topFiveSlugs) => {
  // here we would make the requests to get the day one data for the top five
  // if it is not cached, for now though we can just grab the mocks

  // @TODO request all the data, add to an array

  const data = [UKData, ITData];

  return data;
};

const formatDataForGraph = (jsonData) => {
  return jsonData.map((countryData) => ({
    id: countryData[0].Country,
    data: countryData
      .filter((entry) => entry.Province === '')
      .map((date, index) => ({
        x: index + 1,
        y: date.Cases,
      })),
  }));
};

// arg for the top fixe countries is an array of the slugs
// [italy, united-states ...]
const getDataForTimeSeriesGraph = (topFiveSlugs) => {
  return formatDataForGraph(makeRequestsForTopFiveData(topFiveSlugs));
};

export default getDataForTimeSeriesGraph;
