export default
{
  "$id": "https://example.com/address.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "itinerary",
  "description": "itinerary request/response",
  "type": "object",
  "properties": {
    "requestVersion": {
      "description": "the TIP protocol version",
      "type": "integer",
      "minimum": 2
    },
    "requestType": {
      "description": "the TIP object type should be itinerary",
      "type": "string",
      "pattern": "^itinerary$"
    },
    "options": {
      "description": "options for this request",
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "earthRadius": {
          "type": "string",
          "pattern": "^[0-9]+(\\.[0-9]+)?$"
        },
        "optimization": {
          "type": "string"
        }
      },
      "required": [
        "earthRadius"
      ]
    },
    "places": {
      "description": "list of places to visit",
      "type": "array",
      "items": {
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
          },
          "id": {
            "type": "string"
          },
          "municipality": {
            "type": "string"
          },
          "altitude": {
            "type": "string",
            "pattern": "^[0-9]+(.[0-9]*)$"
          }
        },
        "required": [
          "latitude",
          "longitude"
        ],
        "additionalProperties": true
      },
      "minitems": 0
    },
    "distances": {
      "description": "distances between corresponding places",
      "type": "array",
      "items": {
        "type": "integer"
      },
      "minitems": 0
    }
  },
  "required": [
    "requestVersion",
    "requestType",
    "options",
    "places"
  ],
  "additionalProperties": false
}
