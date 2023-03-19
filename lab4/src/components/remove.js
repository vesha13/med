import {  REMOVE_FROM_CHART} from "./actions"

const removeFromChart = (dispatch) => (item) =>{
    dispatch( {
      type: REMOVE_FROM_CHART,
      payload: item,
    })
  }
  
  export default removeFromChart; 
  