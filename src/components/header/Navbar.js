import React from 'react';
import { Link  } from 'react-router-dom';
import { withGlobalState } from 'react-globally';
import "bootstrap/js/src/collapse.js";

import PizzaLogo from './pngfuel.com.png';


function Navbar (props) {
    const {isLoggedIn} = props;
    return <nav className="navbar navbar-expand-lg navbar-dark bg-warning static-top mb-5">

                <div className="container">
                    <Link to={'/'} className="navbar-brand" >
                <img className='img-fluid' style={{ height: '70px', width: '70px',}} src={PizzaLogo} alt=""/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navList" aria-controls="navList" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                    <div className="collapse navbar-collapse" id='navList'>
                        <ul className="navbar-nav ml-auto text-center">
                            <li  className="nav-item active">
                                <Link
                                    to={'/'}
                                    className="nav-link text-dark righteous-cursive text-uppercase">
                                        <h5 className='font-weight-bolder'>Home</h5>
                                    </Link>
                            </li>

                            {
                                isLoggedIn ?
                                    <Link
                                        to={'/transactions'}
                                        className="nav-link text-dark righteous-cursive text-uppercase">
                                        <h5 className='font-weight-bolder'>Orders</h5>
                                    </Link>
                                    : ''
                            }

                            {
                                !isLoggedIn ?
                                    <Link
                                        to={'/register'}
                                        className="nav-link text-dark righteous-cursive text-uppercase">
                                        <h5 className='font-weight-bolder'>Register</h5>
                                    </Link>
                                    : ''
                            }
                                    

                            <li className="nav-item">
                                {
                                    isLoggedIn ?
                                        <Link
                                            to={'/logout'}
                                            className="nav-link text-dark righteous-cursive text-uppercase" >
                                                <h5 className='font-weight-bolder'>Logout</h5>
                                        </Link>
                                        :
                                        <Link
                                            to={'/login'}
                                            className="nav-link text-dark righteous-cursive text-uppercase">
                                                <h5 className='font-weight-bolder'>Login</h5>
                                        </Link>
                                }
                            </li>
                            
                            <li className="nav-item text-center mx-auto">
                                <Link
                                    to={'/cart'}
                                    className="nav-link text-dark righteous-cursive text-uppercase">
                                        <h5 className='font-weight-bolder'>
                                            <i className="fa fa-shopping-cart mx-1 " aria-hidden="true"></i> 
                                                <span className={`badge badge-danger badge-pill p-2 ${props.globalState.badge ? 'text-white' : 'text-warning'} `}>{props.globalState.badge || 0}</span>
                                        </h5>
                                       
                                </Link>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
}

export default withGlobalState(Navbar);
