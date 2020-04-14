import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';
import { NovelCovid } from 'novelcovid';
import countryData from './data/mockCountries.json';
import allData from './data/mockSummary.json';
import Summary from './components/summary/Summary';
import SummaryGraph from './components/summary-graph/SummaryGraph';
import CountryPicker from './components/country-picker/CountryPicker';
import NavBar from './components/nav-bar/navBar';
import Layout from './components/layout/Layout';
import Footer from './components/footer/Footer';
import getSummaryChartFigures from './utils/summary-graph';
import addGlobalToCountry from './utils/add-global';
import getDataForTimeSeriesGraph from './utils/time-series-graph';
import TimeSeriesGraph from './components/time-series-graph/TimeSeriesGraph';
import getTopFiveCountries from './utils/get-top-five';

const covidAPI = new NovelCovid();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

function App() {
  // response from the API request for all data
  const [APIData, setAPIData] = useState({
    Global: {},
    Countries: [],
  });
  // which figures do we currently show
  const [figures, setFigures] = useState({});

  const [topFiveData, setTopFiveData] = useState([]);

  // chart figures for the bar chart
  const [summaryChartFigures, setSummaryChartFigures] = useState({});

  const [countriesTimeSeriesFigures, setCountriesTimeSeriesFigures] = useState(
    [],
  );

  const [date, setDate] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    async function getData() {
      // const globalData = await covidAPI.all();
      // const countriesData = await covidAPI.countries(null, 'cases');
      const globalData = allData;
      const countriesData = countryData;

      // Append Global to the list of countries as the first item of the countries array
      const processedAPIData = addGlobalToCountry(globalData, countriesData);
      // const cloneForFirstLoad = JSON.parse(JSON.stringify(processedAPIData));

      // else it will show the slug in the summary list
      // delete cloneForFirstLoad.Global.Slug;

      setAPIData(processedAPIData);
      setFigures(processedAPIData[0]);

      setDate(new Date(globalData.updated).toDateString());
      const topData = getTopFiveCountries(countriesData);

      setTopFiveData(topData);

      setSummaryChartFigures(getSummaryChartFigures(topData));

      setCountriesTimeSeriesFigures(
        await getDataForTimeSeriesGraph('cases', topData),
      );
    }

    getData();
  }, []);

  async function pickType(reportType) {
    setCountriesTimeSeriesFigures(
      await getDataForTimeSeriesGraph(reportType, topFiveData),
    );
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
      return;
    }

    // check if the counties data is shown in the graphs, if not add selected
    // countries data to the graphs
    const match = topFiveData.filter((c) => c.country === country);

    if (!match.length) {
      setSummaryChartFigures(getSummaryChartFigures([...topFiveData, data[0]]));
      setCountriesTimeSeriesFigures(
        await getDataForTimeSeriesGraph('cases', [...topFiveData, data[0]]),
      );
    }
  }

  return (
    <>
      <NavBar />
      <Layout>
        <Grid container spacing={3}>
          <Grid item xs={12} />
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5">Select your Country</Typography>
                  <br />
                  <CountryPicker
                    pickCountry={pickCountry}
                    countries={APIData}
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
                data={countriesTimeSeriesFigures}
                pickType={pickType}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Footer />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export default App;
