import React, { Component } from 'react';
import url from './config'

const Categories = props =>
    <option>{props.cat_name}</option>
class AddRecipe extends Component {
    constructor(){
        super()
        this.state = {
            catData:[],
            selectValue: '',
            message:'',
            category:''
        };  
    }

    handleStatus = (e) => {
        this.setState({
            selectValue: e.target.value
        });
        
    }

    handleCategory = (e) => {
        this.setState({
            category: e.target.value
        });
        
    }
    componentDidMount(){
        const {history} = this.props;
        if(!sessionStorage.getItem('isLoggedIn')){
            history.push('/login')
        }
        fetch(url+'category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('token'),
            }
        }).then((response) => response.json())
        .then((responseJson) =>{
            console.log(responseJson.Category_list)
            this.setState({
                catData: responseJson.Category_list
            })
        })


    }

    addRecipe = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        if(!sessionStorage.getItem('isLoggedIn')){
            history.push('/login')
        }
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': sessionStorage.getItem('token'),
            },
            body: JSON.stringify({
              title: this.refs.title.value,
              category: this.state.category,
              ingredients: this.refs.ingredients.value,
              steps: this.refs.steps.value,
              status: this.state.selectValue
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
                this.refs.title.value=null;
                this.refs.ingredients.value=null;
                this.refs.steps.value=null;
                history.push('/dashboard')
            }
            
            
        })
        .catch((error) => {
          console.error(error);
        });
        
        
    }
    render(){
        return (
        <div className="AddRecipe">
            <h1>Add Recipe</h1>
            {this.state.message
                ? <div className="alert alert-success">{this.state.message}</div>
                : <div></div> 
            }
            <form onSubmit={this.addRecipe}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Title" ref="title" required/>
                </div>
            <div className="form-group">
                <select className="form-control" onChange={this.handleCategory}>
                <option disabled selected>Select Category</option>
                    {this.state.catData.map(inf =>
                    <Categories key={inf.cat_id}{...inf}/>
                    )}
                </select>
            </div>
                
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Ingredients" ref="ingredients" required/>
                </div>
                <div className="form-group">
                    <textarea className="form-control" placeholder="Add your steps here" ref="steps" required/>
                </div>
                <select onChange={this.handleStatus} required>
                    <option disabled selected>Select status</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select> * required<br/><br/>
                <input type="submit" className="btn btn-primary" value="Submit"/>
            </form>
            
        </div>
        );
    }
}

export default AddRecipe