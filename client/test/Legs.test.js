import './enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';
import Legs from '../src/components/Application/Itinerary/Legs.js';
import Itinerary from "./Itinerary.test";

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

}


function testTable() {
    const itinPage = mount(<Legs options={itineraryProps.planOptions}
                                        itinerarySave={itineraryProps.itinerarySave}
                                        config={null}
                                        updateSave={itineraryProps.updateSave}/>);
    expect(itinPage.contains()).toEqual(false);
}

test('test rendering Legs component', testRender);

test('test create R table', testTable);
