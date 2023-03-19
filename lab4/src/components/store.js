import { useReducer } from "react";
import {
    combineReducers,
    compose,
    legacy_createStore
  } from "redux";
  
  import itemReducer from './itemReducer';
  import userReducer  from './userReducer';
  import selectReducer  from './selectReducer';
  import orderReducer from "./orderReducer";
  import listReducer from "./listReducer";
  import listUSReducer from "./userlistReducer"
  const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  
  function configureStore() {
    return legacy_createStore(
      combineReducers({
        item: itemReducer,
        user: userReducer,
        select:selectReducer,
        order: orderReducer,
        list: listReducer,
        userlist: listUSReducer
      }),
      undefined,
      compose(
        ReactReduxDevTools,
      )
    );
  }
  
  export default configureStore;