import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const TypePicker = ({ pickType }) => {
  return (
    <Autocomplete
      id="countryPicker"
      options={['Confirmed', 'Deaths', 'Recovered', 'Active']}
      // getOptionLabel={(option) => option.Country}
      style={{ width: '170px', display: 'inline-block', margin: '0 10px' }}
      renderInput={(params) => (
        <TextField {...params} label="Confirmed" variant="outlined" />
      )}
      onChange={(_, values) => pickType(values || 'Confirmed')}
    />
  );
};

export default TypePicker;
