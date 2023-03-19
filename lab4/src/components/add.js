import { ADD_TO_CHART } from "./actions"

const addToChart = (item) => {
  return {
    type: ADD_TO_CHART,
    payload: item,
  }
}


export default addToChart; 
