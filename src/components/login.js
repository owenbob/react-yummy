import React, { Component } from 'react';
import url from './config'

class Login extends Component {
    constructor(){
        super()
        this.state={message:''}
    }

    loginUser = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        sessionStorage.setItem('user', this.refs.username.value)
        fetch(url+'auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.refs.username.value,
              password: this.refs.password.value
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            sessionStorage.setItem('token',responseJson.token)
            sessionStorage.setItem('isLoggedIn',true)
            this.setState({message:responseJson.error})
            if(responseJson.token){
                window.location.reload()
                history.push('/dashboard')
            }
        })
        .catch((error) => {
          console.error(error);
        });
        this.refs.username.value=null;
        this.refs.password.value=null;
       
    }

    render(){
        return (
            <div className="Login">
                <h1>Login</h1>
                {this.state.message
                    ? <div className="alert alert-success col-sm-7">{this.state.message}</div>
                    : <div></div> 
                }
                <form method="POST" onSubmit={this.loginUser}>
                    <div className="col-sm-6">
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
                    </div>
                    
                </form>
                
            </div>
        );
    }
}

export default Login