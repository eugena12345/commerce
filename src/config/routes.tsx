import { Navigate, RouteObject } from "react-router";
import App from "../App";
import CatalogPage from "App/pages/CatalogPage/CatalogPage";
import ProductPage from "App/pages/ProductPage/ProductPage";
import {routes} from './routes.config';

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