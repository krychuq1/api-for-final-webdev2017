import express from 'express';
import bodyParser from 'body-parser';
import Swagger from './services/swagger.service';


import {SwaggerRoute, userRouter} from './routers/index.routing';

let app = express();
const port = process.env.PORT || 7777;
let swagger = new Swagger();


app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use('/user', userRouter);
// Swagger
app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.swaggerSpec));
app.use('/swagger', SwaggerRoute);

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);
