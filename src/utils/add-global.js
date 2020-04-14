export default function addGlobalToCountry(globalData, countriesData) {
  const newData = {
    country: 'global',
    ...globalData,
  };

  const updatedData = [newData, ...countriesData];
  return updatedData;
}
