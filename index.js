const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRouter = require('./src/app/User/controller')
//const dotenv = require("dotenv");
require("dotenv").config({path: './config/dev.env'});
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use("/api",userRouter)
app.use(cors());
app.use(bodyParser.json())
require("./config/mongoose")(app);
require('./src/app/routeHandlers')(app);
app.use('/files', express.static("files"));
app.get('/', (req, res) => {
    res.json({
        message: 'Hello world'
    });
});
console.log(process.env.JWT_KEY,"hello")
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Application is running on ${port}`);
});