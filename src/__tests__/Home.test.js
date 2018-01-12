import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Home from '../components/home';
import toJson from 'enzyme-to-json';

describe('the home component', () => {
    const props = {
        history: {
            push: () => {}
        }
    }
    const wrapper = shallow(<Home {...props}/>);

    it('renders the Home class', () => {
        expect(wrapper.find(".Home")).toHaveLength(1);
    });
    it('renders five div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(5);        
    });
    it('renders pagination with two page links', () => {
      expect(wrapper.find(".pagination")).toHaveLength(); 
      expect(wrapper.find(".page-link")).toHaveLength(2);               
  });
   
})
