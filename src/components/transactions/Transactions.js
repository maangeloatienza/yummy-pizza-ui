import React, {useState,useEffect} from 'react';
import { getTransactions, getTransaction} from './../../api/apiCall';
import { getToken, getUser } from '../../utils/Commons';

import TransactionList from './TransactionList';

function Transactions(props){

    const [transactions, setTransactions] = useState([]);
    const [sort_desc, setSordDesc] = useState('DESC');
    const [sort_id, setSordId] = useState('created');
    const [count,setCount] = useState(0);
    let params = getToken() ? `user=${getUser().id}` : `user=${localStorage.getItem('guest')}`;

    
    useEffect(()=>{
        fetchTransactions();
    },[]);

    const fetchTransactions = () =>{
        // let params = getToken() ? `user=${getUser().id}` : `user=${localStorage.getItem('guest')}`;
        
        getTransactions(`${params}&sort_id=${sort_id}&sort_desc=${sort_desc}&limit=999`).then(response =>{ 
            setTransactions(response.data);
            setCount(response.count);
        });
    }

   

    return  <div className='container'>
                <div className='row'>
                    <TransactionList count={count} transactions={transactions}/>
                </div>
            </div>
}

export default Transactions;