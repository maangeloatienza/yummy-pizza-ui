import React, {useState,useEffect} from 'react';
import {getProduct} from './../../api/apiCall';
import { generate } from '../../utils/Generator';
import { addCart, getUserCart } from './../../api/apiCall';
import { getToken, getUser } from '../../utils/Commons';
import { withGlobalState } from 'react-globally'
import { Toast, CusToast } from './../../utils/Toast';

const ProductView = (props) => {

    const [product,setProduct] = useState([]);
    let id = props.match.params.id;
    let [quantity, setQuantity] = useState('');
    let [guest_user, setGuest] = useState(null);
    let [user, setUser] = useState(null);

    let body = {};

    useEffect(()=>{
        fetchProduct();
        !getToken() && localStorage.getItem('guest') ? setGuest(localStorage.getItem('guest')) : localStorage.setItem('guest', generate());
        setUser(getToken() ? getUser() : []); 
    },[]);

    const addToCart = (event) => {
        event.preventDefault();

        body.product_id = product.id;
        body.quantity = parseInt(quantity) || 0;

        if (body.quantity > 0) {
            addCart(`user=${getToken() ? body.user_id = user.id : body.guest_user = guest_user}`, body).then(response => {
                let params = getToken() ? `user=${body.user_id}` : `guest=${body.guest_user}`;
                getUserCart(params).then((cart) => {

                    props.setGlobalState({
                        badge: cart.count
                    })
                    setQuantity(0)

                    Toast(response);

                });
            });
        }
        if (body.quantity <= 0 || body.quantity === null) CusToast('Oops! No quantity added', false)

    }

    const onFocus = (event) => {
        setQuantity('');
    }

    const onChangeQuantity = (event) => {
        setQuantity(event.target.value)
    }

    const fetchProduct = () =>{
        getProduct(id).then(response=>{
            let data = response[0];
            console.log('PRODUCT VIEW',response);

            setProduct(data);
        });
    }

    return (
        <div className="row text-white">
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                <img src={product.image} className='img-fluid mx-auto d-block col-8'/>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                <h3 className='font-weight-bolder '>{product.name}</h3>

                <div className='row mt-3'>
                    <span className='col-4 text-left'>&#8369;{product.price}</span>
                    <span className='col-4 text-left'>&#36;{(product.price / 50.61).toFixed(2)}</span>
                    <span className='col-4 text-left'>&euro;{(product.price / 55.66).toFixed(2)}</span>
                </div>
                 
                <div className='mt-5 mb-5'>
                     {
                        product.description ?  product.description : 'No description!'
                     }
                </div>
                
                <div className='form-row'>
                    <div className='col-4'>
                        <input
                            type='number'
                            className='form-control mb-2'
                            value={quantity}
                            onFocus={onFocus}
                            onChange={onChangeQuantity} />
                    </div>
                    <div className='col-8'>
                        <button className='btn btn-success text-white form-control' onClick={addToCart}>Order</button>
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default withGlobalState(ProductView);