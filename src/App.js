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
      const response = await fetch('https://api.covid19api.com/summary');
      const jsonData = await response.json();

      // Append Global to the list of countries as the first item of the countries array
      const newData = { ...jsonData.Global, Country: 'Global', Slug: 'global' };
      jsonData.Countries.unshift(newData);
      setAPIData(jsonData);
      setFigures(jsonData.Global);
    }
    getData();
  }, []);

  function pickCountry(slug) {
    const data = APIData.Countries.filter((c) => c.Slug === slug);
    if (!data.length) {
      return;
    }
    const {
      NewConfirmed,
      TotalConfirmed,
      NewDeaths,
      TotalDeaths,
      NewRecovered,
      TotalRecovered,
    } = data[0];

    setFigures({
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
              <Summary figures={figures} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <CountryPicker
                pickCountry={pickCountry}
                countries={APIData.Countries}
              />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export default App;
