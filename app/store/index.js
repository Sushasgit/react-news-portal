import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

// const store = createStore(reducer, applyMiddleware(thunk));

const store = compose(applyMiddleware(thunk))(createStore)(reducer);

export default store;
