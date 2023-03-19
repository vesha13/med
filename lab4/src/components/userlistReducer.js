import {USER_LIST} from "./actions";

const initialState = {
    userlist:[],

};

const listUSReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST:
      
      return {
        userlist: action.payload.map(user=> user[1].username),
       
      }
   
    default:
      return state;
  }
};

export default listUSReducer;