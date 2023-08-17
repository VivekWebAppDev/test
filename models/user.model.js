const mongoose=require('mongoose');
const userScheme=new mongoose.Schema({
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
    deleted:{
        type:Boolean,
        require:true,
        default:0
    },
    token:{
        type:String
    }
});


const users=mongoose.model('users',userScheme);
module.exports=users;