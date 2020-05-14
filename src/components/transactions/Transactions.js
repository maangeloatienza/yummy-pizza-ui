import React, {useState,useEffect} from 'react';
import TransactionItem from './TransactionItem';
import TransactionList from './TransactionList';
import Pagination from './../pagination/Pagination';

import { getTransactions, getTransaction} from './../../api/apiCall';
import { getToken, getUser } from '../../utils/Commons';


function Transactions(props){

    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState(Array(10).fill([]));
    const [code, setCode] = useState(null);
    const [id, setId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [sort_desc, setSordDesc] = useState('DESC');
    const [sort_id, setSordId] = useState('created');
    const [limit, setLimit] = useState(10);
    const [count,setCount] = useState(0);
    let params = getToken() ? `user=${getUser().id}` : `user=${localStorage.getItem('guest')}`;
    
    useEffect(()=>{
        fetchTransactions();
        fetchTransaction();
    }, [currentPage]);

    const fetchTransactions = () =>{
        
        getTransactions(`${params}&page=${currentPage}&sort_id=${sort_id}&sort_desc=${sort_desc}&limit=${limit}`).then(response =>{ 
            setTransactions(response.data);
            setLimit(response.limit);
            setCurrentPage(response.page);
            setCount(response.count);
        });
    }

    const fetchTransaction = (id, code) => {
        getTransaction(id).then(response => {
            let data = response.data
            setTransaction(data);
            setCode(code);
        })
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const dateConvert = (date) => {
        let dateTime = new Date(date.toString());

        return dateTime.toDateString();
    }


    return  <div className='container'>
                <div className='row'>
                    <div className='col-xs-12 col-sm-12 col-md-7 col-lg-7'>
                        <h4 className="mb-1 text-center">
                            <span className="text-white">Order History</span>
                        </h4>
                        <p className="text-white text-right">count : <b>{count}</b> </p>
                        <div className='table-responsive'>
                        <TransactionList 
                            count={count}
                            transactions={transactions}
                            fetchTransaction={fetchTransaction}
                            dateConvert={dateConvert}
                            />
                        <Pagination
                            limit={limit}
                            total={count}
                            paginate={paginate}
                        />  
                        </div>
                                              
                    </div>
                    <TransactionItem
                        transaction={transaction}
                        code={code}

                        />
                </div>
            </div>
}

export default Transactions;