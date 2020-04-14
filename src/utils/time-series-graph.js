import { NovelCovid } from 'novelcovid';
import mockGermany from '../data/mockGermany.json';
import mockSpain from '../data/mockSpain.json';
import mockFrance from '../data/mockFrance.json';
import mockItaly from '../data/mockItaly.json';
import mockUSA from '../data/mockUSA.json';
import debugMode from './debugMode';

const covidAPI = new NovelCovid();
const historicalCountryDataInMemory = {};

const makeRequestsForCountries = async (countryData) => {
  if (debugMode) {
    return [mockFrance, mockGermany, mockItaly, mockSpain, mockUSA];
  }

  // get the names we want to request
  let countries = countryData.map((c) => c.country);

  // our bucket of data for lata
  const historyData = [];

  // if we have the data already, don't re-request it
  countries = countries.filter((c) => {
    // if historicalCountryData[USA]...
    if (historicalCountryDataInMemory[c]) {
      historyData.push(historicalCountryDataInMemory[c]);
    }
    return !historicalCountryDataInMemory[c];
  });

  const historyFromAPIS = await Promise.all(
    countries.map((c) => covidAPI.historical(null, c)),
  );

  historyFromAPIS.forEach((dataEntry) => {
    // store in memory for later so we do not re-request it
    historicalCountryDataInMemory[dataEntry.country] = dataEntry;
    // push so we return this data from the function
    historyData.push(dataEntry);
  });

  return historyData;
};

const formatDataForGraph = (countryDataArray, reportType) => {
  return countryDataArray.map((countryData) => ({
    id: countryData.country,
    data: Object.keys(countryData.timeline[reportType]).map((key, index) => ({
      x: index,
      y: countryData.timeline[reportType][key],
    })),
  }));
};

// arg for the top fixe countries is an array of the slugs
// [italy, united-states ...]
const getDataForTimeSeriesGraph = async (reportType, countryData) => {
  return formatDataForGraph(
    await makeRequestsForCountries(countryData),
    reportType,
  );
};

export default getDataForTimeSeriesGraph;
