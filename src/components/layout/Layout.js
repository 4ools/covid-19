import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Theme from '../theme/Theme';

export default ({ children }) => {
  return (
    <Theme>
      <main>
        <CssBaseline />
        <Container maxWidth="md">{children}</Container>
      </main>
    </Theme>
  );
};
