import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Navbar, MenuItem, NavDropdown, Nav} from 'react-bootstrap';
// Import custom components
import Home from './home'
import Register from './register'
import Login from './login'
import Dashboard from './dashboard'
import AddRecipe from './add_recipe'
import EditRecipe from './edit_recipe'
import AddCategory from './add_category'
import EditCategory from './edit_category'
import Review from './Review'
import NotFound from './NotFound'


class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
           username:sessionStorage.getItem('isLoggedIn'),
           user:sessionStorage.getItem('user'),
          };
    }
    handlelogout = (e) =>{
        sessionStorage.clear()
        this.setState ({username:null})
        window.location.reload()

    }
    render(){
        let loadNavBarContent;
        if (this.state.username) {
           loadNavBarContent =
            <Nav pullRight>
                <NavDropdown title={'Logged in as '+this.state.user} id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1} href="/dashboard">Dashboard</MenuItem>
                    <MenuItem eventKey={3.2} onClick={this.handlelogout}>Logout</MenuItem>
                </NavDropdown>
            </Nav>
        }else {
            loadNavBarContent = 
            <ul className="nav navbar-nav navbar-right">
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
            </ul>
        }
        return(
            <Router>
                <div>
                    <Navbar inverse collapseOnSelect fixedTop>
                        <Navbar.Header>
                            <Navbar.Brand>
                            <a href="/"><span><img src={require('../static/img/andela.png')} width='24' alt="logo"/></span>
                            Yummy Recipes</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            {loadNavBarContent}   
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/add_recipe" component={AddRecipe}/>
                        <Route path="/edit_recipe/:recipe_id" component={EditRecipe} />
                        <Route path="/add_category" component={AddCategory} />
                        <Route path="/edit_category/:cat_id" component={EditCategory} />
                        <Route path="/recipe/:recipe_id" component={Review} />
                        <Route path="*" exact={true} component={NotFound} />
                    </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Main