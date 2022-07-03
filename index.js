const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json())
require("./src/config/mongoose")(app);
require('./src/app/routeHandlers')(app);
app.use('/files', express.static("files"));
app.get('/', (req, res) => {
    res.json({
        message: 'Hello world'
    });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Application is running on ${port}`);
});