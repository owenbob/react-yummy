import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddRecipe from '../components/add_recipe';

describe('add recipe component', () => {
    const props = {
        history: {
            push: () => {}
        },
        location:{
            search: {}
        }  
    }
    const wrapper = shallow(<AddRecipe {...props}/>);
    const preventDefault = jest.fn();
    
    it('renders the AddRecipe class', () => {
        expect(wrapper.find(".AddRecipe")).toHaveLength(1);
    });
    it('renders seven div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(7);        
    });

    it('renders the the add recipe form and submit data', () =>{
        wrapper.setState({title:'Awesome recipe', category:'General', steps:'one and two', ingredients:"one and two", status:"public"});
        wrapper.find("#recipe-form").simulate('submit', {preventDefault});
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(preventDefault).toBeCalled();
    });

    it('render the inputs ', () =>{
        expect(wrapper.find("#title")).toHaveLength(1);
        expect(wrapper.find("#category")).toHaveLength(1);
        expect(wrapper.find("#ingredients")).toHaveLength(1);
        expect(wrapper.find("#steps")).toHaveLength(1);
        expect(wrapper.find("#status")).toHaveLength(1);
    });

    it('renders two select jsx elements', () => {
        expect(wrapper.find("select")).toHaveLength(2);        
    });

    it('renders four options jsx elements', () => {
        expect(wrapper.find("option")).toHaveLength(4);        
    });

    it('renders two buttons jsx elements', () => {
        expect(wrapper.find(".btn")).toHaveLength(2);        
    });
   
})
