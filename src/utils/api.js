import axios from 'axios';

async function axiosFetchPictures(query, currentPageNum, per_page) {
  const hostURL = 'https://pixabay.com/api/';

  const API_KEY = '31408282-c2e36d8dbb4ab0017da4fad76';

  const searchParams = {
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPageNum,
    per_page,
  };

  const url = `${hostURL}?key=${API_KEY}&q=${searchParams.q}&page=${currentPageNum}&per_page=${per_page}`;

  const { data } = await axios.get(url);
  return data;
}

export default axiosFetchPictures;
