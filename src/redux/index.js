import { actions } from "./actions";

const INITIAL_STATE = {
  products: [],
  isLoading: false,
  productsCart: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.setProducts:
      return {
        ...state,
        products: action.payload
      };

    case actions.setIsLoading:
      return {
        ...state,
        isLoading: action.payload
      };

    case actions.setProductsCart:
      return {
        ...state,
        productsCart: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
