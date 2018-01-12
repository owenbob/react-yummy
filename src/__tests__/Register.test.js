import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Register from '../components/Register';

describe('register component', () => {
    const wrapper = shallow(<Register/>);
    const preventDefault = jest.fn();

    it('renders the Register class', () => {   
        expect(wrapper.find(".Register")).toHaveLength(1);
    });

    it('renders five div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(8);        
    });
    it('renders the sign up form and submit data', () =>{
        wrapper.setState({name:'asiimwe', username:'elizei', email:'geofrocker2@gmail.com', passwordCandidate:"psalmsk", password:"psalms"});
        wrapper.find("#signup-form").simulate('submit', {preventDefault});
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(preventDefault).toBeCalled();
    });

    it('render the two inputs', () =>{
        expect(wrapper.find("#password")).toHaveLength(1);
        expect(wrapper.find("#cpassword")).toHaveLength(1);
        expect(wrapper.find("#username")).toHaveLength(1);
        expect(wrapper.find("#name")).toHaveLength(1);
        expect(wrapper.find("#email")).toHaveLength(1);
        wrapper.find("#password").simulate('change', {target: {value: 'psalms'}});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('make sure the email is valid', () =>{
      wrapper.find("#email").simulate('change', {target: {value: 'geofrocker@gmail.com'}});
      expect(toJson(wrapper)).toMatchSnapshot();
  })


    
})
