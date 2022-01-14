const fetch = require("node-fetch");
const {WEATHER_API_KEY} = process.env;

exports.handler = async (event, context) => {
  const params = JSON.parse(event.body);
  const {text, units} = params;
  const regex = /^\d+$/g;
  const flag = regex.test(test) ? "zip" : "q";
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`;
  const encodeUrl = encodeURI(url);
  try {
    const dataStream = await fetch(encodeUrl);
    const jsonData = await dataStream.json();
    return {
      statusCode: 200,
      body: JSON.stringify(jsonData),
    };
  } catch (error) {
    return {
      statusCode: 422,
      body: error.stack,
    };
  }
};
