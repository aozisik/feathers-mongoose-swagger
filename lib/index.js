var feathersMongoose = require('feathers-mongoose');
var mongooseToSwagger = require('mongoose-to-swagger');

module.exports = function (swaggerModelName, mongooseOptions) {

  var service = feathersMongoose(mongooseOptions);

  swaggerModelName = swaggerModelName.toLowerCase();

  var singleRef = `#/definitions/${swaggerModelName}`
  var listRef = `#/definitions/${swaggerModelName} list`

  service.docs = {
    find: {
      responses: {
        '200': {
          description: `returns ${swaggerModelName} models`,
          schema: {
            '$ref': listRef
          },
        },
        '500': {
          description: 'general error'
        },
        '401': {
          description: 'not authenticated'
        },
      },
    },

    get: {
      responses: {
        '200': {
          description: `returns ${swaggerModelName} model`,
          schema: {
            '$ref': singleRef
          },
        },
        '500': {
          description: 'general error'
        },
        '401': {
          description: 'not authenticated'
        },
        '404': {
          description: 'not found'
        },
      },
    },

    definitions: {
      [swaggerModelName]: mongooseToSwagger(mongooseOptions.Model),
      [swaggerModelName + ' list']: {
        type: 'array',
        items: {
          $ref: singleRef
        }
      }
    }
  };

  return service;
};