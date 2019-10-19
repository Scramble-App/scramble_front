import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {rootReducer} from './ducks'
import {rootSaga} from "./ducks";

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({ }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
)

const store = createStore(
  rootReducer,
  enhancer
);

sagaMiddleware.run(rootSaga)
// TODO handle all errors

export default store
