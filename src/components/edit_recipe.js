import React, { Component } from 'react';

class EditRecipe extends Component {
    addRecipe = (e) =>{
        e.preventDefault();

        fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': sessionStorage.getItem('token'),
            },
            body: JSON.stringify({
              title: this.refs.title.value,
              category: this.refs.category.value,
              ingredients: this.refs.ingredients.value,
              steps: this.refs.steps.value,
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
        this.refs.message.innerHTML='Recipe Added successfully';
        this.refs.title.value=null;
        this.refs.category.value=null;
        this.refs.ingredients.value=null;
        this.refs.steps.value=null;
        
    }
    render(){
        return (
        <div className="EditRecipe">
            <h1>Add Recipe</h1>
            <div className="alert alert-success" ref="message"></div>
            <form onSubmit={this.addRecipe}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Title" ref="title" required/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Category" ref="category" required/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Ingredients" ref="ingredients" required/>
                </div>
                <div className="form-group">
                    <textarea className="form-control" placeholder="Add your steps here" ref="steps" required/>
                </div>
                <input type="submit" className="btn btn-primary" value="Submit"/>
            </form>
            
        </div>
        );
    }
}

export default EditRecipe