import React, { Component } from 'react';
import Since from 'react-since';
import renderHTML from 'react-render-html';

const Recipe = props =>
<div className="col-sm-12">
    <div className="jumbotron">
        <h3>{props.title}</h3>
        <em>Added by <span className="fa fa-user"></span> { props.created_by } about <span className="fa fa-calendar"></span> <Since date={ props.create_date } /></em>

        <hr/>
        <div>
            <h3>Ingredients</h3>
            {props.ingredients}
            <h3>Steps</h3>
            {renderHTML(props.steps)}
        </div>
    </div>
</div>;

class Home extends Component {
    constructor(){
        super();
        this.state = {
          data:[],
        };
      }

    componentDidMount(){
    fetch('http://127.0.0.1:5000/')
    .then((Response)=>Response.json())
    .then((findresponse)=>{
        this.setState({
        data: findresponse.Recipe_list,
        });
        
    })

    }

    render(){
        return (
            <div className="Home">
                {this.state.data.map(inf =>
                <Recipe key={inf.id} {...inf}/>
                )}

            </div>
    );
    }
}

export default Home