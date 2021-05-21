require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const blogRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comments');
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(
    () => {
        console.log("DB connected");
    }
).catch(() => {
    console.log("Failure at .env file in backend");
});

//Middlewares
app.use(express.json());



//Routes
app.use('/api/user',authRoutes);
app.use('/api/blog',blogRoutes);
app.use('/api/comment',commentRoutes);
// app.use('/api',taskRoutes);
// app.use('/api',projectRoutes);

//PORT


//Starting a server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

