const getTopFiveCountries = (data) => {
  if (!data.length) {
    return [];
  }
  data.sort((a, b) => a.cases - b.cases);

  return data.reverse().slice(1, 6);
};

export default getTopFiveCountries;
