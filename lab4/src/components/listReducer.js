import {PRODUCT_LIST} from "./actions";

const initialState = {
list:[],

};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST:
      
      return {
       list: action.payload.map(recipe=> recipe[1].name),
       
      }
   
    default:
      return state;
  }
};

export default listReducer;