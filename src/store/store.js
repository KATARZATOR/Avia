import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import sortReducer from './reducers/sortReducer';
import filterReducer from './reducers/filterReducer';
import ticketsReducer from './reducers/ticketsReducer';

const rootReducer = combineReducers({
  sort: sortReducer,
  filters: filterReducer,
  tickets: ticketsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
