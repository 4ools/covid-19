import { makeStyles } from '@material-ui/core/styles';

const cssStyles = makeStyles((theme) => ({
  NewConfirmed: {
    color: theme.palette.primary.light,
  },
  TotalConfirmed: {
    color: theme.palette.primary.dark,
  },
  NewDeaths: {
    color: theme.palette.error.light,
  },
  TotalDeaths: {
    color: theme.palette.error.dark,
  },
  NewRecovered: {
    color: theme.palette.success.light,
  },
  TotalRecovered: {
    color: theme.palette.success.dark,
  },
}));

export default cssStyles;
