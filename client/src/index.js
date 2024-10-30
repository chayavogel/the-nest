import * as React from "react";
import ReactDOM from "react-dom/client";
//Routing components
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//My defined routes
import routes from "./routes.js";
//My custom scss
import './scss/custom.scss';
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