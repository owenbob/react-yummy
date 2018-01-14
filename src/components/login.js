import React, { Component } from 'react';
import url from './config'
import axios from 'axios';

class Login extends Component {
    constructor(){
        super()
        this.state={ 
            message:'', username:'', password:''
        }
    }
    handleUsernameChange = (event) =>{
        this.setState({
            username: event.target.value
        })
    }
    handlePasswordChange = (event) =>{
        this.setState({
            password: event.target.value
        })
    }

    loginUser = (e) =>{
        e.preventDefault();
        const { history } = this.props;
        let postData = {
            username: this.state.username,
            password: this.state.password
        };
        return axios.post(`${url}auth/login`, postData)
        .then((response) => {
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('isLoggedIn',true)
            localStorage.setItem('user', response.data.username)
            console.log(response.data.username)
            window.location.reload()
            history.push('/dashboard')
            
        })
        .catch((xhr) => {
            this.setState({ message : xhr.response.data.error });
        });  
    }
    render(){
        const {username, password, message}=this.state
        return (
            <div className="Login">
                <h1>Please sign in</h1>
                {message
                    ? <div className="alert alert-danger col-xs-11">{message}</div>
                    : <div></div> 
                }
                <div className="jumbotron col-xs-11">
                    <form method="POST" id="login-form" onSubmit={this.loginUser}>
                        <div className="form-group">
                            <input type="text" className="form-control" id="username" placeholder="Username" onChange={this.handleUsernameChange} value={username} required/>
                        </div>
                    
                        <div className="form-group">
                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handlePasswordChange} value={password} required/>
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