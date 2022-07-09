const express=require('express');
const app=express();
const moviesRoute=require('./moviesRoute');
const bookingsRoute=require('./bookingsRoute');
const schedulesRoute=require('./schedulesRoute');
app.use('/movies',moviesRoute);
app.use('/booking', bookingsRoute);
app.use('/schedules',schedulesRoute);

module.exports=app;