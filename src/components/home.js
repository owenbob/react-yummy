import React, { Component } from 'react';
import Since from 'react-since';
import renderHTML from 'react-render-html';
import url from './config'

const Recipe = props =>
<div className="col-sm-12">
    <div className="jumbotron">
        <h3>{props.title}</h3>
        <em>Added by <span className="fa fa-user"></span> { props.created_by } about <span className="fa fa-calendar"></span> <Since date={ props.create_date } /> | Category: { props.category}
        <a href={'/recipe/' + props.recipe_id} className="btn btn-success pull-right">Review</a>
        </em>

        <hr/>
        <div>
            <h3>Ingredients</h3>
            {props.ingredients}
            <h3>Steps</h3>
            <small>{renderHTML(props.steps)}</small><br/><br/>
            <div className="btn-group">
                {/* <button type="button" className="btn btn-default btn-xs"><span className="fa fa-comment-o"></span> Reviews:{props.reviews}</button> */}
                <button type="button" className="btn btn-default btn-xs"><span className="fa fa-thumbs-o-up"></span> Upvotes:{props.upvotes}</button>
            </div>
        </div>
    </div>
</div>;

class Home extends Component {
    constructor(){
        super();
        this.state = {
            data:[],
            showMessage:true, 
            q:'', 
            page:1, 
            has_next:false, 
            next_page:'',
            previous_page:'', 
            disablePrevious:'', 
            disableNext:'',
            url: url+'?page=1'
        };
      }

    componentDidMount(){
    fetch(this.state.url)
    .then((Response)=>Response.json())
    .then((findresponse)=>{
        if(findresponse.Recipe_list){
            console.log(findresponse)
            this.setState({
            data: findresponse.Recipe_list,
            showMessage:false
            });
        }
        if(findresponse.previous_page === 'Null'){
            // console.log(findresponse.previous_page)
            this.setState({
                disablePrevious: 'page-item disabled',
                previous_page: ''
                });
        }else{
            this.setState({
                previous_page: findresponse.previous_page,
                disablePrevious: 'page-item'
                });
        }
        if(findresponse.next_page === 'Null'){
            this.setState({
                disableNext: 'page-item disabled',
                next_page: '',
                });
        }else{
            this.setState({
                next_page: findresponse.next_page,
                disableNext: 'page-item'
                });
        }
    })

    }
    nextPage() {
        fetch(this.state.next_page, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': sessionStorage.getItem('token'),
            }
        })
        .then((Response)=>Response.json())
        .then((findresponse)=>{
            if(findresponse.Recipe_list){
                console.log(findresponse)
                this.setState({
                data: findresponse.Recipe_list,
                showMessage:false
                });
            }
            if(findresponse.previous_page === 'Null'){
                // console.log(findresponse.previous_page)
                this.setState({
                    disablePrevious: 'page-item disabled',
                    previous_page: ''
                    });
            }else{
                this.setState({
                    previous_page: findresponse.previous_page,
                    disablePrevious: 'page-item'
                    });
            }
            if(findresponse.next_page === 'Null'){
                this.setState({
                    disableNext: 'page-item disabled',
                    next_page: '',
                    });
            }else{
                this.setState({
                    next_page: findresponse.next_page,
                    disableNext: 'page-item'
                    });
            }
            
        })
        .catch(
            (error) => {
                console.log(error)
            }
        );
    };

    previousPage() {
        fetch(this.state.previous_page, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': sessionStorage.getItem('token'),
            }
        })
        .then((Response)=>Response.json())
        .then((findresponse)=>{
            if(findresponse.Recipe_list){
                console.log(findresponse)
                this.setState({
                data: findresponse.Recipe_list,showMessage:false
                });
            }
            if(findresponse.previous_page === 'Null'){
                // console.log(findresponse.previous_page)
                this.setState({
                    disablePrevious: 'page-item disabled',
                    previous_page: ''
                    });
            }else{
                this.setState({
                    previous_page: findresponse.previous_page,
                    disablePrevious: 'page-item'
                    });
            }
            if(findresponse.next_page === 'Null'){
                this.setState({
                    disableNext: 'page-item disabled',
                    next_page: '',
                    });
            }else{
                this.setState({
                    next_page: findresponse.next_page,
                    disableNext: 'page-item'
                    });
            }
            
        })
        .catch(
            (error) => {
                console.log(error)
            }
        );
    };
    
    handleSearch = (event) => {
        event.preventDefault();
        this.setState({
            q: event.target.value
        });
        let localurl = url+'?q='+this.state.q
        fetch(localurl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': sessionStorage.getItem('token'),
            }
        })
        .then((Response)=>Response.json())
        .then((findresponse)=>{
            if(findresponse.Recipe_list){
                console.log(findresponse)
                this.setState({
                data: findresponse.Recipe_list,
                showMessage:false,
                });
            
            }else{
                this.setState({
                    showMessage:true
                    });
            }
        })
        .catch(
            (error) => {
                this.props.history.push(this.state.url)
            }
        );

        
    };



    render(){
        if(this.state.showMessage)return <div className="jumbotron">
        <p className="lead">No recipes matched your query.</p>
        <hr className="my-4"/>
        <p>You can view other people's recipes and upvote the ones you like.</p>
        <p className="lead">
            <a className="btn btn-primary btn-lg" href="/" role="button">Go back</a>
        </p>
        </div>
        return (
            <div className="Home">
                <div className="col-sm-6 pull-right">
                    <div className="input-group mb-2 mb-sm-0">
                        <div className="input-group-addon">Search</div>
                        <input type="text" className="form-control" onChange={this.handleSearch} placeholder="Enter your search key words here!"/>
                    </div>
                </div><br/>
                
                {this.state.data.map(inf =>
                <Recipe key={inf.recipe_id} {...inf}/>
                )}
                <footer>
                <div className="col-sm-4 pull-right">
                <ul className="pagination pagination">
                    <li className={this.state.disablePrevious}>
                    <a className="page-link" onClick={() => this.previousPage()}>Previous</a>
                    </li>
                    <li className={this.state.disableNext}>
                    <a className="page-link" onClick={() => this.nextPage()}>Next</a>
                    </li>
                </ul>
                </div>
                </footer>
                
            </div>
    );
    }
}

export default Home