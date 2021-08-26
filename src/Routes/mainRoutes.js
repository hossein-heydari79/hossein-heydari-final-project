import React from 'react'
const HomePage = React.lazy(() => import("../Pages/HomePage/HomePage"))
const Login = React.lazy(() => import("../Pages/Login/Login"))
const Category = React.lazy(() => import("../Pages/Category/Category"))
const ProductDetails = React.lazy(() => import("../Pages/ProductDetails/ProductDetails"))
const CartPage = React.lazy(() => import("../Pages/CartPage/CartPage"))
const Register = React.lazy(() => import("../Pages/Register/Register"))
const NotFound = React.lazy(() => import("../Pages/404Page/NotFound"))
const routes = [
    { path: '/homepage', exact: true, Component: HomePage, loginRequired: false },
    { path: '/login', exact: true, Component: Login, loginRequired: false },
    { path: '/register', exact: true, Component: Register, loginRequired: false },
    { path: '/category:name', exact: false, Component: Category, loginRequired: false },
    { path: '/productdetails:id', exact: false, Component: ProductDetails, loginRequired: false },
    { path: '/cart', exact: false, Component: CartPage, loginRequired: true },
    { path: '*', exact: false, Component: NotFound, loginRequired: false },
]
export default routes;