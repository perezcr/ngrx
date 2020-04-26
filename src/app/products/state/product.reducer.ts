// First parameter: State from our store
// Second parameter: Action to be processed
export function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: action.payload,
      };
    // If none of the action types match the dispatched action our default case returns the original state to the store
    default:
      return state;
  }
}
