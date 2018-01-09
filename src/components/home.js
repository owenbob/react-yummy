import React, { Component } from 'react';
import Since from 'react-since';
import url from './config'

const Recipe = props =>
    <div className="jumbotron">
        <h3>{props.title}</h3>
        <em>Added by <span className="fa fa-user"></span> { props.created_by } about <span className="fa fa-calendar"></span> <Since date={ props.create_date } /> | Category: { props.category}
        <a href={'/recipe/' + props.recipe_id} className="btn btn-primary pull-right">Review</a>
        </em>

        <hr/>
        <div>
            <h3>Ingredients</h3>
            <small>{props.ingredients}</small>
            <h3>Steps</h3>
            <small>{props.steps}</small><br/><br/>
            <div className="btn-group">
                {/* <button type="button" className="btn btn-default btn-xs"><span className="fa fa-comment-o"></span> Reviews:{props.reviews}</button> */}
                <button type="button" className="btn btn-default btn-xs"><span className="fa fa-thumbs-o-up"></span> Upvotes:{props.upvotes}</button>
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
            url: url+'?page=1',
            pages:null
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
            showMessage:false,
            pages: findresponse.total_pages
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
                showMessage:false,
                page:this.state.next_page[this.state.next_page.length -1]
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
                    disablePrevious: 'page-item',
                    
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
                    data: findresponse.Recipe_list,
                    showMessage:false,
                    page:this.state.previous_page[this.state.previous_page.length -1]
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
                disableNext: 'page-item disabled',
                disablePrevious: 'page-item  disabled',
                next_page:'',
                previous_page:''
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
        let loadNavBarContent;
        if (this.state.showMessage) {
           loadNavBarContent =
           <div className="Home">
                <p className="lead">No recipes matched your query.</p>
            </div>
        }
        return (
            <div className="Home">
                <div className="col-xs-6 pull-right">
                    <div className="input-group mb-2 mb-sm-0">
                        <div className="input-group-addon">Search</div>
                        <input type="text" className="form-control" onChange={this.handleSearch} onKeyUp={this.handleSearch} placeholder="Enter your search key words here!"/>
                    </div>
                </div>
                <div className="col-xs-12">
                {loadNavBarContent}
                <hr/>
                    {this.state.data.map(inf =>
                    <Recipe key={inf.recipe_id} {...inf}/>
                    )}
                </div>
                <div className="col-xs-3 pull-right">
                    <ul className="pagination">
                        <li className={this.state.disablePrevious}>
                        <a className="page-link" onClick={() => this.previousPage()}>Previous</a>
                        </li>
                        <li className={this.state.disableNext}>
                        <a className="page-link" onClick={() => this.nextPage()}>Next</a>
                        <a className="page-link">Showing {this.state.page} of {this.state.pages}</a>
                        </li>
                        
                    </ul>
                    
                
                </div>
                
                
            </div>
    );
    }
}

export default Home