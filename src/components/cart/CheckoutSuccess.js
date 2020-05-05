import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import { getToken, getUser } from '../../utils/Commons';
import {getTransactions} from './../../api/apiCall';

class CheckoutSuccess extends Component{
    constructor(props){
        super(props);

        this.state = {
            transactions: []
        }
        
    }

    componentDidMount(){
        this.getTransactions();
    }

    getTransactions(){
        let user = getToken() ? getUser().id : localStorage.getItem('guest');

        getTransactions(`user=${user}&sort_id=created&sort_desc=DESC&limit=1`).then(cart=>{
            this.setState({
                transactions : cart.data[0]
            })
        });
    }

    goBack(event){
        event.preventDefault();
        window.location.href= '/';
    }

    render(){
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12 col-md-8 col-lg-8 mx-auto'>
                        <div className='text-center'>
                            <h3>Thank you!</h3>
                            <p className='lead'>Your order will now be processed.</p>
                            
                            
                            <div className='col-12'>
                                <ul className='list-group mb-3'>
                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div className='text-left'>
                                            <h6 className="my-0 font-weight-bolder">Reference number </h6>
                                        </div>
                                        <span className="text-muted text-right">{this.state.transactions.code}</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div className='text-left'>
                                            <h6 className="my-0 font-weight-bolder">Billed to </h6>
                                        </div>
                                        <span className="text-muted text-right">{this.state.transactions.first_name + ' ' + this.state.transactions.last_name}</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div className='text-left'>
                                            <h6 className="my-0 font-weight-bolder">Contact details </h6>
                                        </div>
                                        <span className="text-muted text-right">{this.state.transactions.contact_number}</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div className='text-left'>
                                            <h6 className="my-0 font-weight-bolder">Delivery address </h6>
                                        </div>
                                        <span className="text-muted text-right">{this.state.transactions.delivery_address}</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div className='text-left'>
                                            <h6 className="my-0 font-weight-bolder">TOTAL</h6>
                                        </div>
                                        <span className="text-muted text-right">&#8369; {this.state.transactions.total}</span>
                                    </li>
                                </ul>
                                <button className='btn btn-md btn-success' onClick={this.goBack}>Continue shopping</button>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default withRouter(CheckoutSuccess);