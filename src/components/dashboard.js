import React, { Component } from 'react';
import { Tabs, Tab, Panel, Table } from 'react-bootstrap';
import url, { http } from './config'
import Categories from './categories';
import Recipe from './recipes';
import initialState from './initialState';
const queryString = require('query-string');

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {...initialState};
    }
    componentDidMount() {
        const { history } = this.props;
        if (!localStorage.getItem('isLoggedIn')) {
            return history.push('/login')
        }
        http.get(`${url}myrecipes?page=${this.state.page}`)
            .then((response) => {
                this.setState({
                    data: response.data.Recipe_list,
                    showRecipeMessage: false,
                    pages: response.data.total_pages
                });
                if (response.data.previous_page === 'Null') {
                    this.setState({ disablePrevious: 'page-item disabled', previous_page: '' });
                } else {
                    this.setState({
                        previous_page: response.data.previous_page,
                        disablePrevious: 'page-item'
                    });
                }
                if (response.data.next_page === 'Null') {
                    this.setState({
                        disableNext: 'page-item disabled',
                        next_page: '',
                    });
                } else {
                    this.setState({ next_page: response.data.next_page, disableNext: 'page-item' });
                }
            })
            .catch((xhr) => {
                this.setState({ showRecipeMessage: true })
            })
    }

    nextPage() {
        if (this.state.next_page)
            return http.get(this.state.next_page)
                .then((response) => {
                    if (response.data.Recipe_list) {
                        this.setState({
                            data: response.data.Recipe_list,
                            showMessage: false,
                            page: this.state.next_page[this.state.next_page.length - 1]
                        });
                    }
                    if (response.data.previous_page === 'Null') {
                        this.setState({ disablePrevious: 'page-item disabled', previous_page: '' });
                    } else {
                        this.setState({
                            previous_page: response.data.previous_page,
                            disablePrevious: 'page-item',

                        });
                    }
                    if (response.data.next_page === 'Null') {
                        this.setState({ disableNext: 'page-item disabled', next_page: '' });
                    } else {
                        this.setState({ next_page: response.data.next_page, disableNext: 'page-item' });
                    }

            })
    };

    previousPage() {
        if (this.state.previous_page)
            return http.get(this.state.previous_page)
                .then((response) => {
                    if (response.data.Recipe_list) {
                        this.setState({
                            data: response.data.Recipe_list,
                            showMessage: false,
                            page: this.state.previous_page[this.state.previous_page.length - 1]
                        });
                    }
                    if (response.data.previous_page === 'Null') {
                        this.setState({ disablePrevious: 'page-item disabled', previous_page: '' });
                    } else {
                        this.setState({ previous_page: response.data.previous_page, disablePrevious: 'page-item'});
                    }
                    if (response.data.next_page === 'Null') {
                        this.setState({ disableNext: 'page-item disabled', next_page: ''});
                    } else {
                        this.setState({ next_page: response.data.next_page, disableNext: 'page-item' });
                    }

           })
    };
    
    componentWillMount() {
        return http.get(`${url}category?page=${this.state.cat_page}`)
            .then((response) => {
                this.setState({
                    catData: response.data.Category_list,
                    showCategoryMessage: false,
                    cat_pages: response.data.total_pages
                });
                if (response.data.previous_page === 'Null') {
                    this.setState({
                        cat_disablePrevious: 'page-item disabled',
                        cat_previous_page: ''
                    });
                } else {
                    this.setState({
                        cat_previous_page: response.data.previous_page,
                        cat_disablePrevious: 'page-item'
                    });
                }
                if (response.data.next_page === 'Null') {
                    this.setState({
                        cat_disableNext: 'page-item disabled',
                        cat_next_page: '',
                    });
                } else {
                    this.setState({
                        cat_next_page: response.data.next_page,
                        cat_disableNext: 'page-item'
                    });
                }
            })
            .catch((xhr) => {
                this.setState({ showCategoryMessage: true })
            })

    }

    nextCatPage() {
        if (this.state.cat_next_page)
            return http.get(this.state.cat_next_page)
                .then((response) => {
                    if (response.data.Category_list) {
                        this.setState({
                            catData: response.data.Category_list,
                            showCategoryMessage: false,
                            cat_page: this.state.cat_next_page[this.state.cat_next_page.length - 1]
                        });
                    }
                    if (response.data.previous_page === 'Null') {
                        this.setState({
                            cat_disablePrevious: 'page-item disabled',
                            cat_previous_page: ''
                        });
                    } else {
                        this.setState({
                            cat_previous_page: response.data.previous_page,
                            cat_disablePrevious: 'page-item',

                        });
                    }
                    if (response.data.next_page === 'Null') {
                        this.setState({
                            cat_disableNext: 'page-item disabled',
                            cat_next_page: '',
                        });
                    } else {
                        this.setState({
                            cat_next_page: response.data.next_page,
                            cat_disableNext: 'page-item'
                        });
                    }

                })
                .catch(
                (xhr) => {
                    console.log(xhr)
                }
                );
    };

    previousCatPage() {
        if (this.state.cat_previous_page)
            return http.get(this.state.cat_previous_page)
                .then((response) => {
                    if (response.data.Category_list) {
                        this.setState({
                            catData: response.data.Category_list,
                            showCategoryMessage: false,
                            cat_page: this.state.cat_previous_page[this.state.cat_previous_page.length - 1]
                        });
                    }
                    if (response.data.previous_page === 'Null') {
                        this.setState({
                            cat_disablePrevious: 'page-item disabled',
                            cat_previous_page: ''
                        });
                    } else {
                        this.setState({
                            cat_previous_page: response.data.previous_page,
                            cat_disablePrevious: 'page-item'
                        });
                    }
                    if (response.data.next_page === 'Null') {
                        this.setState({
                            cat_disableNext: 'page-item disabled',
                            cat_next_page: '',
                        });
                    } else {
                        this.setState({
                            cat_next_page: response.data.next_page,
                            cat_disableNext: 'page-item'
                        });
                    }

                })
                .catch(
                (error) => {
                    console.log(error)
                }
                );
    };

    handleRecipeSearch = (event) => {
        event.preventDefault();
        this.setState({
            q: event.target.value,
            page: 1
        });
        if (this.state.q) {
            let localurl = url + 'myrecipes?q=' + this.state.q + '&page=' + this.state.page
            return http.get(localurl)
                .then((response) => {
                    console.log(response.data)
                    this.setState({
                        data: response.data.Recipe_list,
                        showMessage: false,
                        pages: response.data.total_pages
                    });
                    if (response.data.previous_page === 'Null') {
                        this.setState({
                            disablePrevious: 'page-item disabled',
                            previous_page: ''
                        });
                    } else {
                        this.setState({
                            previous_page: response.data.previous_page,
                            disablePrevious: 'page-item'
                        });
                    }
                    if (response.data.next_page === 'Null') {
                        this.setState({
                            disableNext: 'page-item disabled',
                            next_page: '',
                        });
                    } else {
                        this.setState({
                            next_page: response.data.next_page,
                            disableNext: 'page-item'
                        });
                    }
                })
                .catch((xhr) => {
                    this.setState({
                        showRecipeSearchMessage: true,
                        data: []
                    });
                }
                );
        }
    };

    handleCategorySearch = (event) => {
        event.preventDefault();
        this.setState({
            q: event.target.value,
            page: 1
        });
        if (this.state.q) {
            let localurl = url + 'category?q=' + this.state.q + '&page=' + this.state.page
            return http.get(localurl)
                .then((response) => {
                    console.log(response.data)
                    this.setState({
                        catData: response.data.Category_list,
                        showCategoryMessage: false,
                        pages: response.data.total_pages
                    });
                    if (response.data.previous_page === 'Null') {
                        this.setState({
                            cat_disablePrevious: 'page-item disabled',
                            cat_previous_page: ''
                        });
                    } else {
                        this.setState({
                            cat_previous_page: response.data.previous_page,
                            cat_disablePrevious: 'page-item'
                        });
                    }
                    if (response.data.next_page === 'Null') {
                        this.setState({
                            cat_disableNext: 'page-item disabled',
                            cat_next_page: '',
                        });
                    } else {
                        this.setState({
                            cat_next_page: response.data.next_page,
                            cat_disableNext: 'page-item'
                        });
                    }
                })
                .catch((xhr) => {
                    this.setState({
                        showCategorySearchMessage: true,
                        catData: []
                    });
                }
                );
        }
    };

    deleteHandler = (i, e) => {
        const { history } = this.props;
        return http.delete(`${url}${i}`)
            .then((response) => {
                let data = this.state.data;
                let index = data.findIndex(x => x.recipe_id === i);
                data.splice(index, 1);
                this.setState({
                    data: data
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
            .then((response) => {
                let catData = this.state.catData;
                let index = catData.findIndex(x => x.cat_id === i);
                catData.splice(index, 1);
                this.setState({
                    catData: catData
                });


            })
            .catch((xhr) => {
                this.setState({
                    message: xhr.response.data.message
                });
                history.push('/dashboard?tab=2')
            }
            );
    };

    render() {
        const {
            data,disablePrevious, disableNext, page, pages, catData, cat_disableNext,
            cat_disablePrevious, cat_page, cat_pages, showCategoryMessage,
            showCategorySearchMessage,showRecipeMessage, showRecipeSearchMessage,message
        }=this.state
        let tab = null
        const parsed = queryString.parse(this.props.location.search);
        if (parsed.tab) {
            tab = parseInt(parsed.tab, 10)
        } else {
            tab = 1
        }
        let loadRecipePagination;
        let loadCategoryPagination;
        if (data[0]) {
            loadRecipePagination =
                <div className="col-xs-11 col-sm-4 pull-right" id="pagination">
                    <ul className="pagination">
                        <li className={disablePrevious}>
                            <a className="page-link" onClick={() => this.previousPage()}>Previous</a>
                        </li>
                        <li className={disableNext}>
                            <a className="page-link" onClick={() => this.nextPage()}>Next</a>
                            <a className="page-link">Showing {page} of {pages}</a>
                        </li>

                    </ul>
                </div>
        }
        if (catData[0]) {
            loadCategoryPagination =
                <div className="col-xs-11 col-sm-4 pull-right" id="pagination">
                    <ul className="pagination">
                        <li className={cat_disablePrevious}>
                            <a className="page-link" onClick={() => this.previousCatPage()}>Previous</a>
                        </li>
                        <li className={cat_disableNext}>
                            <a className="page-link" onClick={() => this.nextCatPage()}>Next</a>
                            <a className="page-link">Showing {cat_page} of {cat_pages}</a>
                        </li>

                    </ul>
                </div>
        }
        let loadRecipeTabContent;
        if (showRecipeMessage) {
            loadRecipeTabContent =
                <div className="alert alert-info col-sm-8" id="no-recipes">
                    <p>You have no recipes at the moment!<a href="/add_recipe" className="btn btn-primary pull-right"> Add Recipe</a></p>
                </div>


        }
        else if (showRecipeSearchMessage) {
            loadRecipeTabContent =
                <div className="alert alert-info col-sm-8" id="no-recipes">
                    <p>No recipes matched your query.<a href="/dashboard?tab=1" className="btn btn-primary pull-right"> Return</a></p>
                </div>
        }
        else {
            loadRecipeTabContent =
                <div>
                    <h3>My recipes <a href="/add_recipe" className="btn btn-success pull-right"> Add Recipe</a>
                        <div className="col-xs-12 col-sm-6 pull-right">
                            <div className="input-group mb-2 mb-sm-0">
                                <div className="input-group-addon">Search</div>
                                <input type="text" className="form-control" onChange={this.handleRecipeSearch} onKeyUp={this.handleRecipeSearch} placeholder="Enter your search key words here!" />
                            </div>
                        </div>
                    </h3>
                    <Table striped bordered condensed hover responsive>
                        <tbody id="tbody">
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

                            {data.map((inf, index) =>
                                <Recipe id={index + 1} key={inf.recipe_id}{...inf} deleteHandler={this.deleteHandler} />
                            )}
                        </tbody>
                    </Table>
                </div>
        }

        let loadCategoryTabContent;
        if (showCategoryMessage) {
            loadCategoryTabContent =
                <div className="alert alert-info col-sm-8" id="no-recipes">
                    <p>You have no categories at the moment!<a href="/add_category" className="btn btn-primary pull-right"> Add Category</a></p>
                </div>
        }
        else if (showCategorySearchMessage) {
            loadCategoryTabContent =
                <div className="alert alert-info col-sm-8" id="no-recipes">
                    <p>No recipes matched your query.<a href="/dashboard?tab=2" className="btn btn-primary pull-right"> Return</a></p>
                </div>
        }
        else {
            loadCategoryTabContent =
                <div>
                    <h3>Categories<a href="/add_category" className="btn btn-success pull-right"> Add Category</a>
                        <div className="col-xs-12 col-sm-6 pull-right">
                            <div className="input-group mb-2 mb-sm-0">
                                <div className="input-group-addon">Search</div>
                                <input type="text" className="form-control" onChange={this.handleCategorySearch} onKeyUp={this.handleCategorySearch} placeholder="Enter your search key words here!" />
                            </div>
                        </div>
                    </h3>

                    <Table striped bordered condensed hover responsive>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Author</th>
                                <th>Date&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<label className="label label-danger">{message}</label></th>
                                <th></th>
                                <th></th>
                            </tr>

                            {catData.map((inf, index) =>
                                <Categories category_id={index + 1} key={index + 1}{...inf} deleteCategoryHandler={this.deleteCategoryHandler} />
                            )}

                        </tbody>
                    </Table>
                </div>
        }

        return (
            <div className="Dashboard">
                <Panel>
                    <Tabs defaultActiveKey={tab} animation={true} onSelect={this.handleCategoryPagination} id="noanim-tab-example">
                        <Tab eventKey={1} title="Recipes">
                            {loadRecipeTabContent}
                            {loadRecipePagination}
                        </Tab>
                        <Tab eventKey={2} title="Categories">
                            {loadCategoryTabContent}
                            {loadCategoryPagination}
                        </Tab>
                    </Tabs>
                </Panel>
            </div>
        );
    }
}

export default Dashboard