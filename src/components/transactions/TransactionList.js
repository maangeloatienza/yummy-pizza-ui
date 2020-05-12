import React, {useState,useEffect} from 'react';
import TransactionItem from './TransactionItem';
import { getTransaction } from './../../api/apiCall';

function TransactionList(props){
    const [transaction, setTransaction] = useState(Array(10).fill([]));
    const [code, setCode] = useState(null);
    const [id, setId] = useState(null);

    let {transactions} = props

    useEffect(() => {
        handleTransaction(id)
    }, []);

    const handleTransaction = (id,code) => {

        getTransaction(id).then(response => {
            let data = response.data
            setTransaction(data);
            setCode(code);
        })
    }

    const onClick = (event,id,code) =>{
        event.preventDefault();
        handleTransaction(id,code);
    }

    const dateConvert = (date) => {
        let dateTime = new Date(date.toString());

        return dateTime.toDateString();
    }

    const onPageClick = () =>{

    }

    return   <>
                <div className='col-xs-12 col-sm-12 col-md-7 col-lg-7'>
                    <h4 className="mb-1 text-center">
                        <span className="text-white">Order History</span>
                    </h4>
                    <p className="text-white text-right">count : <b>{props.count}</b> </p>
                    <div className='table-responsive'>
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
                    </div>
                </div>
                <TransactionItem
                    transaction={transaction}
                    code={code}
                    dateConvert={dateConvert}/>
            </>
                
}

export default TransactionList;