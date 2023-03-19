import { SELECT } from "./actions"

const onSelect = (select) => {
  return {
    type: SELECT,
    payload: select,
  }
}


export default onSelect; 