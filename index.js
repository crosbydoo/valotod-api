require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoString = process.env.DB_URL;

const authRoute = require("./routes/auth_route");
const userRoute = require("./routes/user_route");
const valoRoute = require("./routes/valo_route");
const chatRoute = require("./routes/chat_route");
const messageRoute = require("./routes/message_route");

mongoose.connect(mongoString)
    .then(() => console.log('database terkoneksi'))
    .catch((err) => { console.log(err) });


app.use(express.json())
app.use("/api/", authRoute);
app.use("/api/users", userRoute);
app.use("/api/valo", valoRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get('/', (req,res)=> {
    res.send('API Valotod')
});

app.listen(process.env.PORT || 3002, console.log(`Server Started at ${process.env.PORT}!`))