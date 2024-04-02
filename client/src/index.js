// index.js

import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes.js";

import "./index.css";

import store from './store'
import { Provider } from 'react-redux'

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <RouterProvider 
    router={router}
    />
  </Provider>
);