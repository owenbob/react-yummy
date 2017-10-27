import React, { Component } from 'react';

class Login extends Component {

    loginUser = (e) =>{
        e.preventDefault();
        sessionStorage.setItem('user', this.refs.username.value)
        fetch('http://127.0.0.1:5000/auth/login', {
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
                <form method="POST" onSubmit={this.loginUser}>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" ref="username" required/>
                        </div>
                       
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" ref="password" required/>
                        </div>
                        
                        <input type="submit" className="btn btn-primary pull-right" value="Register"/>

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