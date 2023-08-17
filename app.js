require('dotenv').config();
const express=require('express');
const app=express();
const PORT=process.env.port||8844;
const mongodb = process.env.url || 'mongodb://127.0.0.1:27017/E-commerce?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1/';
const mongoose=require('mongoose');
const userRouter=require('./Routes/user.router.js');
const adminRouter=require('./Routes/admin.router.js');
// mongoose
//     .connect(mongodb)
//     .then((result) => {
//         console.log('mongodb connected');
//     }).catch((err) => {
//         console.error(err);
//         console.log('can not connect to mongodb');
//     });

async function connectToMongoDB() {
    try {
      const result = await mongoose.connect(mongodb);
      console.log('mongodb connected');
    } catch (err) {
      console.error(err);
      console.log('can not connect to mongodb');
    }
  }
  
  connectToMongoDB();


app.use('/user',userRouter);
app.use('/admin',adminRouter);







app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/`);
})



