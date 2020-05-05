import React from 'react';
import Toast from './../../utils/Toast';

import {logout} from './../../api/apiCall';
import { withRouter } from 'react-router-dom';
import { removeUserSession, getToken } from './../../utils/Commons';



class Logout extends React.Component {

  constructor(props){
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }
  
  componentDidMount(){
    this.onLogout()
  }

  onLogout(){
    
    
    logout().then(response=> {
      Toast(response);

      if(response.success){
        removeUserSession();
        setTimeout(() => {
          window.location.href = '/';

        }, 1000);
      } 
    })

    // this.props.history.push('/');

    // window.location.reload(false);

  }

  render(){
        
    return (
        <div></div>
        // <button  onClick={this.onLogout}>Logout</button>
      
      )
  }
}

export default withRouter(Logout);