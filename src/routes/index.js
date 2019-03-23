import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import Test from './test';
import Profil from './Profil';
import Register from './Register';
import Login from './Login';
import Addprod from './Addprod';
import Product from './Product';
import Home from './Home';
import Cathegory from './Cathegory';
import Store from './Store';
import AllStore from './AllStore';
import About from './About';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      ))}
  />
);

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/test" exact component={Test} />
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} /> 
      <Route path="/login" exact component={Login} />
      <Route path="/about" exact component={About} />
      <PrivateRoute path="/profil" exact component={Profil} />
      <PrivateRoute path="/addproduct" exact component={Addprod} />
      <Route path="/product/cathegory/:cat" exact component={Cathegory} /> 
      <Route path="/product/:name/:id" exact component={Product} /> 
      <Route path="/product/:id" exact component={Product} /> 
      <Route path="/store/:id" exact component={Store} />
      <Route path="/allstore" exact component={AllStore} />                                                     
    </Switch>
  </BrowserRouter>
);
