import React from "react";
/** @jsx jsx */
import { jsx, css } from '@emotion/core'


const NavBar = () => {
    const navBarStyle = css `
        display: flex;
        align-content: center;
        justify-content: space-between;
        width: 100%;
        margin: 0 auto;
        padding: 20px 0px 0px 0px;
    `;

    const logoStyle = css `
        color: #bf3334;
        font-size: 32px;
        text-decoration: none;
        font-weight: bold;
        padding-bottom: 10px;
        display: flex;
        width: 279px;
        height: 76px;
        margin-left: auto;
        margin-right auto;
    `;

    return (
    <header css={navBarStyle}>
        <a css={ logoStyle }
        href="/">COVID-19</a>
    </header>)
}
export default NavBar;
