import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import reducer from '../reducers';

const initialState = {
  data: null,
};

const store = createStore(reducer, initialState, applyMiddleware(Thunk));

export default store;
