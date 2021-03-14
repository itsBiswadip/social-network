// Instantiate app
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errors } = require('celebrate');
const path = require('path');
const db = require('./src/common/db');
const indexRouter = require('./src/routes');
const { passport } = require('./src/common/auth');

const app = express();

//handle cors
app.use(cors());

//handle post or url encoded data
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//authentication middleware
app.use(passport.initialize());

//request logger
app.use(morgan('dev'));

// serve static files of React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.use("/api", indexRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

/**
 * Error Handlers
 */
 app.use(errors()); // api validation errors

 app.use((error,req,res,next) => {
     res.status(error.status || 500).json({
         "error": {
             message: error.message || 'Something is wrong'
         }
     });
 });

//Configure the Server
const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=> {
    console.log(`Listening on Port: ${PORT}`);
});