import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Login from '../components/Login';

it('renders without crashing', () => {
  shallow(<Login/>);
});