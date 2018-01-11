import React, { Component } from 'react';
import  url, { http } from './config'

class AddCategory extends Component {
    constructor(){
        super()
        this.state = {
            message:''
        }  
    }
    addCategory = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        if(!localStorage.getItem('isLoggedIn')){
            history.push('/login')
        }
        let postData = {
            cat_name: this.refs.cat_name.value,
            cat_desc: this.refs.cat_desc.value,
        }
        return http.post(`${url}category`, postData)
        .then((response) => {
                history.push('/dashboard')   
        })
        .catch((xhr) => {
            this.setState ({
                message:xhr.response.data.Message
            })
        });
        
        
    }
    render(){
        return (
        <div className="AddCategory">
            <h1>Add Category</h1>
            {this.state.message
                ? <div className="alert alert-danger col-sm-8">{this.state.message}</div>
                : <div></div> 
            }
            <div className="jumbotron col-sm-8">
                <form onSubmit={this.addCategory}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Category name" ref="cat_name" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Category description" ref="cat_desc" required/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit"/>&nbsp;
                    <a href="/dashboard" className="btn btn-success">Cancel</a>
                </form>
            </div>
            
        </div>
        );
    }
}

export default AddCategory