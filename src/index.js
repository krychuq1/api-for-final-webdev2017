import express from 'express';
import bodyParser from 'body-parser';
import Swagger from './services/swagger.service';
import cors from  'cors';

import {SwaggerRoute, userRouter, eventRouter, bookingRouter, ticketRouter, transactionRouter} from './routers/index.routing';

let app = express();
const port = process.env.PORT || 7777;
let swagger = new Swagger();

app.use(cors());
app.disable('etag');
app.use(bodyParser.json({limit: '5mb'}) );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true,
    limit: '5mb'
}));
// app.use(bodyParser({limit: '50mb'}));       // to support JSON-encoded bodies

app.use('/images', express.static('assets/images/event'));


app.use('/users', userRouter);
app.use('/events', eventRouter);
app.use('/bookings', bookingRouter);
app.use('/tickets', ticketRouter);
app.use('/transaction', transactionRouter);
// Swagger
app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.swaggerSpec));
app.use('/swagger', SwaggerRoute);

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);
