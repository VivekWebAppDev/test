const mongoose=require('mongoose');
const productScheme=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    price :{
        type:Number,
        require:true
    },
    deleted:{
        type:Boolean,
        require:true,
        default:0
    }
},{
    timestamps: true
});


const product=mongoose.model('products',productScheme);
module.exports=product;