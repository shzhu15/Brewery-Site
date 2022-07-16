import validate
  from '../src/components/Application/Validator/Validator';

const goodUploadedItinerary = {
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
    },
  ],
  'distances': [],
};

const badUploadedItinerary = {
  'requestType': 'itinerary',
  'requestVersion': 'bad request',
  'options': {
    'title': 'My Trip',
    'earthRadius': 'bad data',
  },
  'places': [
    {
      'no id on this one': 'dnvr',
      'name': 'vabas',
      'latitude': 'bad data',
      'longitude': '-104.9903',
    },
    {
      'id': 'bldr',
      'name': 'Boulder',
      'latitude': '40.01499',
      'longitude': 'bad long',
    },
    {
      'id': 'foco',
      'name': 'Fort Collins',
      'longitude': '-105.084419',
    },
  ],
  'distances': [],
};

function testItineraryUpload() {
  let goodResult = validate(goodUploadedItinerary, 'itineraryFile');
  let badResult = validate(badUploadedItinerary, 'itineraryFile');
  expect(goodResult).toEqual(true);
  expect(badResult).toEqual(false);
}

test('testing schema for an uploaded itinerary', testItineraryUpload);