import {
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
  SET_STOP,
} from '../actions';

const initialState = {
  tickets: [],
  loading: true,
  error: null,
  stop: false,
};

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKETS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TICKETS_SUCCESS:
      return { ...state, tickets: [...state.tickets, ...action.payload] };
    case FETCH_TICKETS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case SET_STOP:
      return { ...state, loading: false, stop: true };
    default:
      return state;
  }
};

export default ticketsReducer;
