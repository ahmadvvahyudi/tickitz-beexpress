const express=require('express');
const app=express();
const moviesRoute=require('./moviesRoute');
const bookingsRoute=require('./bookingsRoute');
const schedulesRoute=require('./schedulesRoute');
const usersRoute=require('./usersRoute');
const authRoute=require('./authRoute');

app.use('/movies',moviesRoute);
app.use('/booking', bookingsRoute);
app.use('/schedules',schedulesRoute);
app.use('/users',usersRoute);
app.use('/auth',authRoute);
module.exports=app;