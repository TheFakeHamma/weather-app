import axios from 'axios';

const GEO_DB_API_KEY = 'e72d0198a0msh9b892651265db62p193b1ajsn1647aab941ce';
const GEO_DB_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

export const fetchCitySuggestions = async (query: string) => {
  try {
    const response = await axios.get(GEO_DB_API_URL, {
      headers: {
        'X-RapidAPI-Key': GEO_DB_API_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
      params: {
        namePrefix: query,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    throw error;
  }
};
