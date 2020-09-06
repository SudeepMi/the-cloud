const express = require("express");
const app = express();

const port = process.env.PORT || 8080;
// const host = process.env.HOSTNAME || "codewithsudeep";
const host = process.env.HOSTNAME || "0.0.0.0";


const server = app.listen(port, host, () => {
  console.log('Port %d',port);
  console.log(`Node.js API server is listening on http://${host}`);
});


const router = require('./src/router');

const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");

// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger.json');

const path = require("path");


//serve static asset 
app.use(cors());
// app.use(router);
if(process.env.NODE_ENV==="production"){

  app.use(express.static('client/build'));
  app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

process.env.CORS_ORIGIN = "http://localhost:3000, https://webalarm.herokuapp.com";
app.use(
  cors({
    origin(origin, cb) {
      const whitelist = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [];
      cb(null, whitelist.includes(origin));
    },
    credentials: true
  })
);


// Launch Node.js server




