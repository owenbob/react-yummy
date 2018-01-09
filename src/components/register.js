import React, { Component } from 'react';
import url from './config'
class Register extends Component {

    constructor(){
        super()
        this.state={message:''}
    }
    regUser = (e) =>{
        e.preventDefault();
        fetch(url+'auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.refs.name.value,
              username: this.refs.username.value,
              email: this.refs.email.value,
              password: this.refs.password.value
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.status){
                this.setState({message:responseJson.Message})
                this.refs.name.value=null;
                this.refs.username.value=null;
                this.refs.email.value=null;
                this.refs.password.value=null;
                this.refs.cpassword.value=null;
            }
            this.setState({message:responseJson.Message})
 
        })
        .catch((error) => {
          console.error(error);
        });
        
        
       
    }
    render(){
        return (
        <div className="Register">
            <h1>Register Here</h1>
            {this.state.message
                    ? <div className="alert alert-danger col-xs-12">{this.state.message}</div>
                    : <div></div> 
                }
            <form onSubmit={this.regUser}>
                <div className="jumbotron">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name" ref="name" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" ref="username" required/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" ref="email" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" ref="password" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Comfirm Password" ref="cpassword" required/>
                    </div>
                    <input type="submit" className="btn btn-primary pull-right" value="Register"/>

                    <center>
                        <p>or</p>
                        <p><a href="/login">Already a member? Click here to login</a></p>
                    </center>
                </div>
                
            </form>
            
        </div>
        );
    }
}

export default Register