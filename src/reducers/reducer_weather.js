import { FETCH_WEATHER } from '../actions/index.js';

export default function(state = [], action) {
  // console.log('Action received', action);
  // REMEMBER TO KEEP THIS STATE IMMUTABLE... VERRRRRYYYY IMMMMPOOORRTAAANNNTT
  // NEVER SET STATE BY = OR ANYTHING LIKE THAT... NEVER MANIPULATE ALWAYS RETURN NEW INSTANCE
  // CONCAT DOESN'T SEND YOU OR MUTATE THE INITIAL STATE BUT CREATES A NEW STATE AND
  // CONCATS THE NEW STATE WITH IT
  switch (action.type) {
    case FETCH_WEATHER:

      // return state.concat([action.payload.data]);
      if (typeof(action.payload.data) == "object"){
        // console.log('yes');
        return [action.payload.data, ...state];
      } else {
        // console.log('no');
        return state;
      }
      
      break;
  }
  return state;
}
