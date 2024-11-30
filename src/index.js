
// import express
const express = require('express');

// creates a new Express Application and assigns to app variable. Which we can then use to define routes, middlewares and set up server.
const app = express();

app.listen(3000, () => console.log("Port started at 3000"));
