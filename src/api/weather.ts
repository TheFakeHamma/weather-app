const API_KEY = '691446039335478b8e9171804242005';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (location: string) => {
  const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=no`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
};
