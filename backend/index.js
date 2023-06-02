const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router/router');
const { default: mongoose } = require('mongoose');
const app = express();


app.get('/', (req, res) => {
    res.send('Hi');
})

mongoose.connect('mongodb://localhost:27017/multer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.static('uploads'));
app.use(router);
const port = 3001 || process.env.PORT;
//uncaughtException Error Handled
process.on("uncaughtException", (err) => {
    server.close(() => {
        console.log(err);
        process.exit(1);
    });
});


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your front-end URL
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, credentials");
    next();
});

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    server.close(() => {
        process.exit(1);
    });
});

//JSON request-body Handler
// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));





const server = app.listen(port, () => {
    console.log('App is listening to port 3001.')
})