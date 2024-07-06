import express from 'express';
import morganMiddleware from 'morgan';
import corsMiddleware from 'cors';
import bodyParserMiddleware from 'body-parser';
import cookieParserMiddleware from 'cookie-parser';
import compressionMiddleware from 'compression';

import errorMiddleware from '../bLove/bMiddleware/aErrorMiddleware';
import { baseRoute } from '../bLove/aMCR/cRoute/aBaseRoute';


const appConnection = express();

// Third Party Middleware
appConnection.use(morganMiddleware("dev"));
appConnection.use(corsMiddleware({ credentials: true }));
appConnection.use(bodyParserMiddleware.urlencoded({ extended: true }));
appConnection.use(bodyParserMiddleware.json());
appConnection.use(cookieParserMiddleware());
appConnection.use(compressionMiddleware());

// Routing Middleware
appConnection.use("/api/v1/base", baseRoute)

// Error Middleware
appConnection.use(errorMiddleware)

export default appConnection;
