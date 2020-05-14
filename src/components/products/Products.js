import React, {Component} from 'react';
import ProductList from './ProductList';
import ProductCarousel from './../carousel/ProductCarousel';

import { getToken,getUser } from '../../utils/Commons';
import { getProducts, getUserCart} from './../../api/apiCall';
import { withGlobalState } from 'react-globally'
class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      products : []
    }
  }
  
  componentDidMount(){
    this.getProducts();
  }

  getProducts(){
    getProducts().then((products) => {
      let params = getToken() ? `user=${getUser().id}` : `guest=${localStorage.getItem('guest')}`;
      getUserCart(params).then((cart) => {
        this.props.setGlobalState({
          badge: cart.count
        })
      });
      this.setState({ products: products })
    
    });
  }

  render(){
    return (
      <div className="container">
          <ProductCarousel />
          <div className="row">
        
          <ProductList products={this.state.products} />
        </div>
      </div>
    )
  }
  
}

export default withGlobalState(Products);
