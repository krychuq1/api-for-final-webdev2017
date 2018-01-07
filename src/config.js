let swaggerConfig = {
    swaggerDefinition: {
        info: {
            title: 'Translation Json',
            version: '1.0.0',
            description: 'Node service which provides content for White Labels'
        },
        basePath: '/',
        host: '',
        schemes: ['https'],
        produces: ['application/json'],
        consumes: ['application/json'],
    },
    apis: ['./src/routers/*.js'], // Path to the API docs
};

export default swaggerConfig;