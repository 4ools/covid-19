/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  NewConfirmed: {
    color: theme.palette.primary.main,
  },
  TotalConfirmed: {
    color: theme.palette.primary.main,
  },
  NewDeaths: {
    color: theme.palette.error.main,
  },
  TotalDeaths: {
    color: theme.palette.error.main,
  },
  NewRecovered: {
    color: theme.palette.success.main,
  },
  TotalRecovered: {
    color: theme.palette.success.main,
  },
}));

const Summary = ({ figures }) => {
  const classes = useStyles();

  const ulStyle = css`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    margin: 0; /* To remove default bottom margin */
    padding: 0; /* To remove default left padding */
  `;

  const liStyle = css`
    margin-bottom: 10px;
  `;
  return (
    <React.Fragment>
      <Typography variant="h3">Summary</Typography>
      <br />
      <ul css={ulStyle}>
        {Object.keys(figures).map((key) => {
          return (
            <li css={liStyle} key={key}>
              <Typography variant="h5">
                {key}: <span className={classes[key]}>{figures[key]}</span>
              </Typography>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default Summary;
