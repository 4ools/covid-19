import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import covidLogo from './covidAPI.png';
import foolsLogo from './fools.png';
import styles from './styles.module.css';

const Footer = () => (
  <ul className={styles.list}>
    <li className={styles.item}>
      Data from the
      <a href="https://covid19api.com/" title="Built using the Covid19API">
        <img src={covidLogo} alt="CovidAPI" className={styles.icon} />
      </a>
    </li>
    <li className={styles.item}>
      Built by a bunch of fools:
      <a href="https://github.com/4ools">
        <Avatar src={foolsLogo} alt="Fools on github" className={styles.icon} />
      </a>
    </li>
  </ul>
);

export default Footer;
