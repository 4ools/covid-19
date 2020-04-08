import React from "react";
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const Summary = ({ figures }) => {
  const style = css`
    background-color: pink;
  `
  
  return (<ul css={style}>
    {Object.keys(figures).map((key, index) => {
      return (
        <li>
          {key}: {figures[key]}
        </li>
      );
    })}
  </ul>)
};

export default Summary;
