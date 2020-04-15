import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Picker = ({ pick, options }) => {
  return (
    <Autocomplete
      id={`picker-${options[0]}`}
      options={options}
      style={{ width: '170px', display: 'inline-block', margin: '0 10px' }}
      renderInput={(params) => (
        <TextField {...params} label={options[0]} variant="outlined" />
      )}
      onChange={(_, values) => pick(values || options[0])}
    />
  );
};

export default Picker;
