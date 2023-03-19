import { SELECT} from "./actions";

const initialState = {
pk: '',
  name: '',
  disease: '',
  price: '',
  prescript: false,
};

const selectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT:
      
      return {
        pk:  action.payload.pk,
        disease: action.payload.disease,
        price: action.payload.price,
        name: action.payload.name,
        prescript: action.payload.prescript
      }
   
    default:
      return state;
  }
};

export default selectReducer;