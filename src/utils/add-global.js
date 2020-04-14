export default function addGlobalToCountry(
  { cases, todayCases, deaths, todayDeaths, recovered, active, critical },
  countriesData,
) {
  const newData = {
    country: 'global',
    cases,
    todayCases,
    deaths,
    todayDeaths,
    recovered,
    active,
    critical,
  };

  const updatedData = [newData, ...countriesData];
  return updatedData;
}
