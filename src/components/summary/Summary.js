/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { Typography } from '@material-ui/core';
import cssStyles from '../../utils/key-colors';

const Summary = ({ figures, date }) => {
  const colorStyles = cssStyles();

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

  const formatStatisticTitle = (title) =>
    (title.charAt(0).toUpperCase() + title.slice(1)).replace(/([A-Z])/g, ' $1');

  return (
    <React.Fragment>
      <ul css={ulStyle}>
        {Object.keys(figures).map((key) => {
          return (
            <li css={liStyle} key={key}>
              <Typography variant="h5">
                {formatStatisticTitle(key)}:{' '}
                <span className={colorStyles[key]}>
                  {typeof figures[key] !== 'number'
                    ? formatStatisticTitle(figures[key])
                    : new Intl.NumberFormat('en-US').format(figures[key])}
                </span>
              </Typography>
            </li>
          );
        })}
      </ul>
      <Typography variant="caption">Last updated: {date} </Typography>
    </React.Fragment>
  );
};

export default Summary;
