import React, { Component } from 'react';
import url from './config'
import axios from 'axios';

class Login extends Component {
    constructor(){
        super()
        this.state={ message:'' }
    }

    loginUser = (e) =>{
        e.preventDefault();
        const { history } = this.props;
        let postData = {
            username: this.refs.username.value,
            password: this.refs.password.value,
        };
        return axios.post(`${url}auth/login`, postData)
        .then(response => {
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('isLoggedIn',true)
            localStorage.setItem('user', this.refs.username.value)
            window.location.reload()
            history.push('/dashboard')
            
        })
        .catch(xhr => {
            this.refs.username.value = null;
            this.refs.password.value = null;
            this.setState({ message : xhr.response.data.error });
        });  
    }
    render(){
        return (
            <div className="Login">
                <h1>Please sign in</h1>
                {this.state.message
                    ? <div className="alert alert-danger col-xs-12">{this.state.message}</div>
                    : <div></div> 
                }
                <div className="jumbotron col-xs-11">
                    <form method="POST" onSubmit={this.loginUser}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" ref="username" required/>
                        </div>
                    
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" ref="password" required/>
                        </div>
                        
                        <input type="submit" className="btn btn-primary pull-right" value="Login"/>

                        <center>
                            <p>or</p>
                            <p><a href="/register">Click here to register</a></p>
                        </center>
                    </form>
                </div>
                
            </div>
        );
    }
}

export default Login