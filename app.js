'use strict';

const serverless     = require('serverless-http');
const express        = require('express');
const path           = require('path');
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger         = require('morgan');

const { OpenApiValidator } = require('express-openapi-validator');
const apiSpec = `${__dirname}/blueprints/my-openapi-blueprint.yaml`;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
app.locals.pretty = true;
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.text());
app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('json spaces', 2);

app.use('/users', usersRouter.getUserById);
app.use('/', indexRouter);

//  A. Insert OpenApiValidator into Express APp
new OpenApiValidator({
    apiSpec,
    validateResponses: false, //true,
    // B. Path to the controllers/routes
    operationHandlers: `${__dirname}`
})
.install(app)
.then(() => {
    // C. Custom Error Handlers
    app.use((err, req, res, next) => {
        // format errors
        res.status(err.status || 500).json({
            message: err.message,
            errors: err.errors,
        });
    });
});

module.exports.handler = serverless(app);