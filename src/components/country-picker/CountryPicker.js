import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const CountryPicker = ({ pickCountry, countries }) => {
  return (
    <Autocomplete
      id="countryPicker"
      options={countries.map((entry) => entry.country)}
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField {...params} label="Pick Country" variant="outlined" />
      )}
      onChange={(_, values) => pickCountry(values || 'global')}
    />
  );
};

export default CountryPicker;
