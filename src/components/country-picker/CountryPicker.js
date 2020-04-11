/** @jsx jsx */
import { useRef } from 'react';
import { jsx, css } from '@emotion/core';

const CountryPicker = ({ componentStyle, pickCountry, countries }) => {
  const currentSelection = useRef({});
  const formStyle = css`
    ${componentStyle}
  `;

  return (
    <form css={formStyle}>
      <label htmlFor="countrySelect">
        Select country:
        <select
          id="countrySelect"
          value={currentSelection.current}
          onChange={(e) => {
            currentSelection.current = e.target.value;
            pickCountry(currentSelection.current);
          }}
        >
          {countries.map(
            (country) =>
              country.Country && (
                <option key={country.Slug} value={country.Slug}>
                  {country.Country}
                </option>
              ),
          )}
        </select>
      </label>
    </form>
  );
};

export default CountryPicker;
