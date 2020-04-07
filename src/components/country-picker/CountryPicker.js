import React, { useRef } from "react";

const CountryPicker = ({ pickCountry, countries }) => {
  const currentSelection = useRef({});

  return (
    <form>
      <label>
        Select country:
        <select
          value={currentSelection.current}
          onChange={(e) => {
            currentSelection.current = e.target.value;
            pickCountry(currentSelection.current);
          }}
        >
          {countries.map(
            (country, index) =>
              country.Country && (
                <option key={index} value={country.Slug}>
                  {country.Country}
                </option>
              )
          )}
        </select>
      </label>
    </form>
  );
};

export default CountryPicker;
