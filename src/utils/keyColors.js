import { makeStyles, useTheme } from '@material-ui/core/styles';

// const theme = useTheme();
// const colors = {
//   NewConfirmed: {
//     color: theme.palette.primary.main,
//   },
//   TotalConfirmed: {
//     color: theme.palette.primary.main,
//   },
//   NewDeaths: {
//     color: theme.palette.error.main,
//   },
//   TotalDeaths: {
//     color: theme.palette.error.main,
//   },
//   NewRecovered: {
//     color: theme.palette.success.main,
//   },
//   TotalRecovered: {
//     color: theme.palette.success.main,
//   },
// };

const colors = {};

const cssStyles = makeStyles((theme) => ({
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

export { cssStyles, colors };
