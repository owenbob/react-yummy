import React, { Component } from 'react';
import url from './config'

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
        if(!sessionStorage.getItem('isLoggedIn')){
            history.push('/login')
        }
        fetch(url+this.state.recipe_id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': sessionStorage.getItem('token'),
            }
        })
        .then((Response)=>Response.json())
        .then((findresponse)=>{
            if(findresponse.Recipe_Item){
                let title = findresponse.Recipe_Item.title;
                let category = findresponse.Recipe_Item.category;
                let ingredients = findresponse.Recipe_Item.ingredients;
                let steps = findresponse.Recipe_Item.steps;
                this.setState ({
                    title:title,
                    category:category,
                    ingredients:ingredients,
                    steps:steps
                })
                console.log(findresponse.Recipe_Item)
            }
            
        })

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

    editRecipe = (e) =>{
        const {history} = this.props;
        const {title,category}=this.state;
        e.preventDefault();
        fetch(url+this.state.recipe_id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': sessionStorage.getItem('token'),
            },
            body: JSON.stringify({
              title: title,
              category: category,
              ingredients: this.state.ingredients,
              steps: this.state.steps,
              status: this.state.selectValue
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
        <div className="EditRecipe">
            <h1>Edit Recipe</h1>
            {this.state.message
                ? <div className="alert alert-danger">{this.state.message}</div>
                : <div></div> 
            }
            <div class="jumbotron col-sm-8">
                <form onSubmit={this.editRecipe}>
                    <div className="form-group">
                        <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitleChange} required/>
                    </div>
                    <div className="form-group">
                        <select className="form-control" onChange={this.handleCategoryChange}>
                        <option value="Select" disabled selected>Select Category</option>
                            {this.state.catData.map(inf =>
                            <Categories key={inf.cat_id}{...inf}/>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" value={this.state.ingredients} onChange={this.handleIngredientsChange} required/>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" value={this.state.steps} onChange={this.handleStepsChange} required/>
                    </div>
                    <select onChange={this.handleSelect}>
                        <option value="Select" disabled selected>Select status</option>
                        {this.state.status.map(inf =>
                            <Status key={inf.id}{...inf}/>
                            )}
                    </select><br/><br/>
                    <input type="submit" className="btn btn-primary" value="Submit"/>&nbsp;
                    <a href="/dashboard" className="btn btn-success">Cancel</a>
                </form>
            </div>
            
        </div>
        );
    }
}

export default EditRecipe