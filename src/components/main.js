import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
// Import custom components
import Home from './home'
import Register from './register'
import Login from './login'
import Dashboard from './dashboard'
import AddRecipe from './add_recipe'
import EditRecipe from './edit_recipe'

class Main extends Component {
    render(){
        return(
            <Router>
                <div>
                    <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="/">Yummy Recipes</a>
                            </div>
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav">
                                    {/* Change from a to Link */}
                                    <li><Link to="/">Recipes</Link></li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="/dashboard">Dashboard</a></li>
                                    <li><a href="/register">Register</a></li>
                                    <li><a href="/login">Login</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="container">
                        <Route exact path="/" component={Home}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/add_recipe" component={AddRecipe}/>
                        <Route path="/edit_recipe/:id" component={EditRecipe} />
                        <Route exact path="/dashboard" render={() => (
                            sessionStorage.getItem('token') ? (
                                <Redirect to="/"/>
                            ) : (
                                <Home/>
                            )
                            )}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Main