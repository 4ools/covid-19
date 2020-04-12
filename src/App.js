import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';
import Summary from './components/summary/Summary';
import SummaryGraph from './components/summary-graph/SummaryGraph';
import CountryPicker from './components/country-picker/CountryPicker';
import NavBar from './components/nav-bar/navBar';
import Layout from './components/layout/Layout';
import Footer from './components/footer/Footer';
import getSummaryChartFigures from './utils/summary-graph';
import addGlobalToCountry from './utils/add-global';
import jsonData from './data/mockSummary.json';
import getDataForTimeSeriesGraph from './utils/time-series-graph';
import TimeSeriesGraph from './components/time-series-graph/TimeSeriesGraph';
import getTopFiveCountries from './utils/get-top-five';

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

  // chart figures for the bar chart
  const [summaryChartFigures, setSummaryChartFigures] = useState({});

  const [countriesTimeSeriesFigures, setCountriesTimeSeriesFigures] = useState(
    [],
  );

  const [date, setDate] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    async function getData() {
      // const response = await fetch('https://api.covid19api.com/summary');
      // const jsonData = await response.json();

      // Append Global to the list of countries as the first item of the countries array
      const processedAPIData = addGlobalToCountry(jsonData);

      const cloneForFirstLoad = JSON.parse(JSON.stringify(processedAPIData));

      // else it will show the slug in the summary list
      delete cloneForFirstLoad.Global.Slug;

      setAPIData(processedAPIData);
      setFigures(cloneForFirstLoad.Global);

      setDate(new Date(processedAPIData.Date).toDateString());

      const topFiveData = getTopFiveCountries(processedAPIData.Countries);
      const topFiveCountrySlugs = topFiveData.map((country) => country.Slug);

      setSummaryChartFigures(getSummaryChartFigures(topFiveData));

      setCountriesTimeSeriesFigures(
        getDataForTimeSeriesGraph(topFiveCountrySlugs),
      );
    }

    getData();
  }, []);

  function pickCountry(slug) {
    const data = APIData.Countries.filter((c) => c.Slug === slug);
    if (!data.length) {
      return;
    }
    const {
      Country,
      NewConfirmed,
      TotalConfirmed,
      NewDeaths,
      TotalDeaths,
      NewRecovered,
      TotalRecovered,
    } = data[0];

    setFigures({
      Country,
      NewConfirmed,
      TotalConfirmed,
      NewDeaths,
      TotalDeaths,
      NewRecovered,
      TotalRecovered,
    });
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
                    countries={APIData.Countries}
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
              <TimeSeriesGraph data={countriesTimeSeriesFigures} />
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
