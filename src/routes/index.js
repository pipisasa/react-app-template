import React, {lazy} from 'react'
import { Redirect, Route } from 'react-router-dom'

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils'

// Dev pages
const FeatherIcons = lazy(()=>import('../pages/other/FeatherIcons'))

// base pages
const Home = lazy(()=>import('../pages/Home'))
const AboutUs = lazy(()=>import('../pages/AboutUs'))
// Auth pages
const Login = lazy(()=>import('../pages/auth/Login'))
const Logout = lazy(()=>import('../pages/auth/Logout'))
const Register = lazy(()=>import('../pages/auth/Register'))

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => {
    if (!isUserAuthenticated()) return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />
    if (roles && roles.indexOf(getLoggedInUser().role) === -1) return <Redirect to={{ pathname: '/' }} />
    return <Component {...props} />
  }}/>
)


// root routes
const rootRoute = {
  path: '/',
  exact: true,
  component: () => <Redirect to="/home" />,
  route: PrivateRoute,
}

const authRoutes = {
  path: '/account',
  name: 'Auth',
  children: [
    {
      path: '/account/login',
      name: 'Login',
      component: Login,
      route: Route,
    },
    {
      path: '/account/logout',
      name: 'Logout',
      component: Logout,
      route: Route,
    },
    {
      path: '/account/register',
      name: 'Register',
      component: Register,
      route: Route,
    },
  ],
}
const featherIconsRoute = {
  exact:true,
  path:'/icons',
  component: FeatherIcons,
  route: Route
}

const homeRoute = {
  name:'Home',
  path:'/home',
  exact:true,
  component: Home,
  route: PrivateRoute
}
const aboutUsRoute = {
  name:'Home',
  path:'/about-us',
  exact:true,
  component: AboutUs,
  route: PrivateRoute
}

const error404Route = {
  name: 'Error 404',
  component: () => <h1>Error 404</h1>,
  route: Route,
}
// flatten the list of all nested routes
const flattenRoutes = routes => {
  let flatRoutes = []
  routes = routes || []
  routes.forEach(item => {
    flatRoutes.push(item)
    if (typeof item.children !== 'undefined') {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)]
    }
  })
  return flatRoutes
}

// All routes
const allRoutes = [
  rootRoute,
  authRoutes,
  featherIconsRoute,

  homeRoute,
  aboutUsRoute,
]

// Insert Error404 page
allRoutes.push(error404Route)

const authProtectedRoutes = [
  homeRoute,
  aboutUsRoute,
]

const allFlattenRoutes = flattenRoutes(allRoutes)
export { allRoutes, authProtectedRoutes, allFlattenRoutes }
