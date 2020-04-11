import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Summary from './components/summary/Summary';
import SummaryGraph from './components/summary-graph/SummaryGraph';
import CountryPicker from './components/country-picker/CountryPicker';
import NavBar from './components/nav-bar/navBar';
import Layout from './components/layout/Layout';
import jsonData from './data/mockSummary.json';
// import { colors } from './utils/keyColors';

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

  const theme = useTheme();

  // chart figures for the bar chart
  const [summaryChartFigures, setSummaryChartFigures] = useState({});

  const [date, setDate] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    async function getData() {
      // const response = await fetch('https://api.covid19api.com/summary');
      // const jsonData = await response.json();

      // Append Global to the list of countries as the first item of the countries array
      const processedAPIData = addGlobalToCountry(jsonData);
      setAPIData(processedAPIData);
      setFigures(processedAPIData.Global);
      setDate(Date(processedAPIData.Date));

      const countriesDataForSummaryFigures = sortDataForSummaryGraph(
        processedAPIData.Countries,
      );
      setSummaryChartFigures(countriesDataForSummaryFigures);
    }
    getData();
  }, []);

  function sortDataForSummaryGraph(data) {
    const colors = {
      NewConfirmed: {
        color: theme.palette.primary.main,
      },
      TotalConfirmed: {
        color: theme.palette.primary.main,
      },
      NewDeaths: {
        color: theme.palette.error.main,
      },
      TotalDeaths: {
        color: theme.palette.error.main,
      },
      NewRecovered: {
        color: theme.palette.success.main,
      },
      TotalRecovered: {
        color: theme.palette.success.main,
      },
    };
    return data
      .map(
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
            NewConfirmedColor: colors.NewConfirmed.color,
            TotalConfirmed,
            TotalConfirmedColor: colors.TotalConfirmed.color,
            NewDeaths,
            NewDeathsColor: colors.NewDeaths.color,
            TotalDeaths,
            TotalDeathsColor: colors.TotalDeaths.color,
            NewRecovered,
            NewRecoveredColor: colors.NewRecovered.color,
            TotalRecovered,
            TotalRecoveredColor: colors.TotalRecovered.color,
          };
        },
      )
      .splice(1, 6);
  }

  function addGlobalToCountry(apiResponse) {
    const newData = {
      Country: 'Global',
      Slug: 'global',
      ...apiResponse.Global,
    };

    const updatedData = { ...apiResponse };
    updatedData.Countries.unshift(newData);
    updatedData.Global = newData;
    delete updatedData.Global.Slug;
    return updatedData;
  }

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
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Summary figures={figures} date={date} />
                </Grid>
                <Grid item xs={4}>
                  <CountryPicker
                    pickCountry={pickCountry}
                    countries={APIData.Countries}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/* Line graph */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Summary graph</Typography>
              <SummaryGraph figures={summaryChartFigures} />
              {/* <CountryPicker
                pickCountry={pickCountry}
                countries={APIData.Countries}
              />

              <CountryPicker
                pickCountry={pickCountry}
                countries={APIData.Countries}
              /> */}
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export default App;
