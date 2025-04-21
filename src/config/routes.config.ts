export const routes = {
  main: {
    mask: "/commerce/",
    create: () => "/commerce",
  },
  products: {
    mask: "/commerce/products",
    create: () => "/commerce/products",
  },
  productsWithCategory: {
    mask: "/commerce/products",
    create: (id: number) => `/commerce/products/?filterByCategoryId=${id}`,
  },

  product: {
    mask: "/commerce/products/:id",
    create: (id: string) => `/commerce/products/${id}`,
  },
  categories: {
    mask: "/commerce/categories",
    create: () => `/commerce/categories`,
  },
  about: {
    mask: "/commerce/about",
    create: () => `/commerce/about`,
  },
  cart: {
    mask: "/commerce/cart",
    create: () => `/commerce/cart`,
  },
  login: {
    mask: "/commerce/login",
    create: () => `/commerce/login`,
  },

}