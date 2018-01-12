import React, { Component } from 'react';
import  url, { http } from './config'

const Categories = props =>
    <option>{props.cat_name}</option>

const Status = props =>
    <option>{props.status}</option>


const status =  [{'id':1,'status':'public'},{'id':2,'status':'private'}]
class EditRecipe extends Component {
    constructor(props){
        super(props)
        let recipe_id = this.props.match.params.recipe_id;
        this.state = {recipe_id:recipe_id, 
            selectValue: '',
            title:'',
            category:'',
            ingredients:'',
            steps:'',
            message:'',
            catData:[], 
            status:status
        };
        
    }

    handleTitleChange = (event) =>{
        this.setState({
            title: event.target.value
        })
    }
    handleCategoryChange = (event) =>{
        this.setState({
            category: event.target.value
        })
    }
    handleIngredientsChange = (event) =>{
        this.setState({
            ingredients: event.target.value
        })
    }
    handleStepsChange = (event) =>{
        this.setState({
            steps: event.target.value
        })
    }
    
    handleSelect = (e) => {
        this.setState({
            selectValue: e.target.value
        });
        
    }
    componentDidMount(){
        const {history} = this.props;
        if(!localStorage.getItem('isLoggedIn')){
            history.push('/login')
        }
        http.get(`${url}${this.state.recipe_id}`)
        .then((response)=>{
            let title = response.data.Recipe_Item.title;
            let category = response.data.Recipe_Item.category;
            let ingredients = response.data.Recipe_Item.ingredients;
            let steps = response.data.Recipe_Item.steps;
            this.setState ({
                title:title,
                category:category,
                ingredients:ingredients,
                steps:steps
            })
            console.log(response.data.Recipe_Item)   
        })
        http.get(`${url}category`)
        .then((response) =>{
            console.log(response.data.Category_list)
            this.setState({
                catData: response.data.Category_list
            })
        })

    }

    editRecipe = (e) =>{
        const {history} = this.props;
        const {title,category}=this.state;
        e.preventDefault();
        let postData = {
            title: title,
            category: category,
            ingredients: this.state.ingredients,
            steps: this.state.steps,
            status: this.state.selectValue
        }
        return http.put(`${url}${this.state.recipe_id}`, postData)
        .then((response) => {
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
        <div className="EditRecipe">
            <h1>Edit Recipe</h1>
            {this.state.message
                ? <div className="alert alert-danger col-sm-8">{this.state.message}</div>
                : <div></div> 
            }
            <div className="jumbotron col-sm-8">
                <form onSubmit={this.editRecipe} id="recipe-form">
                    <div className="form-group">
                        <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitleChange} id="title" required/>
                    </div>
                    <div className="form-group">
                        <select className="form-control" onChange={this.handleCategoryChange} id="category">
                        <option value="Select" disabled selected>Select Category</option>
                            {this.state.catData.map(inf =>
                            <Categories key={inf.cat_id}{...inf}/>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" value={this.state.ingredients} id="ingredients" onChange={this.handleIngredientsChange} required/>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" value={this.state.steps} onChange={this.handleStepsChange} id="steps" required/>
                    </div>
                    <select onChange={this.handleSelect} id="status">
                        <option value="Select" disabled selected>Select status</option>
                        {this.state.status.map(inf =>
                            <Status key={inf.id}{...inf}/>
                            )}
                    </select><br/><br/>
                    <input type="submit" className="btn btn-primary" value="Submit"/>&nbsp;
                    <a href="/dashboard?tab=1" className="btn btn-success">Cancel</a>
                </form>
            </div>
            
        </div>
        );
    }
}

export default EditRecipe