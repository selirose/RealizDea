// Import Modules
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors') //Enable cors request

const fs = require("fs");
const https = require("https");
const key = fs.readFileSync("./ssl/key.pem", "utf-8");
const cert = fs.readFileSync("./ssl/cert.pem", "utf-8");

app.use(cors())

// Import Routes
const userRoutes = require('./routes/userRoutes.js')
const contestRoutes = require('./routes/contestRoutes.js')

// Parsing the body of incoming requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Static files
app.use(express.static('public'))

// Connect the routes with
app.use('/user', userRoutes);
app.use('/contest', contestRoutes);

// Listen to port 3000
app.listen(3000,()=> console.log("server running on http://localhost:3000"));

https.createServer({key: key, cert: cert }, app).listen(3001);
