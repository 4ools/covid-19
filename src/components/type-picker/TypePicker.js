import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const TypePicker = ({ pickType }) => {
  const options = ['cases', 'deaths', 'recovered'];
  return (
    <Autocomplete
      id="countryPicker"
      options={options}
      // getOptionLabel={(option) => option.Country}
      style={{ width: '170px', display: 'inline-block', margin: '0 10px' }}
      renderInput={(params) => (
        <TextField {...params} label="cases" variant="outlined" />
      )}
      onChange={(_, values) => pickType(values || 'cases')}
    />
  );
};

export default TypePicker;
