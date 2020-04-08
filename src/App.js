import React, { useState, useEffect } from "react";
import Summary from "./components/summary/Summary";
import CountryPicker from "./components/country-picker/CountryPicker";
import NavBar from "./components/nav-bar/navBar";

import "./App.css";
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function App() {

  const bodyStyle = css `
    padding: 10px;
    display: flex;
    flex-direction: column;

    @media (min-width: 600px) {
      flex-direction: row;
      justify-content: space-around;
    }
  `;

  const countryPickerStyle = css `
    margin-top: 20px;
    @media (min-width: 600px) {
      margin-top: 0px;
    }
  `

  // response from the API request for all data
  const [APIData, setAPIData] = useState({
    Global: {},
    Countries: [],
  });
  // which figures do we currently show
  const [figures, setFigures] = useState({});


  useEffect(() => {
    async function getData() {
      const response = await fetch("https://api.covid19api.com/summary");
      const jsonData = await response.json();

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
        <CountryPicker componentStyle={countryPickerStyle} pickCountry={pickCountry} countries={APIData.Countries} />
      </div>
    </main>
  );
}

export default App;
