import axios from 'axios';

export const SET_LOGIN = 'SET_LOGIN';
export const FETCH_WEATHER = 'FETCH_WEATHER';
export const EMPTY_WEATHER = 'EMPTY_WEATHER';



const API_KEY = '69fd287a66b890c348d37fe6bc772f13';
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;


export function fetchWeather(city) {
  const URL = `${ROOT_URL}&q=${city}`;
  const request = axios.get(URL);

  // console.log('Request:', request);
  return {
    type: FETCH_WEATHER,
    payload: request,
  };
}

export function emptyWeather() {
  // const URL = `${ROOT_URL}&q=${city}`;
  // const request = axios.get(URL);

  // console.log('Request:', request);
  return {
    type: EMPTY_WEATHER,
    payload: [],
  };
}


export function setLogin(login, callback) {
    // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
    // console.log('login cred', login);
    callback();
    return {
      type: SET_LOGIN,
      payload: login,
    };
  }