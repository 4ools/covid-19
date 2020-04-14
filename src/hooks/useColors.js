import { useTheme } from '@material-ui/core/styles';

export default function useColors() {
  const theme = useTheme();

  // colours that we use in various places for the theme
  const colors = {
    todayCases: theme.palette.primary.light,
    cases: theme.palette.primary.dark,
    todayDeaths: theme.palette.error.light,
    deaths: theme.palette.error.dark,
    critical: theme.palette.success.light,
    recovered: theme.palette.success.dark,
    active: theme.palette.error.light,
  };
  return colors;
}
