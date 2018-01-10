import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Home from '../components/register';



it('renders without crashing', () => {
  shallow(<Home/>);
});