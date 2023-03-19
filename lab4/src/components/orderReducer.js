import { ORDER} from "./actions";

const initialState = {
pk: '',
product: '',
auth_user: '',
quantity: '',
price: '',
address: '',
status: ''

};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER:
      
      return {
        pk:  action.payload.pk,
        product: action.payload.product,
        auth_user: action.payload.auth_user,
        quantity: action.payload.quantity,
        price: action.payload.price,
        address: action.payload.address,
        status: action.payload.status,
      }
   
    default:
      return state;
  }
};

export default orderReducer;