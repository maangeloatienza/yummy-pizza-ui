import React, {useState, useEffect} from 'react';
import Toast from './../../utils/Toast';

import { getToken, getUser } from '../../utils/Commons';
import { getUserCart, updateCart } from './../../api/apiCall';


function Checkout(props){

    const [cart, setCart] = useState([]);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [charge, setCharge] = useState(0)
    // const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        getCartItems();
    },[]);

    const getCartItems = () => {

        let params = getToken() ? `user=${getUser().id}` : `guest=${localStorage.getItem('guest')}`;

        getUserCart(params).then((cart) => {
            setCart(cart.data);
            setCount(cart.count);
            setTotal(cart.total);
            setCharge(50);

        });
    }

    const onUpdate = (cartId, quantity) => {
        updateCart(`${cartId}`, {
            quantity: quantity
        }).then(response => {
            let data = response;

            if(data.success){
                getCartItems();

                Toast(data);
            }
        })
    }


    const onAdd = (event) => {
        event.preventDefault();
        
        console.log('id', event.currentTarget.id)
        console.log('value', event.currentTarget.value)
        onUpdate(event.currentTarget.id, parseInt(event.currentTarget.value)+1);
 
    }

    const onDeduct = (event) => {
        event.preventDefault();

        console.log('id', event.currentTarget.id)
        console.log('value', event.currentTarget.value)
        onUpdate(event.currentTarget.id, parseInt(event.currentTarget.value)-1);
  


    }




    return  <div>
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Your cart</span>
                    <span className="badge badge-secondary badge-pill">{count}</span>
                </h4>
                    <ul className="list-group mb-3 text-left">
                    {
                        cart ? cart.map((item,index)=>{

                            return  <> 
                                        <li className="list-group-item d-flex justify-content-between lh-condensed" key={item.id}>
                                            <div>
                                                <h6 className="my-0">{item.name}</h6>
                                                {/* <small className="text-muted">x{item.quantity}</small> */}
                                                <div className={'form-row'}>
                                                    <div className='col-2 px-0'>
                                                        <button
                                                            className='btn btn-xs btn-danger form-control mx-0'
                                                            key={index}
                                                            id={item.id}
                                                            value={item.quantity}
                                                            onClick={(event) => {
                                                                onDeduct(event);
                                                            }}>
                                                            <i className="fa fa-minus"></i>
                                                        </button>


                                                    </div>

                                                    <div className='col-2 px-0'>
                                                        <input type='number' value={item.quantity} className='form-control  text-center' disabled={true}/> 
                                                    </div>

                                                    <div className='col-2 px-0'>
                                                        <button
                                                            className='btn btn-xs btn-success form-control mx-0 width-50'
                                                            key={item.id}
                                                            id={item.id}
                                                            value={item.quantity}
                                                            onClick={(event,)=>{
                                                                onAdd(event);
                                                            }}>
                                                                <i className="fa fa-plus"></i>
                                                        </button>

                                                    </div>
                                                    <div className='col-6 text-right'>
                                                        <strong className="text-muted">&#8369; {item.subtotal}</strong>

                                                    </div>
                                                </div> 
                                            </div>
                                        </li>
                                    </>
                            })
                            : 
                            <li className="list-group-item d-flex justify-content-between lh-condensed">Empty Cart</li>
                    }
                    {
                        cart ?  <li className="list-group-item d-flex justify-content-between">
                                    <span>Delivery charge </span>
                                    <strong className="text-muted">&#8369; {charge}</strong>
                                </li> : ''
                    }
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total </span>
                            <strong>&#8369; {total+charge||0.0}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total USD </span>
                            <strong>&#36; {cart?((total + charge ) / 50.61).toFixed(2):0 }</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total EURO</span>
                            <strong>&euro; {cart?((total  + charge) / 55.66).toFixed(2):0 }</strong>
                        </li>
                    </ul>
            </div>
}

export default Checkout;