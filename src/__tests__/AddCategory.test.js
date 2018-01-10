import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import AddCategory from '../components/add_category';

it('renders without crashing', () => {
    const props = {
        history: {
            push: () => {}
        }
    }
    shallow(<AddCategory {...props}/>);
});