import React, { Component } from 'react';
import url from './config'

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
        if(!sessionStorage.getItem('isLoggedIn')){
            history.push('/login')
        }
        fetch(url+'category', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': sessionStorage.getItem('token'),
            },
            body: JSON.stringify({
              cat_name: this.refs.cat_name.value,
              cat_desc: this.refs.cat_desc.value,
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.Message){
                console.log(responseJson);
                this.setState ({
                    message:responseJson.Message
                })
            }
            if (responseJson.status === 201){
                this.refs.cat_name.value=null;
                this.refs.cat_desc.value=null;
                history.push('/dashboard')
            }
            
            
        })
        .catch((error) => {
          console.error(error);
        });
        
        
    }
    render(){
        return (
        <div className="AddCategory">
            <h1>Add Category</h1>
            {this.state.message
                ? <div className="alert alert-danger">{this.state.message}</div>
                : <div></div> 
            }
            <div class="jumbotron col-sm-8">
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