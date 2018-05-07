import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { Header } from '../header';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(
            <Header />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
