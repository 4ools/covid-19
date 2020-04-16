import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const NavBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Toolbar style={{ padding: 0 }}>
              <Typography variant="h6">COVID-19</Typography>
            </Toolbar>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};
export default NavBar;
