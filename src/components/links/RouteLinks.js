import React, {Component} from 'react';
import { Route,Switch } from 'react-router-dom';

import Products from './../products/Products';
import Login from './../forms/Login';
import Logout from './../forms/Logout';
import Register from './../forms/Register';
import Cart from './../cart/Cart';
import CheckoutSuccess from './../cart/CheckoutSuccess';
import Transactions from './../transactions/Transactions';
import TransactionItem from './../transactions/TransactionItem';


class RouteLinks extends Component {

  render(){
    return (
      <div>
        <Switch>
          <Route exact path='/' component ={Products}/>
          <Route path='/login' component ={Login}/>
          <Route path='/logout' component={Logout} />
          <Route path='/register' component={Register} />
          <Route exact path='/cart' component={Cart} />
          <Route path='/cart/checkout-success' component={CheckoutSuccess}/>
          <Route exact path='/transactions/' component={Transactions} />
          <Route path='/transactions/:id' component={TransactionItem} />

        </Switch>
      </div>
    )
  }
}

export default RouteLinks;