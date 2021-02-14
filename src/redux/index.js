import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import rpm from "redux-promise-middleware";

import indexReducer from "./reducers/";

const enhancers = applyMiddleware(rpm, logger);

const storeRedux = createStore(indexReducer, enhancers);

export default storeRedux;