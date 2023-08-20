import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const middlwares = [logger];

const composedEhancers = compose(applyMiddleware(...middlwares));

export const store = createStore(rootReducer, undefined, composedEhancers);
