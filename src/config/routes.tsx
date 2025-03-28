import { RouteObject } from "react-router";
import App from "../App";
import CatalogPage from "App/pages/CatalogPage/CatalogPage";
import ProductPage from "App/pages/ProductPage/ProductPage";

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
        {
          path: '/products',
          element: <CatalogPage />
        },
        {
          path: '/products/:id',
          element: <ProductPage />
        }
      ]
  }
];