import { NovelCovid } from 'novelcovid';
import mockGermany from '../data/mockCountryGermany.json';
import mockSpain from '../data/mockCountrySpain.json';
import mockFrance from '../data/mockCountryFrance.json';
import mockItaly from '../data/mockCountryItaly.json';
import mockUSA from '../data/mockCountryUSA.json';

const covidAPI = new NovelCovid();
const countryDataInMemory = {};

const makeRequestsForCountries = async (countryData) => {
  if (
    process.env.REACT_APP_MOCK_API &&
    JSON.parse(process.env.REACT_APP_MOCK_API)
  ) {
    return [mockFrance, mockGermany, mockItaly, mockSpain, mockUSA];
  }

  // get the names we want to request
  let countries = countryData.map((c) => c.country);

  // our bucket of data for lata
  const historyData = [];

  // if we have the data already, don't re-request it
  countries = countries.filter((c) => {
    // if historicalCountryData[USA]...
    if (countryDataInMemory[c]) {
      historyData.push(countryDataInMemory[c]);
    }
    return !countryDataInMemory[c];
  });

  const countryDataFromAPI = await Promise.all(
    countries.map((c) => covidAPI.countries(c)),
  );

  countryDataFromAPI.forEach((dataEntry) => {
    // store in memory for later so we do not re-request it
    countryDataInMemory[dataEntry.country] = dataEntry;
    // push so we return this data from the function
    historyData.push(dataEntry);
  });
  return historyData.reverse();
};

const formatDataForGraph = (countryDataArray, reportType) => {
  return countryDataArray.map((countryData) => {
    const obj = {};
    obj.country = countryData.country;
    obj[reportType] = countryData[reportType];

    return obj;
  });
};

// arg for the top fixe countries is an array of the slugs
// [italy, united-states ...]
const getCountryData = async (reportType, countryData) => {
  return formatDataForGraph(
    await makeRequestsForCountries(countryData),
    reportType,
  );
};

export default getCountryData;
