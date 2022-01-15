// const WEATHER_API_KEY = "faf9aa1b52fc33a0599c634c8ee6035a";

export const setLocationObject = (locationObj, coordsObj) => {
  const {lat, lon, name, unit} = coordsObj;
  locationObj.setLat(lat);
  locationObj.setLon(lon);
  locationObj.setName(name);
  if (unit) {
    locationObj.setUnit(unit);
  }
};
export const getHomeLocation = () => {
  return localStorage.getItem("defaultWeatherLocation");
};

export const getWeatherFromCoords = async (locationObj) => {
  // const lat = locationObj.getLat();
  // const lon = locationObj.getLon();
  // const units = locationObj.getUnit();
  // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`;

  // // https://api.openweathermap.org/data/2.5/onecall?lat=19&lon=73&exclude=minutely,hourly,alerts&units=metric&appid=faf9aa1b52fc33a0599c634c8ee6035a

  // try {
  //   const weatherStream = await fetch(url);
  //   const weatherJson = await weatherStream.json();
  //   return weatherJson;
  // } catch (error) {
  //   console.error(error);
  // }

  const urlDataObj = {
    lat: locationObj.getLat(),
    lon: locationObj.getLon(),
    units: locationObj.getUnit(),
  };
  try {
    const weatherStream = await fetch("./.netlify/functions/get_weather", {
      method: "POST",
      body: JSON.stringify(urlDataObj),
    });
    const weatherJson = await weatherStream.json();
    return weatherJson;
  } catch (error) {
    console.error(error);
  }
};

export const getCoordsFromApi = async (entryText, units) => {
  // const regex = /^\d+$/g;
  // const flag = regex.test(entryText) ? "zip" : "q";
  // const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATHER_API_KEY}`;
  // // https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=faf9aa1b52fc33a0599c634c8ee6035a

  // const encodeUrl = encodeURI(url);
  // try {
  //   const dataStream = await fetch(encodeUrl);
  //   const jsonData = await dataStream.json();

  //   return jsonData;
  // } catch (err) {
  //   console.error(err.stack);
  // }

  const urlDataObj = {
    text: entryText,
    units: units,
  };
  try {
    const dataStream = await fetch("./.netilify/functions/get_coords", {
      method: "POST",
      body: JSON.stringify(urlDataObj),
    });
    const jsonData = await dataStream.json();
    return jsonData;
  } catch (error) {
    console.error(error);
  }
};

export const cleanText = (text) => {
  const regex = / {2,}/g;
  const entryText = text.replaceAll(regex, " ").trim();
  return entryText;
};
