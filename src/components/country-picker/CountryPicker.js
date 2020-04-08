import React, { useRef } from "react";
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const CountryPicker = ({ componentStyle, pickCountry, countries }) => {
  const currentSelection = useRef({});
  const formStyle = css `${componentStyle}`

  return (
    <form css={formStyle}>
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
