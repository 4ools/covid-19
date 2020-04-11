import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Summary from './components/summary/Summary';
import CountryPicker from './components/country-picker/CountryPicker';
import NavBar from './components/nav-bar/navBar';
import Layout from './components/layout/Layout';

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

  const classes = useStyles();

  useEffect(() => {
    async function getData() {
      // const response = await fetch('https://api.covid19api.com/summary');
      // const jsonData = await response.json();
      const jsonData = {
        Global: {
          NewConfirmed: 5,
          TotalConfirmed: 16,
          NewDeaths: 0,
          TotalDeaths: 0,
          NewRecovered: 0,
          TotalRecovered: 0,
        },
        Countries: [
          {
            Country: 'Afghanistan',
            Slug: 'afghanistan',
            NewConfirmed: 500,
            TotalConfirmed: 160123200,
            NewDeaths: 12,
            TotalDeaths: 34343,
            NewRecovered: 23,
            TotalRecovered: 12312312,
          },
        ],
        Date: '2020-03-16T21:10:53.86852587Z',
      };

      // Append Global to the list of countries as the first item of the countries array
      const processedAPIData = addGlobalToCountry(jsonData);
      setAPIData(processedAPIData);
      setFigures(processedAPIData.Global);
    }
    getData();
  }, []);

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
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <CountryPicker
                pickCountry={pickCountry}
                countries={APIData.Countries}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Summary figures={figures} />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export default App;
