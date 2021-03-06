export default
{
  "$id": "https://example.com/address.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "distance",
  "description": "distance request/response",
  "type": "object",
  "properties": {
    "requestVersion": {
      "description": "the TIP protocol version",
      "type": "integer",
      "minimum": 1
    },
    "requestType": {
      "description": "the TIP object type should be distance",
      "type": "string",
      "pattern": "^distance$"
    },
    "origin": {
      "description": "an object with the attributes to describe a place",
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "latitude": {
          "type": "string",
          "pattern": "^[-+]?(?:90(?:(?:\\.0+)?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]+)?))$"
        },
        "longitude": {
          "type": "string",
          "pattern": "^[-+]?(?:180(?:(?:\\.0+)?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]+)?))$"
        }
      },
      "required": [
        "latitude",
        "longitude"
      ],
      "additionalProperties": true
    },
    "destination": {
      "description": "an object with the attributes to describe a place",
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "latitude": {
          "type": "string",
          "pattern": "^[-+]?(?:90(?:(?:\\.0+)?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]+)?))$"
        },
        "longitude": {
          "type": "string",
          "pattern": "^[-+]?(?:180(?:(?:\\.0+)?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]+)?))$"
        }
      },
      "required": [
        "latitude",
        "longitude"
      ],
      "additionalProperties": true
    },
    "earthRadius": {
      "description": "the radius of the earth in some unit of measure",
      "type": "number",
      "exclusiveMinimum": 0
    },
    "distance": {
      "description": "the great circle distance between the origin and destination using the radius measure",
      "type": "integer",
      "minimum": 0
    }
  },
  "required": [
    "requestVersion",
    "requestType",
    "origin",
    "destination",
    "earthRadius"
  ],
  "additionalProperties": false
}
