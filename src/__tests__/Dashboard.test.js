import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Home from '../components/home';
import Dashboard from '../components/dashboard';

describe('the dashboard component', () => {
    const props = {
        history: {
            push: () => {}
        },
        location: {
            search: () => {}
        }
    }
    const wrapper = shallow(<Dashboard {...props}/>);

    it('renders the Dashboard class', () => {
        expect(wrapper.find(".Dashboard")).toHaveLength(1);
    });
    it('renders five div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(3);        
    });
    
    it('renders a no recipes message', () =>{
        wrapper.setState({showRecipeMessage:true});
        expect(wrapper.find(".display-3")).toHaveLength(1);
        expect(wrapper.find(".btn")).toHaveLength(2);
    });
    it('renders a recipes tab', () =>{
        wrapper.setState({showRecipeMessage:false});
        expect(wrapper.find("a")).toHaveLength(2);
        expect(wrapper.find(".btn")).toHaveLength(2);
        expect(wrapper.find("Table")).toHaveLength(2);
        
    });it('renders a no recipes message', () =>{
        wrapper.setState({showRecipeMessage:true});
        expect(wrapper.find(".display-3")).toHaveLength(1);
        expect(wrapper.find(".btn")).toHaveLength(2);
    });
    it('renders a recipes tab', () =>{
        wrapper.setState({showRecipeMessage:false});
        expect(wrapper.find("a")).toHaveLength(2);
        expect(wrapper.find(".btn")).toHaveLength(2);
        expect(wrapper.find("Table")).toHaveLength(2);
        
    });it('renders a no recipes message', () =>{
        wrapper.setState({showRecipeMessage:true});
        expect(wrapper.find(".display-3")).toHaveLength(1);
        expect(wrapper.find(".btn")).toHaveLength(2);
    });
    it('renders a recipes tab', () =>{
        wrapper.setState({showRecipeMessage:false});
        expect(wrapper.find("a")).toHaveLength(2);
        expect(wrapper.find(".btn")).toHaveLength(2);
        expect(wrapper.find("Table")).toHaveLength(2);   
    });
    it('renders a no categories message', () =>{
        wrapper.setState({showCategoryMessage:true});
        expect(wrapper.find(".display-3")).toHaveLength(1);
        expect(wrapper.find(".btn")).toHaveLength(2);
    });
    it('renders a categories tab', () =>{
        wrapper.setState({showCategoryMessage:false});
        expect(wrapper.find("a")).toHaveLength(2);
        expect(wrapper.find(".btn")).toHaveLength(2);
        expect(wrapper.find("Table")).toHaveLength(2);
       
        
    });
    
})
