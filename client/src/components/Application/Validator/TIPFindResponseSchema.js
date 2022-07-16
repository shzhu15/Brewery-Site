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
      "minimum": 3
    },
    "requestType": {
      "description": "the TIP object type should be itinerary",
      "type": "string",
      "pattern": "^find$"
    },
    "match": {
      "description": "an alphanumeric pattern used to find geographic locations.",
      "type": "string",
      "pattern": "^[a-zA-z0-9 ]+$"
    },
    "limit": {
      "description": "the maximum number of matching places that may be returned.",
      "type": "integer",
      "minimum": 0
    },
    "found": {
      "description": "the total number of matching places in the data source(s).",
      "type": "integer",
      "minimum": 0
    },
    "places": {
      "description": "list of places places found",
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
            "pattern": "^[0-9]+(\\.[0-9]+)?$"
          }
        },
        "required": [
          "latitude",
          "longitude"
        ],
        "additionalProperties": true
      },
      "minitems": 0
    }
  },
  "required": [
    "requestVersion",
    "requestType",
    "match"
  ],
  "additionalProperties": false
}
