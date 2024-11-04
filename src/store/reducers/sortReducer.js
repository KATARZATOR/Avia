const initialState = 'CHEAPEST';

const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SORT_TYPE':
      return action.payload;
    default:
      return state;
  }
};

export default sortReducer;
