import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';
const KEY = '39810851-2f095e470d39af6a9025ff75b';

export const fetchPhotos = async (query, page) => {
  const resp = await axios.get(`api/`, {
    params: {
      key: KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      page,
      per_page: 12,
    },
  });
  return resp;
};
