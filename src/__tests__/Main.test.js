import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Main from '../components/main';



it('renders without crashing', () => {
  shallow(<Main/>);
});