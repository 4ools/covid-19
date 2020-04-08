import React from "react";
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const Summary = ({ figures }) => {
  const ulStyle = css`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    margin: 0; /* To remove default bottom margin */ 
    padding: 0; /* To remove default left padding */
  `

  const liStyle = css `
    margin-bottom: 10px;
  `

  return (<ul css={ulStyle}>
    {Object.keys(figures).map((key, index) => {
      return (
        <li css={liStyle}>
          {key}: {figures[key]}
        </li>
      );
    })}
  </ul>)
};

export default Summary;
