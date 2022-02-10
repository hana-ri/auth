const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const HttpException = require("./src/utils/HttpException.utils");
const errorMiddleware =require("./src/middleware/error.middleware");
const userRouter = require("./src/routes/user.router");

// init express
const app = express();
// init environment
dotenv.config();
// pase request of content-type: application/json
// pase incoming request with JSON payloads
app.use(express.json());
// enabling cors for all request by using cors middleware
app.use(cors());
// enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 8081);

app.use(`/api/v1/users`, userRouter);

// 404 error
app.all("*", (req, res, next) => {
    const err = new HttpException(404, "Endpoint Not Found");
    next(err);
});

// Error Middleware
app.use(errorMiddleware);

// Starting the server
app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});

// module.exports = app;