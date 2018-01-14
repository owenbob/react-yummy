import React, { Component } from 'react';
import  url, { http } from './config'

class EditCategory extends Component {
    constructor(props){
        super(props)
        let cat_id = this.props.match.params.cat_id;
        this.state = {
            cat_id:cat_id,
            cat_name:'',
            cat_desc:'',
            message:''
        };
        
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
    componentDidMount(){
        const {history} = this.props;
        if(!localStorage.getItem('isLoggedIn')){
            history.push('/login')
        }
        return http.get(`${url}category/${this.state.cat_id}`)
        .then((response)=>{
            let cat_name = response.data.Category_Item.cat_name;
            let cat_desc = response.data.Category_Item.cat_desc;
            this.setState ({
                cat_name:cat_name,
                cat_desc:cat_desc
            });         
        })
    }

    editCategory = (e) =>{
        const {history} = this.props;
        e.preventDefault();
        let postData = {
            cat_name: this.state.cat_name,
            cat_desc: this.state.cat_desc,
        }
        return http.put(`${url}category/${this.state.cat_id}`, postData)
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
        <div className="EditCategory">
            <h1>Edit Category</h1>
            {message
                ? <div className="alert alert-danger col-sm-8">{message}</div>
                : <div></div> 
            }
            <div className="jumbotron col-sm-8">
                <form onSubmit={this.editCategory} id="category-form">
                    <div className="form-group">
                        <input type="text" className="form-control" id="cat_name" value={cat_name} onChange={this.handleCatNameChange} required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="cat_desc" value={cat_desc} onChange={this.handleCatDescChange} required/>
                    </div>
                    
                    <input type="submit" className="btn btn-primary" id="submit" value="Submit"/>&nbsp;
                    <a href="/dashboard?tab=2" className="btn btn-success" id="cancel">Cancel</a>
                </form>
            </div>
            
        </div>
        );
    }
}

export default EditCategory