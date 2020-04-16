import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';
import { NovelCovid } from 'novelcovid';
import mockCountryData from './data/mockCountries.json';
import allData from './data/mockSummary.json';
import Summary from './components/summary/Summary';
import SummaryGraph from './components/summary-graph/SummaryGraph';
import NavBar from './components/nav-bar/navBar';
import Layout from './components/layout/Layout';
import Footer from './components/footer/Footer';
import getSummaryChartFigures from './utils/summary-graph';
import addGlobalToCountry from './utils/add-global';
import getDataForTimeSeriesGraph from './utils/time-series-graph';
import getCountryData from './utils/country-graph';
import TimeSeriesGraph from './components/time-series-graph/TimeSeriesGraph';
import getTopFiveCountries from './utils/get-top-five';
import Picker from './components/picker/Picker';
import BarChart from './components/bar-chart/BarChart';
import ProgressBar from './components/progress-bar/ProgressBar';

const covidAPI = new NovelCovid();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}));

function App() {
  // response from the API request for all data
  const [APIData, setAPIData] = useState([]);
  // which figures do we currently show
  const [figures, setFigures] = useState({});

  const [topFiveData, setTopFiveData] = useState([]);

  // for the charts
  const [summaryChartFigures, setSummaryChartFigures] = useState({});
  const [countriesTimeSeriesFigures, setCountriesTimeSeriesFigures] = useState(
    [],
  );
  const [countryData, setCountryData] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState({});

  const [date, setDate] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    async function getData() {
      let globalData;
      let countriesData;
      setLoading(true);
      if (
        process.env.REACT_APP_MOCK_API &&
        JSON.parse(process.env.REACT_APP_MOCK_API)
      ) {
        globalData = allData;
        countriesData = mockCountryData;
      } else {
        globalData = await covidAPI.all();
        countriesData = await covidAPI.countries(null, 'cases');
      }
      setLoading(false);
      // Append Global to the list of countries as the first item of the countries array
      const processedAPIData = addGlobalToCountry(globalData, countriesData);

      setAPIData(processedAPIData);

      setFigures(processedAPIData[0]);

      setDate(new Date(globalData.updated).toDateString());
      const topData = getTopFiveCountries(countriesData);

      setTopFiveData(topData);

      setSummaryChartFigures(getSummaryChartFigures(topData));

      setCountriesTimeSeriesFigures(
        await getDataForTimeSeriesGraph('cases', topData),
      );

      setCountryData(await getCountryData('casesPerOneMillion', topData));
    }

    getData();
  }, []);

  async function pickTimeType(reportType) {
    setCountriesTimeSeriesFigures(
      await getDataForTimeSeriesGraph(
        reportType,
        selectedCountry.country
          ? [...topFiveData, selectedCountry]
          : topFiveData,
      ),
    );
  }

  async function pickCountryType(reportType) {
    setLoading(true);
    setCountryData(
      await getCountryData(
        reportType,
        selectedCountry.country
          ? [...topFiveData, selectedCountry]
          : topFiveData,
      ),
    );
    setLoading(false);
  }

  async function pickCountry(option) {
    const data = APIData.filter((c) => c.country === option);
    if (!data.length) {
      return;
    }
    const {
      country,
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      active,
      critical,
    } = data[0];

    setFigures({
      country,
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      active,
      critical,
    });

    // reset the charts
    if (country === 'global') {
      setSummaryChartFigures(getSummaryChartFigures(topFiveData));
      // as user chose global, unselect country on picker
      setSelectedCountry({});
      return;
    }

    // check if the counties data is shown in the graphs, if not add selected
    // countries data to the graphs
    const match = topFiveData.filter((c) => c.country === country);

    if (!match.length) {
      // as the user picked a country that was not in the list save it
      setSelectedCountry(data[0]);

      // update the summary chart
      setSummaryChartFigures(getSummaryChartFigures([...topFiveData, data[0]]));

      // update the timeline graph
      setCountriesTimeSeriesFigures(
        await getDataForTimeSeriesGraph('cases', [...topFiveData, data[0]]),
      );

      // update the timeline per million graph
      setCountryData(
        await getCountryData('casesPerOneMillion', [...topFiveData, data[0]]),
      );
    } else {
      // picked one already in the list
      setSelectedCountry({});
    }
  }

  return (
    <>
      <NavBar />
      {isLoading ? <ProgressBar /> : <> </>}
      <Layout>
        <Grid container spacing={3}>
          <Grid item xs={12} />
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5">Select your Country</Typography>
                  <br />
                  <Picker
                    pick={pickCountry}
                    options={APIData.map((entry) => entry.country)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Summary figures={figures} date={date} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/* Summary graph for all the top 5 countries */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <SummaryGraph figures={summaryChartFigures} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TimeSeriesGraph
                titleStart="Number of "
                titleEnd=" last 30 days"
                data={countriesTimeSeriesFigures}
                pick={pickTimeType}
                options={['cases', 'deaths', 'recovered']}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <BarChart
                titleStart="Number of "
                titleEnd=" per country"
                data={countryData}
                pick={pickCountryType}
                options={[
                  'cases',
                  'todayCases',
                  'deaths',
                  'todayDeaths',
                  'recovered',
                  'active',
                  'critical',
                  'casesPerOneMillion',
                  'deathsPerOneMillion',
                  'tests',
                  'testsPerOneMillion',
                ]}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.footer}>
              <Footer />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export default App;
