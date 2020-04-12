import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import covidLogo from './covidAPI.png';
import foolsLogo from './fools.png';
import styles from './styles.module.css';

const Footer = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6} className={styles.item}>
      Data from the
      <a href="https://covid19api.com/" title="Built using the Covid19API">
        <img src={covidLogo} alt="CovidAPI" className={styles.icon} />
      </a>
    </Grid>
    <Grid item xs={12} sm={6} className={`${styles.item} ${styles.last}`}>
      Built by a bunch of fools:
      <a href="https://github.com/4ools">
        <Avatar src={foolsLogo} alt="Fools on github" className={styles.icon} />
      </a>
    </Grid>
  </Grid>
);

export default Footer;
