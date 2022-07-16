export default
{
  "$id": "https://example.com/address.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "config",
  "description": "config response",
  "type": "object",
  "properties": {
    "requestVersion": {
      "description": "the TIP protocol version",
      "type": "integer",
      "minimum": 1
    },
    "requestType": {
      "description": "the TIP object type should be config",
      "type": "string",
      "pattern": "^config$"
    },
    "serverName": {
      "description": "identify the server instance",
      "type": "string",
      "minLength": 3
    },
    "placeAttributes": {
      "description": "list of attributes used to described places",
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 3,
      "uniqueItems": true,
      "required": [
        "name",
        "latitude",
        "longitude"
      ]
    },
    "optimizations": {
      "description": "list of optimization levels available from the server",
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1,
      "uniqueItems": true,
      "required": [
        "none"
      ]
    },
    'filters': {
      'description': 'list of filters available for find',
    }
  },
  "required": [
    "requestVersion",
    "requestType",
    "serverName",
    "placeAttributes",
    'optimizations',
    'filters',
  ],
  "additionalProperties": false
}
