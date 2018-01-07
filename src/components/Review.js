import React, { Component } from 'react';
import Since from 'react-since';
import url from './config'

const Reviews = props =>
<div className="col-sm-12">
    <blockquote>
        <p>{props.content}.</p>
        <footer>By {props.created_by} about <cite title="Time"><Since date={ props.create_date }/></cite></footer>
    </blockquote>
</div>;
    
class Review extends Component {
    constructor(props){
        super(props)
        let recipe_id = this.props.match.params.recipe_id;
        this.state = {
            recipe_id:recipe_id,
            recipeData:[],
            message:'',
            content:'',
            reviews:[],
            placeholder:''
        };
        
    }
    componentDidMount(){
        const {history} = this.props;
        if(!sessionStorage.getItem('isLoggedIn')){
            history.push('/login')
        }
        fetch(url+this.state.recipe_id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('token'),
            }
        }).then((response) => response.json())
        .then((responseJson) =>{
            if(responseJson.Recipe_Item){
                this.setState({recipeData: responseJson.Recipe_Item})
                console.log(responseJson.Recipe_Item)
            }
        })


    }

    componentWillMount(){
        fetch(url+'recipe/review/'+this.state.recipe_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('token'),
            }
        }).then((response) => response.json())
        .then((responseJson) =>{
            if(responseJson.Review_list){
            console.log(responseJson.Review_list)
            this.setState({reviews: responseJson.Review_list})
            }else{
            console.log(responseJson.message)
            this.setState({placeholder: responseJson.message})
            console.log(this.state.placeholder)
            }
        })

    }
    handleContentChange= (event) =>{
        this.setState({content: event.target.value})
    }

    upVote = (id) =>{
        fetch(url+'recipe/upvote/'+id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': sessionStorage.getItem('token'),
            }
        })
        .then((Response)=>Response.json())
        .then((findresponse)=>{
            console.log(findresponse.message);
            if(!findresponse.message){
                let recipeData = this.state.recipeData;
                recipeData.upvotes = recipeData.upvotes +1
                this.setState({recipeData:recipeData});
            }
            this.setState({message:findresponse.message});
        })
        .catch(
            (error) => {
                this.props.history.push('/recipe/'+id)
            }
        );
    };

    review = (e) =>{
        e.preventDefault();
        fetch(url+'recipe/review/'+this.state.recipe_id,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': sessionStorage.getItem('token'),
            },
            body: JSON.stringify({
              content: this.state.content
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.status){
                this.setState({message:responseJson.message})
                this.refs.content.value=null;
                window.location.reload()

            }
            this.setState({message:responseJson.message})
            
        })
        .catch((error) => {
          console.error(error);
        });
    }
    render(){
        let loadReviews;
        if (!this.state.reviews) {
            loadReviews = 
            <div>
                <b>{this.state.placeholder}</b><br/>
            </div>
           
        }else {
            loadReviews =
            <div>
                {this.state.reviews.map(inf =>
                <Reviews key={inf.review_id} {...inf}/>
                )}
            </div>
        }
        return (
            <div className="col-sm-12">
                {this.state.message
                    ? <div className="alert alert-danger">{this.state.message}</div>
                    : <div></div> 
                }
                <div className="jumbotron">
                    <h3>{this.state.recipeData.title}</h3>
                    <em>Added by <span className="fa fa-user"></span> { this.state.recipeData.created_by } about <span className="fa fa-calendar"></span> <Since date={ this.state.recipeData.create_date } /></em>
                    <hr/>
                    <div>
                        <h3>Ingredients</h3>
                        {this.state.recipeData.ingredients}
                        <h3>Steps</h3>
                        <small>{this.state.recipeData.steps}</small><br/><br/>
                        <div className="btn-group">
                            <button type="button" onClick={() => this.upVote(this.state.recipeData.recipe_id)} className="btn btn-primary btn-xs">UpVote</button>
                            <button type="button" className="btn btn-default btn-xs"><span className="fa fa-thumbs-o-up"></span> Upvotes:{this.state.recipeData.upvotes}</button>
                        </div>
                    </div>
                </div>
                <div className="jumbotron">
                <b>Reviews</b>
                    {loadReviews}
                    <form onSubmit={this.review}>
                            <div className="form-group">
                                <textarea className="form-control" placeholder="Enter your Review!" ref="content" onChange={this.handleContentChange} required/>
                            </div>
                            <input type="submit" className="btn btn-primary pull-right" value="Review"/>
                        
                    </form>
                </div>
            </div>

        );
        
    }
}

export default Review