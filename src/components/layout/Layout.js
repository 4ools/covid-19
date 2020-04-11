import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default ({ children }) => {
  return (
    <main>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography component="div" style={{ height: '100vh' }}>
          {children}
        </Typography>
      </Container>
    </main>
  );
};
