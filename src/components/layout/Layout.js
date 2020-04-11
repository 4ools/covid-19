import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default ({ children }) => {
  return (
    <main>
      <CssBaseline />
      <Container maxWidth="md">{children}</Container>
    </main>
  );
};
