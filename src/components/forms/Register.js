import React, { Component } from 'react';
import API from '../../utils/API';
import { withRouter } from 'react-router-dom';
import { setUserSession } from '../../utils/Commons';

import Toast from './../../utils/Toast';

class Register extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        API.post('users', {
            username: this.usernameInput.value,
            password: this.passwordInput.value,
            first_name : this.firstNameInput.value,
            last_name : this.lastNameInput.value,
            email : this.emailInput.value,
            phone_number : this.phoneInput.value,
        })
            .then(response => {
                let data = response.data;
                

                Toast(data);
                if (data.success) {

                    setUserSession(data.token, data.data);

                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1000);

                }

            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {


        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-6  mt-5 pt-5">
                        <form onSubmit={this.onSubmit}>
                            <h1 className='text-center text-danger font-weight-bolder'> Pizza </h1>

                            <div className="form-label-group mb-2">

                                <input type="text" className='form-control' ref={firstNameInput => this.firstNameInput = firstNameInput} placeholder='First name' required />

                            </div>

                            <div className="form-label-group mb-2">

                                <input type="text" className='form-control' ref={lastNameInput => this.lastNameInput = lastNameInput} placeholder='Last name' required />

                            </div>
                            
                            <div className="form-label-group mb-2">

                                <input type="email" className='form-control' ref={emailInput => this.emailInput = emailInput} placeholder='Email' required />

                            </div>

                            <div className="form-label-group mb-2">

                                <input type="text" className='form-control' ref={phoneInput => this.phoneInput = phoneInput} placeholder='Phone number' required />

                            </div>
                            
                            <div className="form-label-group mb-2">

                                <input type="text" className='form-control' ref={usernameInput => this.usernameInput = usernameInput} placeholder='Username' required />

                            </div>

                            <div className="form-label-group mb-2">

                                <input type="password" className='form-control' ref={passwordInput => this.passwordInput = passwordInput} placeholder='Password' required />

                            </div>
                            
                            <button className="mt-2 btn btn-lg btn-primary btn-block" >Register</button>

                        </form>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(Register);