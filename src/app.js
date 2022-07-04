const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require('./config')
// Routers
const usersRouter = require("./users/users.router").router
const authRouter = require("./auth/auth.router").router
const conversationRouter = require("./conversations/conversation.router").router
const messageRouter = require('./messages/message.router').router
const participansRouter = require("./participants/participants.router").router

// Init express app
const app = express();

// Enable CORS
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

// Enable incoming Form-Data
app.use(express.urlencoded({
    extended: true
}));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
else app.use(morgan("combined"));

// Endpoints
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to my API"
    })
})
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/conversations", conversationRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/participants", participansRouter);

app.listen(config.port, () => {
    //console.log(`Server started at port ${config.port}`)
})

module.exports = {
    app
};