import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { HomePage } from '../home';

configure({ adapter: new Adapter() });

describe('<HomePage />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(
            <HomePage featureType="characters" />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
