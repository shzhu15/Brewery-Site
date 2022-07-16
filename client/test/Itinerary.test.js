import './enzyme.config.js';
import React from 'react';
import Itinerary from '../src/components/Application/Itinerary/Itinerary';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';
import Legs from '../src/components/Application/Itinerary/Legs';
import Map from '../src/components/Application/Itinerary/Map';
import Search from '../src/components/Application/Itinerary/Search';



const TIPItinerary = {
  'requestType': 'itinerary',
  'requestVersion': 2,
  'options': {
    'title': 'My Trip',
    'earthRadius': '3958.761316',
  },
  'places': [
    {
      'id': 'dnvr',
      'name': 'Denver',
      'latitude': '39.7392',
      'longitude': '-104.9903',
    },
    {
      'id': 'bldr',
      'name': 'Boulder',
      'latitude': '40.01499',
      'longitude': '-105.27055',
    },
    {
      'id': 'foco',
      'name': 'Fort Collins',
      'latitude': '40.585258',
      'longitude': '-105.084419',
    }],
  'distances': [29, 58, 65],
};

const TIPItineraryNoDistances = {
  'requestType': 'itinerary',
  'requestVersion': 2,
  'options': {
    'title': 'My Trip',
    'earthRadius': '3958.761316',
  },
  'places': [
    {
      'id': 'dnvr',
      'name': 'Denver',
      'latitude': '39.7392',
      'longitude': '-104.9903',
    },
    {
      'id': 'bldr',
      'name': 'Boulder',
      'latitude': '40.01499',
      'longitude': '-105.27055',
    },
    {
      'id': 'foco',
      'name': 'Fort Collins',
      'latitude': '40.585258',
      'longitude': '-105.084419',
    }],
};

const startProperties = {
  'settings': {
    'units': {'miles': 3959, 'kilometers': 6371},
    'activeUnit': 'miles',
    'serverPort': 'black-bottle.cs.colostate.edu:31400',
  },
};

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
const place = {
  'places': [{'distance': 0, 'cdistance': 0, 'marker': false}, {'distance': 0, 'cdistance': 0, 'marker': false}],
}

function testMethods() {
  let itinerary = new Itinerary(startProperties);
  itinerary.state = TIPItinerary;
  const itin = shallow(<Itinerary/>);

}

function testMapExists() {
  const itinPage = shallow(<Itinerary options={itineraryProps.planOptions}
                                      itinerarySave={itineraryProps.itinerarySave}
                                      config={null}
                                      updateSave={itineraryProps.updateSave}/>);

  expect(itinPage.contains(<Map options={itineraryProps.planOptions}
                                itinerarySave={itineraryProps.itinerarySave}
                                updateSave={itineraryProps.updateSave}/>)).toEqual(true);
}

function testLegsExists() {
  const itinPage = shallow(<Itinerary options={itineraryProps.planOptions}
                                      itinerarySave={itineraryProps.itinerarySave}
                                      config={null}
                                      updateSave={itineraryProps.updateSave}/>);
  expect(itinPage.contains(<Legs options={itineraryProps.planOptions}
                                 itinerarySave={itineraryProps.itinerarySave}
                                 updateSave={itineraryProps.updateSave}/>)).toEqual(true);
}

function testSearchExists() {
  const itinPage = shallow(<Itinerary options={itineraryProps.planOptions}
                                      itinerarySave={itineraryProps.itinerarySave}
                                      config={null}
                                      updateSave={itineraryProps.updateSave}/>);
  expect(itinPage.contains(<Search options={itineraryProps.planOptions}
                                   itinerarySave={itineraryProps.itinerarySave}
                                   updateSave={itineraryProps.updateSave}/>)).toEqual(true);
}

function testCreateInputFields() {
  const itinPage = shallow(<Itinerary options={itineraryProps.planOptions}
                                      itinerarySave={itineraryProps.itinerarySave}
                                      config={null}
                                      updateSave={itineraryProps.updateSave}/>);

  let numberOfInputs = itinPage.find('Input').length;
  expect(numberOfInputs).toEqual(3);

  let actualInputs = [];
  itinPage.find('Input').map((input) => actualInputs.push(input.prop('name')));

  let expectedInputs = [
    'name',
    'latitude',
    'longitude',
  ];

  expect(actualInputs).toEqual(expectedInputs);
}

function testBuildData() {
  const itinPage = shallow(<Itinerary options={itineraryProps.planOptions}
                                      itinerarySave={itineraryProps.itinerarySave}
                                      config={null}
                                      updateSave={itineraryProps.updateSave}/>);
  expect(itinPage.buildData).toEqual(undefined);
}

function testBuildReverse() {
  const itinPage = shallow(<Itinerary options={itineraryProps.planOptions}
                                    itinerarySave={itineraryProps.itinerarySave}
                                    config={null}
                                    updateSave={itineraryProps.updateSave}/>);
  expect(itinPage.buildReverse).toEqual(undefined);
}

function testBuildLeg() {
  const itinPage = shallow(<Itinerary options={itineraryProps.planOptions}
                                      itinerarySave={itineraryProps.itinerarySave}
                                      config={null}
                                      updateSave={itineraryProps.updateSave}/>);
  expect(itinPage.buildLeg).toEqual(undefined);
}

function testBuildReveseLeg() {
  const itinPage = shallow(<Itinerary options={itineraryProps.planOptions}
                                      itinerarySave={itineraryProps.itinerarySave}
                                      config={null}
                                      updateSave={itineraryProps.updateSave}/>);
  expect(itinPage.buildLegR).toEqual(undefined);
}

// function testrenderTabs() {
//   const itinPage = shallow(<Itinerary options={itineraryProps.planOptions}
//                                       itinerarySave={itineraryProps.itinerarySave}
//                                       config={null}
//                                       updateSave={itineraryProps.updateSave}/>);
//   const fn = itinPage.instance().renderTabs();
//   // expect(fn).toEqual(<object/>);
//   expect(fn).toHaveBeenCalled();
// }


test('test create table', testBuildData);
test('test create table', testBuildReverse);
test('test create table', testBuildLeg);
test('test create table', testBuildReveseLeg);
// test('test create table', testrenderTabs);

test('testing ability to save Itinerary to a file', testMethods);
test('testing whether map exists', testMapExists);
test('testing whether Legs exists', testLegsExists);
test('testing whether Search exists', testSearchExists);
test('testing whether input fields', testCreateInputFields);


