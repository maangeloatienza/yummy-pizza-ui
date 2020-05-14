import React,{Component,useState,useEffect} from 'react';
import {withGlobalState} from 'react-globally';

import { getToken, getUser } from '../../utils/Commons';
import { getUserCart, updateCart } from './../../api/apiCall';


import CheckoutForm from './../forms/CheckoutForm';
import Checkout from './Checkout';


function Cart (props){

    const [cart,setCart] = useState([]);

    useEffect(()=>{
        getCartItems();
    },[]);

    const getCartItems = () => {

        let params = getToken() ? `user=${getUser().id}` : `guest=${localStorage.getItem('guest')}`;

        getUserCart(params).then((cart) => {
            setCart(cart.data);
            props.setGlobalState({
                badge: cart.count
            })
        });
    }

    return  <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-5 col-lg-5">
                        <Checkout/>
                    </div>
                    <div className='col-sm-12 col-md-7 col-lg-7 '>                        
                        <CheckoutForm cart={cart} />
                    </div>

                </div>
            </div>
    
}


export default withGlobalState(Cart);