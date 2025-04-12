import { Navigate, RouteObject } from "react-router";
import App from "../App";
import CatalogPage from 'pages/CatalogPage'
import ProductPage from 'pages/ProductPage'
import {routes} from './routes.config';
import React from "react";

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
        {
          element: <CatalogPage />,
          index: true
        },
        {
          path: routes.product.mask,
          element: <ProductPage />
        }
      ]
  },
  {
    path: "*",
    element: <Navigate to={routes.main.create()} replace />,
  },
];