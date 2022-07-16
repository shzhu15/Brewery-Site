import './enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';
import About from '../src/components/Application/About/About.js';


function testRender() {
    const about = shallow(<About/>);
}

test('Testing to see if an About component is rendered', testRender);