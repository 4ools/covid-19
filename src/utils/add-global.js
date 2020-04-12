export default function addGlobalToCountry(apiResponse) {
  const newData = {
    Country: 'Global',
    Slug: 'global',
    ...apiResponse.Global,
  };

  const updatedData = { ...apiResponse };
  updatedData.Countries.unshift(newData);
  updatedData.Global = newData;
  return updatedData;
}
