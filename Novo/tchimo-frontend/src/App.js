import React, { useContext } from 'react'

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import './App.css' 

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import List from './pages/Classes/List/List';
import Classroom from './pages/Classes/Classroom/Classroom';
import Join from './pages/Classes/Join/Join'
import Register from './pages/Classes/Register/Register'
import Members from './pages/Classes/Members/Members'

import { AuthContext, AuthProvider } from './contexts/AuthContext'

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
        !auth.isAuthenticated() ? (
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
        <UnauthenticatedRoutes />
      </Switch>
    </>
  ) 
} 

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <div className="wrapper">
            <AppRoutes />      
          </div>
        </div>
      </AuthProvider>
    </Router>
  ) 
}

export default App 
