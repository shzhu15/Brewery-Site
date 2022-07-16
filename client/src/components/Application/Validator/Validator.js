import itineraryFileSchema
  from './TIPItineraryFileSchema.js';
import itineraryResponseSchema
  from './TIPItineraryResponseSchema.js';
import findResponseSchema
  from './TIPFindResponseSchema.js';
import distanceResponseSchema
  from './TIPDistanceResponseSchema.js';
import configResponseSchema
  from './TIPConfigResponseSchema.js';

export default function validate(inputJSON, schemaType) {
  switch (schemaType) {
    case 'itineraryResponse':
      var schema = itineraryResponseSchema;
      break;
    case 'itineraryFile':
      var schema = itineraryFileSchema;
      break;
    case 'findResponse':
      var schema = findResponseSchema;
      break;
    case 'distanceResponse':
      var schema = distanceResponseSchema;
      break;
    case 'configResponse':
      var schema = configResponseSchema;
      break;
  }

  return validateJSON(schema, inputJSON);
}

export function getValidator()
{
  var Ajv = require('ajv');
  var ajv = new Ajv();
  return ajv;
}

export function validateJSON(schema, json) {
  let ajv = getValidator();
  let valid = ajv.validate(schema, json);
  if (!valid) {
    console.log(ajv.errors);
    return false;
  }
  return true;
}

export function validateItineraryUpload(itineraryJSON) {
  return validateJSON(itineraryJSON, itineraryFileSchema);
}

export function validateItineraryResponse(itineraryJSON) {
  return validateJSON(itineraryJSON, itineraryResponseSchema);
}

export function validateFindResponse(findJSON) {
  return validateJSON(findJSON, findResponseSchema);
}

export function validateDistanceResponse(distanceJSON) {
  return validateJSON(distanceJSON, distanceResponseSchema);
}

export function validateConfigResponse(configJSON) {
  return validateJSON(configJSON, configResponseSchema);
}

