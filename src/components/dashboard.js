import React, { Component } from 'react';
import { Tabs, Tab, Panel, Table } from 'react-bootstrap';
import  url, { http } from './config'

const Recipe = props =>
    <tr>
        <td>{props.id}</td>
        <td>{props.title}</td>
        <td>{props.category}</td>
        <td>{props.created_by}</td>
        <td>{props.status}</td>
        <td>{props.create_date}</td>
        <td><a href={'/edit_recipe/' + props.recipe_id} className="btn btn-default pull-right"> Edit</a></td>
        <td><button onClick={() => props.deleteHandler(props.recipe_id)} className="btn btn-danger"> Delete</button></td>
    </tr>

const Categories = props =>
<tr>
    <td>{props.category_id}</td>
    <td>{props.cat_name}</td>
    <td>{props.created_by}</td>
    <td>{props.create_date}</td>
    <td><a href={'/edit_category/' + props.cat_id} className="btn btn-default pull-right"> Edit</a></td>
    <td><button onClick={() => props.deleteCategoryHandler(props.cat_id)} className="btn btn-danger"> Delete</button></td>
</tr>

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
          data:[],
          catData:[], 
          showMessage:false, 
          defaultActiveKey:1
        };
    }
    
    componentDidMount(){
        const { history } = this.props;
        if(!sessionStorage.getItem('isLoggedIn')){
            return history.push('/login')
        }
        return http.get(`${url}myrecipes`)
        .then((response)=>{
            this.setState({
                data: response.data.Recipe_list,
                showMessage:false
                
            });   
            console.log('second')
        })
        .catch((xhr) =>{
            this.setState({showMessage:true})
        })
    }
    componentWillMount(){
        return http.get(`${url}category`)
        .then((response) =>{
            console.log(response.data.Category_list)
            this.setState({
                catData: response.data.Category_list
            });
        })

    }

    deleteHandler = (i, e) => {
        return http.delete(`${url}${i}`)
        .then((response)=>{
            let data = this.state.data;
            let index =data.findIndex(x =>x.recipe_id === i);
            data.splice(index, 1);
            this.setState({
                data:data
            });  
        })
        .catch((xhr) => {
                this.props.history.push('/dashboard')
            }
        );
    };

    deleteCategoryHandler = (i, e) => {
        return http.delete(`${url}category/${i}`)
        .then((response)=>{
            let catData = this.state.catData;
            let index =catData.findIndex(x =>x.cat_id === i);
            catData.splice(index, 1);
            this.setState({
                catData:catData
            });
            
        })
        .catch((xhr) => {
                this.props.history.push('/dashboard')
            }
        );
    };

    render(){
        if(this.state.showMessage){
            console.log('first')
        return(
        <div className="Dashboard">
        <h3 className="display-3">Hello {sessionStorage.getItem('user')}, you have no recipes at the moment!</h3>
        <p className="lead">We shall help you create,edit and publish your recipes.</p>
        <hr className="my-4"/>
        <p>You can view other people's recipes and upvote the ones you like.</p>
        <p className="lead">
            <a className="btn btn-primary btn-lg" href="/add_recipe" role="button">Create a recipe now</a>
        </p>
        </div>
        )
    }
        return (
            <div className="Dashboard">
                <Panel>
                    <Tabs defaultActiveKey={this.state.defaultActiveKey} animation={true} id="noanim-tab-example">
                        <Tab eventKey={1} title="Recipes">
                            <h3>My recipes <a href="/add_recipe" className="btn btn-success pull-right"> Add Recipe</a></h3>
                            
                            <center><span className="label label-success"></span></center>
                            <Table striped bordered condensed hover responsive>
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Author</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    
                                        {this.state.data.map((inf, index)=>
                                        <Recipe id={index+1} key={inf.recipe_id}{...inf} deleteHandler={this.deleteHandler}/>
                                        )}
                                
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey={2} title="Categories">
                            <h3>My Categories <a href="/add_category" className="btn btn-success pull-right"> Add Category</a><br/></h3>
                            <center><span className="label label-success"></span></center>
                            <Table striped bordered condensed hover responsive>
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Author</th>
                                        <th>Date</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    
                                        {this.state.catData.map((inf, index) =>
                                        <Categories category_id={index + 1} key={index + 1}{...inf}  deleteCategoryHandler={this.deleteCategoryHandler}/>
                                        )}
                                
                                </tbody>
                            </Table>
                        </Tab>
                    </Tabs>
                </Panel>
            </div>
    );
    }
}

export default Dashboard