const getTopFiveCountries = (data) => {
  if (!data.length) {
    return [];
  }

  return data.slice(0, 5);
};

export default getTopFiveCountries;
