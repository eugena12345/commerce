export const routes = {
  main: {
    mask: "/",
    create: () => "/",
  },
  products: {
    mask: "/products",
    create: () => "/products",
  },
  productsWithCategory: {
    mask: "/products",
    create: (id: number) => `/products/?filterByCategoryId=${id}`,
  },

  product: {
    mask: "/products/:id",
    create: (id: string) => `/products/${id}`,
  },
  categories: {
    mask: "/categories",
    create: () => `/categories`,
  },
  about: {
    mask: "/about",
    create: () => `/about`,
  },
  cart: {
    mask: "/cart",
    create: () => `/cart`,
  },
  login: {
    mask: "/login",
    create: () => `/login`,
  },
  payment: {
    mask: "/payment",
    create: () => `/payment`,
  },
}