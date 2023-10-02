
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// app.get('/api/contacts', (req, res) => {
//     res.status(200).send({a: "get all contacts"});
// }); // inplace of this using app.use and created separate contactRoute file, now from here, it will go there for remaing job

app.use(express.json()); // to get the requset to body, its middle ware body parser.
app.use("/api/contacts", require("./routes/contactRoutes")); //use is a middleware
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler); //middleware for getting error properly

app.get('/', (req, res) => {
    res.send("<h1>Hello</h1>");
});

app.listen(port, () => {
    console.log(`Express Listening on port ${port}`);
})