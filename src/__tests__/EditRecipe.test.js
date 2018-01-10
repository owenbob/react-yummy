import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import EditRecipe from '../components/edit_recipe';

it('renders without crashing', () => {
    const props = {
        history: {
            push: () => {}
        },
        match:{
            params:{}
        }
    }
    
    shallow(<EditRecipe {...props}/>);
});