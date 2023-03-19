import { USER_LIST } from "./actions"

const addUserList = (userlist) => {
  return {
    type: USER_LIST,
    payload: userlist,
  }
}


export default addUserList; 
