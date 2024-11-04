const initialState = {
  all: false,
  nonStop: false,
  oneStop: false,
  twoStops: false,
  threeStops: false,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_FILTER': {
      const newState = {
        ...state,
        [action.payload]: !state[action.payload],
      };

      const allFiltersSelected =
        newState.nonStop &&
        newState.oneStop &&
        newState.twoStops &&
        newState.threeStops;
      newState.all = allFiltersSelected;

      return newState;
    }

    case 'TOGGLE_ALL': {
      const newValue = !state.all;
      return {
        all: newValue,
        nonStop: newValue,
        oneStop: newValue,
        twoStops: newValue,
        threeStops: newValue,
      };
    }

    default:
      return state;
  }
};

export default filterReducer;
