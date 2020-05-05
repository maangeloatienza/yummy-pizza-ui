import React from 'react';
import ProductCard from './ProductCard';

function ProductList (props){
  
  const { products } = props;

  return  <div className="container-fluid">
            <div className="row">
              
                  {
                    products ? products.map((value, index) => {
                      return <ProductCard product={value} key={value.id} />
                            
                    })
                    : <h1 className='text-center text-danger font-weight-bolder'>No products available!</h1>
                  }
              
            </div>
          </div>
}
  

export default ProductList;
