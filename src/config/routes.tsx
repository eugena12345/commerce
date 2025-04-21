import { Navigate, RouteObject } from "react-router";
import App from "../App";
import CatalogPage from "App/pages/CatalogPage/CatalogPage";
import ProductPage from "App/pages/ProductPage/ProductPage";
import { routes } from './routes.config';
import CategoryPage from "App/pages/CategoryPage/CategoryPage";
import AboutPage from "App/pages/AboutPage/AboutPage";
import CartPage from "App/pages/CartPage/CartPage";
import LoginPage from "App/pages/LoginPage";

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
      },
      {
        path: routes.categories.mask,
        element: <CategoryPage />
      },
      {
        path: routes.productsWithCategory.mask,
        element: <CatalogPage />
      },
      {
        path: routes.about.mask,
        element: <AboutPage />
      },
      {
        path: routes.cart.mask,
        element: <CartPage />
      },
      {
        path: routes.login.mask,
        element: <LoginPage />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to={routes.main.create()} replace />,
  },
];