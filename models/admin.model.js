const mongoose=require('mongoose');
const adminScheme=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
         unique:true
    },
    password:{
        type:String,
        require:true
    },
    token:{
        type:String
    }
});


const admin=mongoose.model('admin',adminScheme);
module.exports=admin;