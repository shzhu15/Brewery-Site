import './enzyme.config.js';
import React from 'react';
import {mount, shallow} from 'enzyme';
import Search from '../src/components/Application/Itinerary/Search.js';
import Calculator from "./Calculator.test";
import Legs from "./Legs.test";

const itineraryProps = {
    'planOptions': {
        'units': {'miles': 3959.0, 'kilometers': 6371.0, 'nautical miles': 3440},
        'activeUnit': 'miles',
    },
    'itinerarySave': {
        'fileInput': '',
        'map': 'undefined',
        'markersLayer': '',
        'requestType': 'itinerary',
        'requestVersion': 3,
        'options': {
            'title': 'My Trip',
            'earthRadius': '3958.761316',
            'optimization': 'none',
        },
        'places': [],
        'total': 0,
        'found': [],
        'copyPlaces': [],
        'distances': [],
    },
    'updateSave': () => {
    },
}

function testRender() {
    const search = mount(<Search/>);
}


function testCreateInputFields() {
    const page = shallow(<Search options={itineraryProps.planOptions}
                                 itinerarySave={itineraryProps.itinerarySave}/>);

    let numberOfInputs = page.find('Input').length;
    expect(numberOfInputs).toEqual(5);

    let actualInputs = [];
    page.find('Input').
    map((input) => actualInputs.push(input.prop('name')));

    let expectedInputs = [
        'find',
        'narrow',
        'region',
        'country',
        'continent',
    ];

    expect(actualInputs).toEqual(expectedInputs);
}

function testcreatetable() {
    const itinPage = mount(<Search options={itineraryProps.planOptions}
                                 itinerarySave={itineraryProps.itinerarySave}
                                 config={null}
                                 updateSave={itineraryProps.updateSave}/>);
    expect(itinPage.contains()).toEqual(false);
}

function testtable() {
    const itinPage = mount(<Search options={itineraryProps.planOptions}
                                   itinerarySave={itineraryProps.itinerarySave}
                                   config={null}
                                   updateSave={itineraryProps.updateSave}/>);
    expect(itinPage.createRTable).toEqual(undefined);
}


test('test create table', testcreatetable);
test('test table data', testtable);

test('Testing input fields', testCreateInputFields);

test('test rendering Search component', testRender);

