import React, { Component } from 'react';
import axios from 'axios';
import url from './config'
class Register extends Component {

    constructor(){
        super()
        this.state={
            message:'',
            name:'',
            username:'',
            email:'',
            passwordCandidate:'',
            password:'',
            color:'col-xs-11 alert alert-danger'
        }
    }
    handleNameChange = (event) =>{
        this.setState({
            name: event.target.value
        })
    }

    handleUsernameChange = (event) =>{
        this.setState({
            username: event.target.value
        })
    }

    handleEmailChange = (event) =>{
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordCandidateChange = (event) =>{
        this.setState({
            passwordCandidate: event.target.value
        })
    }

    handlePasswordChange = (event) =>{
        this.setState({
            password: event.target.value
        })
    }
    regUser = (e) =>{
        e.preventDefault();
        this.setState({
            message: '',
        })
        if(this.state.passwordCandidate !== this.state.password){
            return this.setState({
                message: 'Passwords do not match',
                color:'col-xs-11 alert alert-danger'
            })
        }
        let postData = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        return axios.post(`${url}auth/register`, postData)
        .then((response) => {
            this.setState({
                message:response.data.Message,
                color:'col-xs-11 alert alert-success'
            })
            this.setState({
                name:'',
                username:'',
                email:'',
                password:'',
                passwordCandidate:''    
            })
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
            <form id="signup-form" onSubmit={this.regUser}>
                <div className="jumbotron col-xs-11">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleNameChange} id="name" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} id="username" required/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} id="email" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" value={this.state.passwordCandidate} onChange={this.handlePasswordCandidateChange} id="cpassword" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Comfirm Password" value={this.state.password} onChange={this.handlePasswordChange} id="password" required/>
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