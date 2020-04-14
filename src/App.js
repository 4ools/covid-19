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
import { NovelCovid } from 'novelcovid';

const track = new NovelCovid();

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

  const [topFiveCountrySlugs, setTopFiveCountrySlugs] = useState([]);
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
      // const response = await fetch('https://api.covid19api.com/summary');
      // const jsonData = await response.json();
      const globalData = await track.all();
      const countriesData = await track.countries(null, 'cases');
      // Append Global to the list of countries as the first item of the countries array
      const processedAPIData = addGlobalToCountry(globalData, countriesData);
      console.log(processedAPIData);
      const cloneForFirstLoad = JSON.parse(JSON.stringify(processedAPIData));

      // else it will show the slug in the summary list
      // delete cloneForFirstLoad.Global.Slug;

      setAPIData(processedAPIData);
      setFigures(processedAPIData[0]);

      // setDate(new Date(processedAPIData.Date).toDateString());

      const topData = getTopFiveCountries(countriesData);

      setTopFiveData(topData);
      // setTopFiveCountrySlugs(topData.map((country) => country.Slug));

      setSummaryChartFigures(getSummaryChartFigures(topData));

      // setCountriesTimeSeriesFigures(
      //   getDataForTimeSeriesGraph(topFiveCountrySlugs, 'Confirmed'),
      // );
    }

    getData();
  }, []);

  function pickType(reportType) {
    setCountriesTimeSeriesFigures(
      getDataForTimeSeriesGraph(topFiveCountrySlugs, reportType),
    );
  }

  function pickCountry(option) {
    const data = APIData.filter((c) => c.country === option);
    if (!data.length) {
      return;
    }
    const {
      country,
      updated,
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      active,
      critical,
      casesPerOneMillion,
      deathsPerOneMillion,
      tests,
      testsPerOneMillion,
      affectedCountries,
    } = data[0];

    setFigures({
      country,
      updated,
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      active,
      critical,
      casesPerOneMillion,
      deathsPerOneMillion,
      tests,
      testsPerOneMillion,
      affectedCountries,
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
      setSummaryChartFigures(getSummaryChartFigures([data[0], ...topFiveData]));
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
