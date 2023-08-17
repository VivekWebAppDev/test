const mongoose=require('mongoose');
const cartScheme=new mongoose.Schema({
   user_id:{
    type:mongoose.Schema.Types.ObjectId,ref:'users'
   },
   product_id:{
    type:mongoose.Schema.Types.ObjectId,ref:'products'
   },
   ordered:{
    type:Boolean,
    require:true,
    default:0
   }
},{
    timestamps: true
});


const cart=mongoose.model('cart',cartScheme);
module.exports=cart;