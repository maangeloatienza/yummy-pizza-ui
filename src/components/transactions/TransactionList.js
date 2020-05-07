import React, {useState,useEffect} from 'react';
import TransactionItem from './TransactionItem';
import { getTransaction } from './../../api/apiCall';

function TransactionList(props){
    const [transaction, setTransaction] = useState([]);
    const [code, setCode] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        fetchTransaction(id)
    }, []);

    const fetchTransaction = (id,code) => {

        getTransaction(id).then(response => {
            let data = response.data
            setTransaction(data);
            setCode(code);
        })
    }

    const onClick = (event,id,code) =>{
        event.preventDefault();

        fetchTransaction(id,code);

    }

    const dateConvert = (date) => {
        let dateTime = new Date(date.toString());

        return dateTime.toDateString();
    }

    return   <>
                <div className='col-xs-12 col-sm-12 col-md-7 col-lg-7'>
                    <h4 className="mb-1 text-center">
                        <span className="text-muted">Order History</span>
                    </h4>
                    <p className="text-muted text-right">count : {props.count} </p>
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

                                    props.transactions ? props.transactions.map((item, index) => {
                                        return <tr className="" key={item.id} >

                                            <td>
                                                {/* <Link to={`transactions/${item.id}`}> */}
                                                <small className="text-white">
                                                    <a onClick={(event) => { onClick(event, item.id, item.code); }}>{item.code}</a>
                                                </small>

                                                {/* <small>{item.code}</small>
                                                            </Link> */}
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
                </div>
                <TransactionItem
                    transaction={transaction}
                    code={code}
                    dateConvert={dateConvert}/>
            </>
                
}

export default TransactionList;