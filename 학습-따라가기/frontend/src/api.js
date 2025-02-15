import config from './config.js';

const { API_ENDPOINT } = config;

// TODO: REQUEST_ERROR 분리해서 작성해보기
const REQUEST_ERROR = {
  500: {
    msg: '요청 실패',
  },
};

const request = async (url) => {
  try {
    const result = await fetch(url);
    // console.dir(result.status);
    if (result.status === 200) {
      return result.json();
    } else {
      throw REQUEST_ERROR[result.status];
    }
  } catch (error) {
    alert(error.msg);
    return { data: null };
  }
};

const api = {
  fetchCats: (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },

  fetchCatsPage: (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&
      page=${page}`);
  },

  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },

  fetchCatDetail: (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};

export default api;
