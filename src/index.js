
// import express
const express = require('express');

// creates a new Express Application and assigns to app variable. Which we can then use to define routes, middlewares and set up server.
const app = express();

app.get('/products', (req, res) => {

    // Is a response method used to send response back to client
    // res.send([
    //     {
    //         item : 'iPhone-15 pro max',
    //         quantity : '2'
    //     },
    //     {
    //         item : 'Samsung Galaxy',
    //         quantity : '1'
    //     }
    // ]);

    // Is a response method used to sendStatus to the client
    // res.sendStatus(500);

    // if we want to sent the both status and message we can do in the below way.
    res.status(500).json({ message : 'Something went wrong!' });
});

app.listen(3000, () => console.log("Port started successfully at 3000"));
