import React, {useState, useEffect} from 'react';
import { generate } from '../../utils/Generator';
import { addCart, getUserCart } from './../../api/apiCall';
import { getToken,getUser } from '../../utils/Commons';
import { withGlobalState } from 'react-globally'

import {Toast, CusToast} from './../../utils/Toast';



function ProductCard(props) {
  const {product } = props;
  let [quantity, setQuantity] = useState(0);
  let [guest_user, setGuest] = useState(null);
  let [user, setUser] = useState(null);

  
  let body = {};

  useEffect(()=>{
    !getToken() && localStorage.getItem('guest') ? setGuest(localStorage.getItem('guest')) : localStorage.setItem('guest', generate());
    setUser(getToken() ? getUser() : []); 
  },[]);

  const addToCart=(event)=> {
    event.preventDefault();

    
    
    body.product_id = product.id;
    body.quantity = parseInt(quantity) || 0;
  
   if(body.quantity > 0){
      addCart(`user=${getToken() ? body.user_id = user.id : body.guest_user = guest_user}`,body).then(response=>{
        let params = getToken() ? `user=${body.user_id}` : `guest=${body.guest_user}`;
        getUserCart(params).then((cart) => {
          
          props.setGlobalState({
            badge : cart.count
          })
          setQuantity(0)

          Toast(response);

        });
      });
    }
    if (body.quantity <= 0 || body.quantity === null)CusToast('Oops! No quantity added',false)
    
  }

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value)
  }

  return <div className='col-xs-12 cold-sm-6 col-md-4 col-lg-3 my-2'>
          <div className='card' key={product.id}>  
            <div className='card-title font-weight-bolder fredoka-cursive m-auto'>{product.name}</div>
            <img className='card-img-top img-fluid' style={{height:'180px'}} src={product.image} alt={product.name}/>
            <div className='card-body'>
                <div>
                  {/* <h5 className="card-title fredoka-cursive text-center">{product.name}</h5> */}
                  <p className='card-text text-right font-weight-bolder'>&#8369; {product.price}</p>
                </div>
              {
                product.availability ?
                <div className='text-center'>
                  <div className='form-row'>
                    <div className='col'>
                      <input type='number' className='form-control mb-2' value={quantity} onChange={onChangeQuantity} />
                    </div>
                    <div className='col'>
                      <button className='btn btn-success text-white form-control' onClick={addToCart}>Order</button>
                    </div>
                  </div>
                </div>
                :
                <p className='text-danger text-center'>Not available</p>
              }
            </div>
          </div>
        </div>
    
}

export default withGlobalState(ProductCard);