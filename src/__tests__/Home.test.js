import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Home from '../components/home';
import toJson from 'enzyme-to-json';

describe('the home component', () => {
    const props = {
        history: {
            push: () => {}
        },
    }
    const wrapper = shallow(<Home {...props}/>);

    it('renders the Home class', () => {
        expect(wrapper.find(".Home")).toHaveLength(1);
    });
    it('renders the jumbotron class', () => {
        expect(wrapper.find(".col-xs-12")).toHaveLength(2);
    });
    it('renders five div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(5);        
    });
    it('renders search bar', () => {
      expect(wrapper.find("#search")).toHaveLength(1);           
    });
    it('renders pagination', () =>{
        wrapper.setState({data:[{'a':'general'}]});
        expect(wrapper.find(".pagination")).toHaveLength(1);
        expect(wrapper.find(".page-link")).toHaveLength(3);
    });
    it('renders search bar', () =>{
        wrapper.setState({showMessage:true});
        expect(wrapper.find("#search-bar")).toHaveLength(1);
    });
    it('renders search input', () =>{
        expect(wrapper.find("#search")).toHaveLength(1);
    });
    it('renders Recipe class', () =>{
        wrapper.setState({data:[{'a':'general'}]});
        expect(wrapper.find("Recipe")).toHaveLength(1);
    });
})
