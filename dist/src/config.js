'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var swaggerConfig = {
    swaggerDefinition: {
        info: {
            title: 'Translation Json',
            version: '1.0.0',
            description: 'Node service which provides content for White Labels'
        },
        basePath: '/api/',
        host: '',
        schemes: ['http'],
        produces: ['application/json'],
        consumes: ['application/json']
    },
    apis: ['./src/routers/*.js'] // Path to the API docs
};

exports.default = swaggerConfig;