import React, {Component} from 'react';
import API from '../../utils/API';
import { withRouter } from 'react-router-dom';
import { setUserSession } from '../../utils/Commons';

import Toast from './../../utils/Toast';

class Login extends Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event){
        event.preventDefault();

        API.post('user/login',{
            username : this.usernameInput.value,
            password : this.passwordInput.value
        })
        .then(response=>{
            let data = response.data;
            console.log('user',data.data);

            Toast(data);
            if(data.success) {
         
                setUserSession(data.token, data.data);

                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);

            }
            
        })
        .catch(error=>{
            console.log(error)
        })
    }

    render (){

        
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-6  mt-5 pt-5">
                        <form onSubmit={this.onSubmit}>
                            <h1 className='text-center text-danger font-weight-bolder'> Pizza </h1>

                            <div className="form-label-group mb-2">
                                
                                <input type="text" className='form-control' ref={usernameInput => this.usernameInput = usernameInput} placeholder='Username' required />
                                
                            </div>

                            <div className="form-label-group mb-2">
                                
                                <input type="password" className='form-control' ref={passwordInput => this.passwordInput = passwordInput} placeholder='Password' required />
                                
                            </div>

                            <button className="mt-2 btn btn-lg btn-primary btn-block" >Sign in</button>
                            <p className="mt-5 mb-3 text-muted text-center">&copy; 2020</p>

                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withRouter(Login);