const express=require('express');
require('dotenv').config()
const cors=require('cors');
const logger=require('morgan');
const mongoose = require('mongoose');

const app=express();
const port =process.env.PORT;


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());

// Connect to Database

mongoose.connect(process.env.API,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  
}).then(() => console.log('DB Connection Successful'))
.catch((err) =>{
    console.log('Database Connection failed....');
    console.log(err);
})

// Routes

app.get('/',(req,res)=>{
    res.send('Welcome');
})
app.use('/auth',require('./routes/user.route'))
app.use('/todo',require('./routes/todo.route'))
app.use('/comment',require('./routes/comment.route'))
app.use('/admin',require('./routes/admin.route'))

// Event listener for http server 
app.listen(port,()=>{
    console.log(`Server is running at port :${port}`);
})