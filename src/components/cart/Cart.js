import React,{Component,useState,useEffect} from 'react';
import {withGlobalState} from 'react-globally';

import { getToken, getUser } from '../../utils/Commons';
import { getUserCart, updateCart } from './../../api/apiCall';


import CheckoutForm from './../forms/CheckoutForm';
import Checkout from './Checkout';

// class Cart extends Component{
//     constructor(props){
//         super(props);

//         this.state = {
//             cart: [],
//             count : 0,
//             total : 0.0,
//             charge : 50,
//             user : null
//         }

//         this.getCartItems = this.getCartItems.bind(this);
//     }

//     componentDidMount(){
//         this.getCartItems();
//     }

//     getCartItems(){
        
//         let params = getToken() ? `user=${getUser().id}` : `guest=${localStorage.getItem('guest')}`;

//         getUserCart(params).then((cart) => {
//             this.setState({ cart: cart.data, total : cart.total, count : cart.count, charge : 50 }
//         )});
//     }
//     render(){
//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-sm-12 col-md-4 col-lg-4">
//                         <Checkout cart={this.state.cart} total={this.state.total} count={this.state.count} charge={this.state.charge}/>
//                     </div>
//                     <div  className='col-sm-12 col-md-8 col-lg-8 '>
//                         {/* <CartItem cart={this.state.cart} total={this.state.total}/> */}
//                         {
//                             <CheckoutForm cart={this.state.cart} />
//                         }
                        
//                     </div>
                    
//                 </div>
//             </div>
//         )
//     }
// }

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
                        {/* <CartItem cart={this.state.cart} total={this.state.total}/> */}
                        {
                            <CheckoutForm cart={cart} />
                        }

                    </div>

                </div>
            </div>
    
}


export default withGlobalState(Cart);