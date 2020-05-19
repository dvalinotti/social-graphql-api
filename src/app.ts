import express from 'express';
import * as path from 'path';
import 'dotenv/config';
import { ApolloServer, gql } from 'apollo-server-express';
import schema from './schema';
import cors from 'cors';
import depthLimit from "graphql-depth-limit";
import compression from 'compression';
import { createServer } from 'http';
import mongoose from 'mongoose';

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Define Express.js App
var app = express();

// Apollo GraphQL Server configuration
const apolloServer = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  context: () => ({
    secret: process.env.JWT_SECRET,
  }),
});
apolloServer.applyMiddleware({ app, path: '/graphql'});

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/social', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

mongoose
  .connection
  .on('open', () => console.log('Connected to MongoDB Server'));

// Express middleware definition
app.use(logger('dev'));
app.use('*', cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route definition
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Create & run HTTP Server
const PORT = process.env.PORT || 3001;
const httpServer = createServer(app);
httpServer.listen(
  { port: PORT },
  ():void => console.log(`GraphQL Server running on port ${PORT}`),
);
