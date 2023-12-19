import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import { addReducer, store } from "./store";
import { counterSliceReducer } from "./slices/counter.slice";
import Counter from "./components/Counter/Counter";

// inject reducer
addReducer("counter", counterSliceReducer);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Counter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

