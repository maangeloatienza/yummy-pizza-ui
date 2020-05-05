import React, {useEffect,useState} from 'react';
import { getTransaction } from './../../api/apiCall';

function TransactionItem(props){
    const [transaction, setTransaction] = useState([]);
    let id = props.match.params.id;

    useEffect(() => {
        fetchTransaction()
    }, []);

    const fetchTransaction = () => {
        getTransaction(id).then(response=>{
            let data = response.data
                console.log(data)
            setTransaction(data);
        })
    }

    const dateConvert = (date) => {
        let dateTime = new Date(date.toString());

        return dateTime.toDateString();
    }

    return  <>   
                <div className='container'>
                    <div className='row'>
                            <div className='col-xs-12 col-sm-12 col-md-10 col-lg-10 mx-auto text-center'>
                            <h4>Preview</h4>
                            <table className='table table-responsive'>
                                <thead>
                                    <tr>
                                        <td>Image</td>
                                        <td>Name</td>
                                        <td>Price(PHP)</td>
                                        <td>Price(USD)</td>
                                        <td>Price(EURO)</td>
                                        <td>Quantity</td>
                                        <td>Order Date</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        transaction ? transaction.map((item,id)=>{
                                            return  <tr key={item.id}>
                                                        <td>
                                                            <img
                                                                src={item.image}
                                                                className='img-responsive'
                                                                style={{height:'75px',width:'75px'}} 
                                                                alt={item.name}
                                                                />
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td>&#8369; {item.price}</td>
                                                        <td>&#36; {((item.price) / 55.66).toFixed(2)}</td>
                                                        <td>&euro; {((item.price) / 50.61).toFixed(2)}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{dateConvert(item.created)}</td>
                                                    </tr>
                                        })
                                        : <tr className='text-danger'>No Preview!</tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div> 
            </>
}

export default TransactionItem;