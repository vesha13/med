//import { render } from "react-dom";
import { ADD_TO_CHART, REMOVE_FROM_CHART} from "./actions";

const initialState = {
  value: 0,
  userValue: [],
  sum: 0,
  name: ''
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CHART:
      //state.userValue.map((item)=>{if (item.name=action.payload.name) item.total=item.total+1})
      return {
        userValue:  state.userValue.concat(action.payload),
        value: state.userValue.push(action.payload),
        sum: state.sum+ parseInt(action.payload.price),
        name: action.payload.name
      }
    case REMOVE_FROM_CHART:
      
      return { 
        userValue:  state.userValue.filter(item => item.name !==action.payload.name), 
        value: state.userValue.filter(item => item.name !==action.payload.name).length,
        sum:  state.sum - parseInt(action.payload.price)*state.userValue.filter(item => item.name ===action.payload.name).length,
        name: ''
        //sum: sum.state - action.payload.price
      }
   
    default:
      return state;
  }
};

export default itemReducer;