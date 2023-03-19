import { PRODUCT_LIST } from "./actions"

const addToChart = (list) => {
  return {
    type: PRODUCT_LIST,
    payload: list,
  }
}


export default addToChart; 