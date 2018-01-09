import React, { Component } from 'react';
import axios from 'axios';
import url from './config'
class Register extends Component {

    constructor(){
        super()
        this.state={
            message:'',
            color:'col-xs-12 alert alert-danger'
        }
    }
    regUser = (e) =>{
        e.preventDefault();
        let postData = {
            name: this.refs.name.value,
            username: this.refs.username.value,
            email: this.refs.email.value,
            password: this.refs.password.value
        };
        return axios.post(`${url}auth/register`, postData)
        .then((response) => {
            this.setState({
                message:response.data.Message,
                color:'col-xs-12 alert alert-success'
            })
            this.refs.name.value=null;
            this.refs.username.value=null;
            this.refs.email.value=null;
            this.refs.password.value=null;
            this.refs.cpassword.value=null;
        })
        .catch((xhr) => {
            this.setState({message:xhr.response.data.Message})
        }); 
    }
    render(){
        return (
        <div className="Register">
            <h1>Register Here</h1>
            {this.state.message
                ? <div className={this.state.color}>{this.state.message}</div>
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