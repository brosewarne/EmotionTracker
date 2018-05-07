import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { NotFound } from '../not_found';

configure({ adapter: new Adapter() });

describe('<NotFound />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(
            <NotFound />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
