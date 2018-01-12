import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddCategory from '../components/add_category';

describe('add category component', () => {
    const props = {
        history: {
            push: () => {}
        },
        location:{
            search: {}
        }  
    }
    const wrapper = shallow(<AddCategory {...props}/>);
    const preventDefault = jest.fn();
    
    it('renders the AddCategory class', () => {
        expect(wrapper.find(".AddCategory")).toHaveLength(1);
    });
    it('renders seven div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(5);        
    });

    it('renders the the add category form and submit data', () =>{
        wrapper.setState({cat_name:'General', cat_desc:'General recipes',message:true});
        wrapper.find("#category-form").simulate('submit', {preventDefault});
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(preventDefault).toBeCalled();
    });

    it('render the inputs and hides password', () =>{
        expect(wrapper.find("#cat_name")).toHaveLength(1);
        expect(wrapper.find("#cat_desc")).toHaveLength(1);
        
    });

    it('renders two buttons jsx elements', () => {
        expect(wrapper.find(".btn")).toHaveLength(2);        
    });
    it('renders two jumbotron jsx elements', () => {
        expect(wrapper.find(".jumbotron .col-sm-8")).toHaveLength(1);        
    });
    it('renders two form-group jsx elements', () => {
        expect(wrapper.find(".form-group")).toHaveLength(2);        
    });

    it('renders submit button and cancel button', () => {
        expect(wrapper.find(".btn")).toHaveLength(2); 
        expect(wrapper.find("#submit")).toHaveLength(1);
        expect(wrapper.find("#cancel")).toHaveLength(1);
    });

    it('renders the alert for messages', () => {
        expect(wrapper.find(".alert .alert-danger")).toHaveLength(1);        
    });
    
   
})
