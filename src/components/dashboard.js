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
          showRecipeMessage:false, 
          showCategoryMessage:false,
          defaultActiveKey:1
        };
    }
    
    componentDidMount(){
        const { history } = this.props;
        if(!localStorage.getItem('isLoggedIn')){
            return history.push('/login')
        }
        http.get(`${url}myrecipes`)
        .then((response)=>{
            this.setState({
                data: response.data.Recipe_list,
                showRecipeMessage:false
                
            });
        })
        .catch((xhr) =>{
            this.setState({showRecipeMessage:true})
        })
    }
    componentWillMount(){
        return http.get(`${url}category`)
        .then((response) =>{
            console.log(response.data.Category_list)
            this.setState({
                catData: response.data.Category_list,
                showCategoryMessage:false,
            });
        })
        .catch((xhr) =>{
            this.setState({showCategoryMessage:true})
        })

    }

    deleteHandler = (i, e) => {
        const { history } = this.props;
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
                history.push('/dashboard')
            }
        );
    };

    deleteCategoryHandler = (i, e) => {
        const { history } = this.props;
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
                history.push('/dashboard')
            }
        );
    };

    render(){
        let loadRecipeTabContent;
        if(this.state.showRecipeMessage){
            loadRecipeTabContent =
            <div>
                <h3 className="display-3">You have no recipes at the moment! <a href="/add_recipe" className="btn btn-success pull-right"> Add Recipe</a></h3>
            </div>
        }else {
            loadRecipeTabContent =
            <div>
                <h3>My recipes <a href="/add_recipe" className="btn btn-success pull-right"> Add Recipe</a></h3>
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
            </div>
        }

        let loadCategoryTabContent;
        if(this.state.showCategoryMessage){
            loadCategoryTabContent =
            <div>
                <h3 className="display-3">You have no categories at the moment! <a href="/add_category" className="btn btn-success pull-right"> Add Category</a></h3>
            </div>
        }else {
            loadCategoryTabContent =
            <div>
                <h3>Categories <a href="/add_category" className="btn btn-success pull-right"> Add Category</a><br/></h3>
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
            </div>
        }

        return (
            <div className="Dashboard">
                <Panel>
                    <Tabs defaultActiveKey={this.state.defaultActiveKey} animation={true} id="noanim-tab-example">
                        <Tab eventKey={1} title="Recipes">
                            {loadRecipeTabContent}
                        </Tab>
                        <Tab eventKey={2} title="Categories">
                            {loadCategoryTabContent}
                        </Tab>
                    </Tabs>
                </Panel>
            </div>
    );
    }
}

export default Dashboard