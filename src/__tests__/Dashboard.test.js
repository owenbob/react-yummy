import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Dashboard from '../components/dashboard';

it('renders without crashing', () => {
    const props = {
        history: {
            push: () => {}
        },
        location:{
            search: {}
        }  
    }
    shallow(<Dashboard {...props}/>);
    
});