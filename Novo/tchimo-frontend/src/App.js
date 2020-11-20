import React, { useContext } from 'react'

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import { ToastContainer } from 'react-toastify';

import './App.css' 

import Logo from './static/images/logo.svg'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import List from './pages/Classes/List/List'
import Classroom from './pages/Classes/Classroom/Classroom'
import Join from './pages/Classes/Join/Join'
import Register from './pages/Classes/Register/Register'
import Members from './pages/Classes/Members/Members'
import Notifications from './pages/Notifications/Notifications'

import { AuthContext, AuthProvider } from './contexts/AuthContext'
import { AuthFetchProvider } from './contexts/AuthFetchContext'

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="*">
      <p>404 - Not Found</p>
    </Route>
  </Switch>
) 

const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext) 

  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() ? (
          <>{children}</>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  ) 
} 

const AppRoutes = () => {
  return (
    <>
      <Switch>
        <AuthenticatedRoute exact path="/classes"> 
          <List />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/classes/join">
          <Join /> 
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/classes/register"> 
          <Register />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/classes/:code"> 
          <Classroom />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/classes/:code/members">
          <Members />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/notifications">
          <Notifications />
        </AuthenticatedRoute>
        <UnauthenticatedRoutes />
      </Switch>
    </>
  ) 
} 

const MobileFilter = ({ children, ...rest }) => {
  const isMobile = window.matchMedia("(max-width: 760px)").matches
  return (
    <>
        {isMobile ? (
          <>{children}</>
        ) : (
          <div className="notSupportedContainer">
            <img src={Logo} alt="Tchimo Icon" />
            <p className="notSupportedMessage">Infelizmente, esse dispositivo ainda não é suportado :(</p>
          </div>
        )}
    </>
  )
}

function App() {
  return (
    <MobileFilter>
      <Router>
        <AuthProvider>
          <AuthFetchProvider>
            <ToastContainer />
            <div className="app">
              <div className="wrapper">
                <AppRoutes />      
              </div>
            </div>
          </AuthFetchProvider>
        </AuthProvider>
      </Router>
    </MobileFilter>
  ) 
}

export default App 
