import React, { useState, useEffect } from "react";
import Summary from "./components/summary/Summary";
import CountryPicker from "./components/country-picker/CountryPicker";
import "./App.css";


function App() {
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
      <Summary figures={figures} />
      <CountryPicker pickCountry={pickCountry} countries={APIData.Countries} />
    </main>
  );
}

export default App;
