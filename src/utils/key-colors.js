import { makeStyles } from '@material-ui/core/styles';

const cssStyles = makeStyles((theme) => ({
  todayCases: {
    color: theme.palette.primary.light,
  },
  cases: {
    color: theme.palette.primary.dark,
  },
  todayDeaths: {
    color: theme.palette.error.light,
  },
  deaths: {
    color: theme.palette.error.dark,
  },
  critical: {
    color: theme.palette.success.light,
  },
  recovered: {
    color: theme.palette.success.dark,
  },
}));

export default cssStyles;
