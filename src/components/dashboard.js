import React, { Component } from 'react';
import hashHistory from 'react'

const Recipe = props =>
    <tr>
        <td>{props.id}</td>
        <td>{props.title}</td>
        <td>{props.created_by}</td>
        <td>{props.create_date}</td>
        <td><a href='/edit_recipe/:props.id' className="btn btn-default pull-right"> Edit</a></td>
        <td>
            <form action="{{ url_for('delete_recipe',id=props.id) }}" method="POST">
                <input type="hidden" name="_method" value="DELETE"/>
                <input type="submit" value="Delete" className="btn btn-danger"/>
            </form>
        </td>
    </tr>
           ;

class Dashboard extends Component {

    constructor(){
        super();
        this.state = {
          data:[],
        };
      }

    componentDidMount(){
        fetch('http://127.0.0.1:5000/dashboard', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': sessionStorage.getItem('token'),
            }
        })
        .then((Response)=>Response.json())
        .then((findresponse)=>{
            this.setState({
            data: findresponse.Recipe_list,
            });
            
        })

    }

    render(){
        return (
            <div className="Dashboard">
                <h3> Welcome!!! {sessionStorage.getItem('user')} !!!</h3><br/>
                <h3>My recipes</h3>
                <a href="/add_recipe" className="btn btn-success pull-right"> Add Recipe</a><br/>
                <hr/>
                <table className="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                        
                            {this.state.data.map(inf =>
                            <Recipe key={inf.id} {...inf}/>
                            )}
                     
                    </tbody>
                </table>

            </div>
    );
    }
}

export default Dashboard