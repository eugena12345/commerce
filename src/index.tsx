import './index.css'
import { routesConfig } from "./config/routes";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import './config/configureMobX';
import 'regenerator-runtime';
import 'whatwg-fetch';
import React from 'react';


const router = createBrowserRouter(routesConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(<RouterProvider router={router} />);

if(module.hot) {
  module.hot.accept();
}
