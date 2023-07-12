const baseUrl = "https://api.shrtco.de/v2/";

const fetchDataApi = async (endpoint) => {
  const finalUrl = `${baseUrl}${endpoint}`;
  let res = await fetch(finalUrl);
  res = await res.json();
  return res.result;
};

export default fetchDataApi;
