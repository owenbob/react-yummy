import React, { Component } from 'react';
import url from './config'

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
        if(!sessionStorage.getItem('isLoggedIn')){
            history.push('/login')
        }
        fetch(url+'category/'+this.state.cat_id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': sessionStorage.getItem('token'),
            }
        })
        .then((Response)=>Response.json())
        .then((findresponse)=>{
            if(findresponse.Category_Item){
                let cat_name = findresponse.Category_Item.cat_name;
                let cat_desc = findresponse.Category_Item.cat_desc;
                this.setState ({
                    cat_name:cat_name,
                    cat_desc:cat_desc
                });
                console.log(findresponse.Category_Item)
            }
            
        })
    }

    editCategory = (e) =>{
        const {history} = this.props;
        e.preventDefault();
        fetch(url+'category/'+this.state.cat_id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': sessionStorage.getItem('token'),
            },
            body: JSON.stringify({
              cat_name: this.state.cat_name,
              cat_desc: this.state.cat_desc,
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson){
                console.log(responseJson);
                this.setState ({
                    message:responseJson.Message
                })
            }
            if (responseJson.status === 201){
                history.push('/dashboard')
            }
        })
        .catch((error) => {
          console.error(error);
        });
        
    }
    render(){
        return (
        <div className="EditCategory">
            <h1>Edit Category</h1>
            {this.state.message
                ? <div className="alert alert-danger">{this.state.message}</div>
                : <div></div> 
            }
            <div class="jumbotron col-sm-8">
                <form onSubmit={this.editCategory}>
                    <div className="form-group">
                        <input type="text" className="form-control" value={this.state.cat_name} onChange={this.handleCatNameChange} required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" value={this.state.cat_desc} onChange={this.handleCatDescChange} required/>
                    </div>
                    
                    <input type="submit" className="btn btn-primary" value="Submit"/>&nbsp;
                    <a href="/dashboard" className="btn btn-success">Cancel</a>
                </form>
            </div>
            
        </div>
        );
    }
}

export default EditCategory