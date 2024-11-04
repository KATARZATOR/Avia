export const FETCH_TICKETS_REQUEST = 'FETCH_TICKETS_REQUEST';
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_TICKETS_FAILURE = 'FETCH_TICKETS_FAILURE';
export const SET_STOP = 'SET_STOP';

export const fetchTickets = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TICKETS_REQUEST });
    try {
      const searchIdResponse = await fetch(
        'https://aviasales-test-api.kata.academy/search'
      );
      const searchIdData = await searchIdResponse.json();
      const searchId = searchIdData.searchId;

      let stop = false;

      while (!stop) {
        try {
          const ticketsResponse = await fetch(
            `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
          );

          if (ticketsResponse.status === 500) {
            continue;
          }

          if (!ticketsResponse.ok) {
            throw new Error(`Ошибка: ${ticketsResponse.status}`);
          }

          const ticketsData = await ticketsResponse.json();

          if (ticketsData && Array.isArray(ticketsData.tickets)) {
            dispatch({
              type: FETCH_TICKETS_SUCCESS,
              payload: ticketsData.tickets,
            });
          }

          stop = ticketsData.stop;

          if (stop) {
            dispatch({ type: SET_STOP });
          }
        } catch (error) {
          console.error('Ошибка при загрузке билетов:', error);
        }
      }
    } catch (error) {
      dispatch({ type: FETCH_TICKETS_FAILURE, error: error.message });
    }
  };
};

export const setSortType = (sortType) => ({
  type: 'SET_SORT_TYPE',
  payload: sortType,
});

export const toggleFilter = (filter) => ({
  type: 'TOGGLE_FILTER',
  payload: filter,
});

export const toggleAll = () => ({
  type: 'TOGGLE_ALL',
});
