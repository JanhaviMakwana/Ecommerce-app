import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withState } from './ecom-context';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import AddProduct from './components/AddProduct/AddProduct';
import Cart from './components/Cart/Cart';
import Orders from './Orders/Orders';
import Error from './Error/Error';
import * as actionTypes from './store/actionTypes';
import Auth from './Auth/Auth';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function PrivateRoutes({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />}
    />
  );
};

function PublicRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === false
        ? <Component {...props} />
        : <Redirect to="/" />}
    />
  );
};

class App extends React.Component {

  componentDidMount() {
    const user = localStorage.getItem('user');
    user && this.props.dispatch({ type: actionTypes.SET_AUTH_DATA, user: user });
    window.onunload = () => {
      localStorage.clear();
    }

  }



  render() {
    return (
      <div className="App">
        <Header />
        {this.props.state.error === null
          ? < Switch >
            <PublicRoute path="/auth" isAuthenticated={this.props.state.user ? true : false} component={Auth} />
            <PrivateRoutes path="/add-product" isAuthenticated={this.props.state.user ? true : false} component={AddProduct} />
            <PrivateRoutes path="/product/:id" isAuthenticated={this.props.state.user ? true : false} component={AddProduct} />
            <PrivateRoutes path="/cart" isAuthenticated={this.props.state.user ? true : false} component={Cart} />
            <PrivateRoutes path="/orders" isAuthenticated={this.props.state.user ? true : false} component={Orders} />
            <Route path="/" component={Home} />
          </Switch>
          : <Error />}
      </div>
    );
  }
}

export default withState(App);
