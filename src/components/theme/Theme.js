import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function Theme({ children }) {
  // system defined media query for dark mode if you want it on or not
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          // cases
          primary: {
            main: '#E4572E',
          },
          secondary: {
            main: '#3E92CC',
          },
          // deaths
          error: {
            main: '#E4572E',
          },
          // critical
          warning: {
            main: '#F3A712',
          },
          // recovered
          success: {
            main: '#52AA5E',
          },
          // active
          action: {
            main: '#DAD7CD',
          },
        },
      }),
    [prefersDarkMode],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
