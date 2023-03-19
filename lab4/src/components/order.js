import { ORDER } from "./actions"

const addOrder = (order) => {
  return {
    type: ORDER,
    payload: order,
  }
}


export default addOrder; 
