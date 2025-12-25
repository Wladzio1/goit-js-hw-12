import axios from 'axios';

const API_KEY = '53786038-2f78b187bec1188a9f35774b8';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching images from Pixabay');
  }
}
