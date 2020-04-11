/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import Summary from './components/summary/Summary';
import CountryPicker from './components/country-picker/CountryPicker';
import NavBar from './components/nav-bar/navBar';

import './App.css';

function App() {
  const bodyStyle = css`
    padding: 10px;
    display: flex;
    flex-direction: column;

    @media (min-width: 600px) {
      flex-direction: row;
      justify-content: space-around;
    }
  `;

  // response from the API request for all data
  const [APIData, setAPIData] = useState({
    Global: {},
    Countries: [],
  });
  // which figures do we currently show
  const [figures, setFigures] = useState({});

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
    <main>
      <NavBar />
      <div css={bodyStyle}>
        <Summary figures={figures} />
        <CountryPicker
          pickCountry={pickCountry}
          countries={APIData.Countries}
        />
      </div>
    </main>
  );
}

export default App;
