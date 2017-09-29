import { combineReducers } from 'redux';
import LoginReducer from './login_reducer';
import WeatherReducer from './reducer_weather';

const rootReducer = combineReducers({
  authenticated: LoginReducer,
  weather: WeatherReducer
});

export default rootReducer;
