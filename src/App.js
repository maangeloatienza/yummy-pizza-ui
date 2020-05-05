import React, {useState,useEffect} from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from 'react-toastify';
import { getToken } from './utils/Commons';


import Navbar from './components/header/Navbar';
import RouteLinks from './components/links/RouteLinks';

toast.configure({
  autoClose: 2000,
  draggable: false,
  hideProgressBar: true,
  position: toast.POSITION.TOP_RIGHT
});



function App(props) {
  
  const [isLoggedIn,setLoggedIn] = useState(false);

  useEffect(()=>{
    verifyUser();
  });

  const verifyUser = () => {
    let isLoggedIn = getToken() ? true : false;

    setLoggedIn(isLoggedIn);
  }

  return  <div >
            <Navbar isLoggedIn={isLoggedIn}/>
            <div className="container">

              <RouteLinks />
              <ToastContainer/>
            
            </div>
          </div>
}

export default App;
