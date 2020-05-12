import React, {useState,useEffect} from 'react';

import {getBanners} from '../../api/apiCall';

function ProductCarousel(){

    const [banners, setBanner] = useState([]);

    useEffect(()=>{
        fetchBanners();
    },[]);
    
    const fetchBanners = () => {
        getBanners(`showcase=1&limit=3`).then(response=>{
            let data = response.data;
            console.log(data);
            setBanner(data);
        });
    }

    return  <>
                <div id="carouselExampleSlidesOnly" className="carousel slide mb-4" data-ride="carousel" data-interval="3000" style={{height:'300px'}}>
                    <div className="carousel-inner mx-auto">
                        {
                            banners? banners.map((item,index)=>{
                                return  <div className={`carousel-item ${index===0 ? 'active' : ''} col-12`} key={item.id}>
                                            <img
                                                className="d-block w-100 img-fluid"
                                                src={item.image} alt={item.name}
                                                style={
                                                    { 
                                                        height: '300px',
                                                        width : '400px',
                                                        margin: 'auto',
                                                        objectFit: 'contain',
                                                        margin: 'auto',
                                                        display: 'block'
                                                    }
                                                }/>
                                        </div>
                            })
                            :
                            ''
                        }
                    </div>
                </div>
            </>
}

export default ProductCarousel;