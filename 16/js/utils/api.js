const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = async (route, method = Method.GET, body = null) => {
  const response = await fetch(`${BASE_URL}${route}`, { method, body });

  if (!response.ok) {
    throw new Error();
  }

  return await response.json();
};

const getPhotos = () => load(Route.GET_DATA);

const uploadNewPhoto = (body) => load(Route.SEND_DATA, Method.POST, body);

export { getPhotos, uploadNewPhoto };
