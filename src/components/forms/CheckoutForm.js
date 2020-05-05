import React,{Component, useRef} from 'react';
import { withRouter } from 'react-router-dom';
import { getToken, getUser } from '../../utils/Commons';
import {checkout} from './../../api/apiCall';
import Toast from './../../utils/Toast';

class CheckoutForm extends Component{
    
    constructor(props){
        super(props);

        this.onCheckout = this.onCheckout.bind(this);
        
    }

    onCheckout(event){
        event.preventDefault();
        
        let body = {};
        let verifiedUser = getToken() ? getUser(): [];
        
        
        body.first_name = this.firstNameInput.value;
        body.last_name = this.lastNameInput.value;
        body.delivery_address = this.deliveryAddressInput.value;
        body.contact_number = this.contactNumberInput.value;
        body.user_id = getToken() ? verifiedUser.id : localStorage.getItem('guest');
        body.delivery_cost = 50.0;
        
        checkout(body).then(response=>{
            if(response.success) {
                Toast(response);
                window.location.href = '/cart/checkout-success';
            };

        })
        
    }

    render(){
        return  (
            <div>
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Billing information</span>
                    
                </h4>
                <form onSubmit={this.onCheckout}>
                    
                    <div className="form-row mb-2">
                        <div className="col">            
                            <input type="text" className='form-control' ref={firstNameInput => this.firstNameInput = firstNameInput} placeholder='First name' required autoFocus />
                        </div>
                        <div className="col">                  
                            <input type="text" className='form-control' ref={lastNameInput => this.lastNameInput = lastNameInput} placeholder='Last name' required autoFocus />
                        </div>
                    </div>

                    <div className="form-row mb-2">
                        <div className="col">
                            <input type="text" className='form-control' ref={contactNumberInput => this.contactNumberInput = contactNumberInput} placeholder='Contact number' required autoFocus />
                        </div>
                    </div>

                    <div className="form-row mb-3">
                        <div className="col">
                            <input type="text" className='form-control' ref={deliveryAddressInput => this.deliveryAddressInput = deliveryAddressInput} placeholder='Delivery address' required autoFocus />
                        </div>
                    </div>

                    <button className="mt-2 btn btn-md btn-primary btn-block" >Checkout</button>

                </form>
            </div >
        )
    }

}

// function CheckoutForm(props) {
//     let deliveryAddressInput = useRef(null);
//     let firstNameInput = useRef(null);
//     let lastNameInput = useRef(null);
    
//     const onCheckout = (event) => {
//         event.preventDefault();

//         let body = {};
//         let verifiedUser = getToken() ? getUser() : [];
//         console.log(lastNameInput)

//         body.first_name = firstNameInput.current.focus();;
//         body.last_name = lastNameInput.current.focus();;
//         body.delivery_address = deliveryAddressInput.current.focus();;
//         body.user_id = getToken() ? verifiedUser.id : localStorage.getItem('guest');
//         body.delivery_cost = 50.0;

//         checkout(body).then(response => {

//             if (response.success) {
//                 this.props.history.push('/cart/checkout-success')
//                 Toast(response);
//             };

//         })

//     }

    
//     return <div>
//                 <h4 className="d-flex justify-content-between align-items-center mb-3">
//                     <span className="text-muted">Billing information</span>

//                 </h4>
//                 <form onSubmit={onCheckout}>

//                     <div className="form-row mb-4">
//                         <div className="col">
//                             <input type="text" className='form-control' ref={firstNameInput => firstNameInput = firstNameInput} placeholder='First name' required autoFocus />
//                         </div>
//                         <div className="col">
//                             <input type="text" className='form-control' ref={lastNameInput => lastNameInput = lastNameInput} placeholder='Last name' required autoFocus />
//                         </div>
//                     </div>

//                     <div className="form-row mb-4">
//                         <div className="col">
//                             <input type="text" className='form-control' ref={deliveryAddressInput => deliveryAddressInput = deliveryAddressInput} placeholder='Delivery address' required autoFocus />
//                         </div>
//                     </div>


//                     <button className="mt-2 btn btn-sm btn-primary btn-block" >Checkout</button>

//                 </form>
//             </div >
   

// }


export default withRouter(CheckoutForm);