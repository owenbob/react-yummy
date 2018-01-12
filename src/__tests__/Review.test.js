import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Review from '../components/review';

describe('add recipe component', () => {
    const props = {
        history: {
            push: () => {}
        },
        match:{
            params:{}
        }  
    }
    const wrapper = shallow(<Review {...props}/>);
    const preventDefault = jest.fn();
    
    it('renders the AddRecipe class', () => {
        expect(wrapper.find(".Review")).toHaveLength(1);
    });
    it('renders seven div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(9);        
    });

    it('renders the the add review form and submit data', () =>{
        wrapper.setState({content:"awesome"});
        wrapper.find("#review-form").simulate('submit', {preventDefault});
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(preventDefault).toBeCalled();
    });

    it('render the inputs', () =>{
        expect(wrapper.find("#content")).toHaveLength(1);
    });

    it('renders two buttons jsx elements', () => {
        expect(wrapper.find(".btn")).toHaveLength(4);        
    });
    it('renders btn-group class jsx elements', () => {
        expect(wrapper.find(".btn-group")).toHaveLength(1);        
    });
    it('renders form-group class jsx elements', () => {
        expect(wrapper.find(".form-group")).toHaveLength(2);        
    });
    it('renders jumbotron class jsx elements', () => {
        expect(wrapper.find(".jumbotron")).toHaveLength(2);        
    });
   
})
