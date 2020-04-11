import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
  const navBarStyle = css`
    display: flex;
    align-content: center;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    padding: 20px 0px 0px 0px;
  `;

  const logoStyle = css`
    color: #bf3334;
    font-size: 32px;
    text-decoration: none;
    font-weight: bold;
    padding-bottom: 10px;
    display: flex;
    width: 279px;
    height: 76px;
    margin-right: auto;
    margin-left: auto;
  `;

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        COVID-19
      </Navbar.Brand>
    </Navbar>
  );
};
export default NavBar;
