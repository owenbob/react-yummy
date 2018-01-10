import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import AddRecipe from '../components/add_recipe';

it('renders without crashing', () => {
    const props = {
        history: {
            push: () => {}
        }
    }
    shallow(<AddRecipe {...props}/>);
});