import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Review from '../components/review';

it('renders without crashing', () => {
    const props = {
        history: {
            push: () => {}
        },
        match:{
            params:{}
        }
    }
    
    shallow(<Review {...props}/>);

});