import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import EditCategory from '../components/edit_category';

it('renders without crashing', () => {
    const props = {
        history: {
            push: () => {}
        },
        match: {
            params:{}
        }
    }
    
    shallow(<EditCategory {...props}/>);
});