import React from 'react';

function CartItem(props){
    let {cart,total} = props;
    
    return  <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => {
                                return <tr key={item.id}>
                                    <td>
                                        <img src={item.image} alt={item.name} style={{ height: '50px', width: '75px' }} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
}

export default CartItem;
