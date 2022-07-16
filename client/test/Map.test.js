import './enzyme.config.js';
import React from 'react';
import {mount, shallow} from 'enzyme';
import Map from '../src/components/Application/Itinerary/Map';
import L from 'leaflet';
import Itinerary from "./Itinerary.test";


const itineraryProps = {
    'planOptions': {
        'units': {'miles': 3959.0, 'kilometers': 6371.0, 'nautical miles': 3440},
        'activeUnit': 'miles',
    },
    'itinerarySave': {
        'fileInput': '',
        'map': undefined,
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
    // const page = mount(<Map options={itineraryProps.planOptions}
                              // itinerarySave={itineraryProps.itinerarySave}
                              // config={null}
                              // updateSave={itineraryProps.updateSave}/>);
}


// function testCreateMap() {
//     const itinPage = shallow(<Map options={itineraryProps.planOptions}
//                                    itinerarySave={itineraryProps.itinerarySave}
//                                    config={null}
//                                    updateSave={itineraryProps.updateSave}/>);
//     expect(itinPage.contains()).toEqual(false);
// }
//
// test('test create table', testCreateMap);

test('test rendering map component', testRender);

