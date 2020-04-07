import React from "react";

const Summary = ({ figures }) => (
  <ul>
    {Object.keys(figures).map((key, index) => {
      return (
        <li>
          {key}: {figures[key]}
        </li>
      );
    })}
  </ul>
);

export default Summary;
