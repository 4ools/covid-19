import { useTheme } from '@material-ui/core/styles';

export default function useColors() {
  const theme = useTheme();

  // colours that we use in various places for the theme
  const colors = {
    todayCases: theme.palette.primary.dark,
    cases: theme.palette.primary.light,
    todayDeaths: theme.palette.error.dark,
    deaths: theme.palette.error.light,
    critical: theme.palette.warning.main,
    recovered: theme.palette.success.main,
    active: theme.palette.action.main,
  };
  return colors;
}
