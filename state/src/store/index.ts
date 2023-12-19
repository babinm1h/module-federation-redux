import { combineReducers, configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: {} });

let dynamicReducers: any = {};

const addReducer = (name: string, currentReducers: any) => {
  dynamicReducers[name] = currentReducers;

  const reducers = combineReducers({
    ...dynamicReducers,
  });

  store.replaceReducer(reducers);
};

export { store, addReducer };
