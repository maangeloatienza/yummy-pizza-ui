import React from 'react';
import {withRouter, Link} from 'react-router-dom';

function TransactionList(props){
  

    const dateConvert=(date)=>{
        let dateTime = new Date(date.toString());

        return dateTime.toDateString();
    }

    return   <>
                <div className='col-9 mx-auto'>
                    <h4 className="mb-1 text-center">
                        <span className="text-muted">Order History  </span>
                    </h4>
                    <p className="text-muted text-right">count : {props.count} </p>
                    <table className='table table-dark table-responsive text-center'>
                        <thead>
                            <tr>
                                <td>Code</td>
                                <td>Name</td>
                                <td>Date ordered</td>
                                <td>Total</td>
                                <td>Total USD</td>
                                <td>Total EURO</td>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                props.transactions ? props.transactions.map((item, index) => {
                                    return  <tr className="" key={item.id} >
                                                
                                                <td>
                                                    <Link to={`transactions/${item.id}`}>
                                                        <small className="text-white">{item.code}</small>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <small className="text-white">{item.first_name + ' ' + item.last_name}</small>
                                                </td>
                                                <td>
                                                    <small className="text-white">{dateConvert(item.created)}</small>
                                                </td>
                                                <td>
                                                    <small className="text-white">&#8369; {item.total}</small>
                                                </td>
                                                <td>
                                                    <small className="text-white">&#36; {item.total_usd}</small>
                                                </td>
                                                <td>
                                                    <small className="text-white">&euro; {item.total_euro}</small>
                                                </td>
                                               
                                            </tr>
                                    
                                    }) : <tr className="">No order history!</tr>

                                    

                            }
                        </tbody>
                    </table>
                </div>
            </>
                
}

export default withRouter(TransactionList);