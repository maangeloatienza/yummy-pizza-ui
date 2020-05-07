import React from 'react';

function TransactionItem(props){
    let {transaction,code} = props;

    return  <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5' id='previewTx'>
                <h4 className='mb-1 text-center'>
                    <span className="text-white">Preview</span>
                </h4>
                <p className='text-white text-right '>Code: <b>{code || 'Not Available'}</b> </p>
                <div className='table-responsive'>
                    <table className='table table-dark text-white text-center mx-auto'>
                        <thead>
                            <tr className=''>
                                <td>Image</td>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Quantity</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transaction ? transaction.map((item, index) => {
                                    return <tr key={index}>
                                        <td>
                                            <img
                                                src={item.image}
                                                className='img-responsive'
                                                style={{ height: '75px', width: '75px' }}
                                                alt={item.name} />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>&#8369;{item.price}</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                })
                                    : <tr className='text-danger'>No Preview!</tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
}

export default TransactionItem;