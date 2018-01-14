import React, { Component } from 'react';
import  url, { http } from './config'

class AddCategory extends Component {
    constructor(){
        super()
        this.state = {
            message:'',
            cat_name:'',
            cat_desc:'',
        }  
    }
    handleCatNameChange= (event) =>{
        this.setState({
            cat_name: event.target.value
        })
    }
    handleCatDescChange= (event) =>{
        this.setState({
            cat_desc: event.target.value
        })
    }
    addCategory = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        if(!localStorage.getItem('isLoggedIn')){
            history.push('/login')
        }
        let postData = {
            cat_name: this.state.cat_name,
            cat_desc: this.state.cat_desc
        }
        return http.post(`${url}category`, postData)
        .then((response) => {
                history.push('/dashboard?tab=2')   
        })
        .catch((xhr) => {
            this.setState ({
                message:xhr.response.data.Message
            })
        });
  
    }
    render(){
        const {message, cat_name, cat_desc}=this.state
        return (
        <div className="AddCategory">
            <h1>Add Category</h1>
            {message
                ? <div className="alert alert-danger col-sm-8">{message}</div>
                : <div></div> 
            }
            <div className="jumbotron col-sm-8">
                <form onSubmit={this.addCategory} id="category-form">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Category name" id="cat_name" value={cat_name} onChange={this.handleCatNameChange} required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Category description" id="cat_desc" value={cat_desc} onChange={this.handleCatDescChange} required/>
                    </div>
                    <input type="submit" className="btn btn-primary" id="submit" value="Submit"/>&nbsp;
                    <a href="/dashboard?tab=2" className="btn btn-success" id="cancel">Cancel</a>
                </form>
            </div>
            
        </div>
        );
    }
}

export default AddCategory