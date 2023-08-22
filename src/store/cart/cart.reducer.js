import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INTIAL_STATE = {
  toggleCart: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INTIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_TOGGLE_CART:
      return {
        ...state,
        toggleCart: payload,
      };

    default:
      return state;
  }
};
