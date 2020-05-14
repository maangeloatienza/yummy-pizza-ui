import React, {useState,useEffect} from 'react';
import TransactionItem from './TransactionItem';
import { getTransaction } from './../../api/apiCall';

function TransactionList({transactions,fetchTransaction,dateConvert}){
    const [code, setCode] = useState(null);
    const [id, setId] = useState(null);

    const onClick = (event,id,code) =>{
        event.preventDefault();
        fetchTransaction(id, code)
    }

    return   <>
                
                <table className='table table-dark text-center mx-auto'>
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

                            transactions ? transactions.map((item, index) => {
                                return <tr className="" key={item.id} >
                                    <td>
                                        <small className="text-white">
                                            <a href='' onClick={(event) => { onClick(event, item.id, item.code); }}>{item.code}</a>
                                        </small>
                                    </td>
                                    <td>
                                        <small className="text-white">{item.first_name + ' ' + item.last_name}</small>
                                    </td>
                                    <td>
                                        <small className="text-white">{dateConvert(item.created)}</small>
                                    </td>
                                    <td>
                                        <small className="text-white">&#8369;{(item.total.toFixed(2))}</small>
                                    </td>
                                    <td>
                                        <small className="text-white">&#36;{(item.total_usd.toFixed(2))}</small>
                                    </td>
                                    <td>
                                        <small className="text-white">&euro;{(item.total_euro.toFixed(2))}</small>
                                    </td>

                                </tr>

                            }) : <tr className="">No order history!</tr>

                        }
                    </tbody>
                </table>
            </>
                
}

export default TransactionList;