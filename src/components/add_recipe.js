import React, { Component } from 'react';
import  url, { http } from './config'

const Categories = props =>
    <option>{props.cat_name}</option>
class AddRecipe extends Component {
    constructor(){
        super()
        this.state = {
            catData:[],
            selectValue: '',
            message:'',
            category:'',
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
        
        if(!localStorage.getItem('isLoggedIn')){
            history.push('/login')
        }
        return http.get(`${url}category`)
        .then((response) =>{
            console.log(response.data.Category_list)
            this.setState({
                catData: response.data.Category_list,
            })
        })
        .catch((xhr) =>{
            this.setState({
                message:'Add atleast one category before creating a recipe'
            })   
        });


    }

    addRecipe = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        if(!localStorage.getItem('isLoggedIn')){
            history.push('/login')
        }
        let postData = {
            title: this.refs.title.value,
            category: this.state.category,
            ingredients: this.refs.ingredients.value,
            steps: this.refs.steps.value,
            status: this.state.selectValue
        }
        return http.post(`${url}`, postData)
        .then((response) => {
            this.refs.title.value=null;
            this.refs.ingredients.value=null;
            this.refs.steps.value=null;
            history.push('/dashboard?tab=1')

        })
        .catch((xhr) => {
            this.setState ({
                message:xhr.response.data.Message
            })
        });
        
        
    }
    render(){
        return (
        <div className="AddRecipe">
            <h1>Add Recipe</h1>
            {this.state.message
                ? <div className="alert alert-danger col-sm-8">{this.state.message}</div>
                : <div></div> 
            }
            <div className="jumbotron col-sm-8">
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
                    </select> <ess>* required</ess><br/><br/>
                    <input type="submit" className="btn btn-primary" value="Submit"/>&nbsp;
                    <a href="/dashboard?tab=1" className="btn btn-success">Cancel</a>
                </form>
            </div>
            
        </div>
        );
    }
}

export default AddRecipe