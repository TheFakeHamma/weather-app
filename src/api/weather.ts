const API_KEY = "691446039335478b8e9171804242005";
const BASE_URL = "https://api.weatherapi.com/v1";

export const fetchWeather = async (location: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=6&aqi=no&alerts=no`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Weather data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in fetchWeather:", error);
    throw error;
  }
};
