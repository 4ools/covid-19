/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useColors from '../../hooks/useColors';

const Summary = ({ figures, date }) => {
  const colors = useColors();
  const colorKeys = Object.keys(colors);

  const colorStyles = makeStyles(() => {
    const stylesObj = {};

    colorKeys.forEach((key) => {
      stylesObj[key] = {
        color: colors[key],
      };
    });

    return stylesObj;
  })();

  const ulStyle = css`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    margin: 0 0 10px 0; /* To remove default bottom margin */
    padding: 0; /* To remove default left padding */
  `;

  const liStyle = css`
    margin: 0 0 -7px 0;
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
                {typeof figures[key] !== 'number' ? (
                  formatStatisticTitle(figures[key])
                ) : (
                  <span className={colorStyles[key]} style={{ fontSize: 40 }}>
                    {new Intl.NumberFormat('en-US').format(figures[key])}
                  </span>
                )}
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
