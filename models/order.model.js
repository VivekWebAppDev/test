const mongoose=require('mongoose');
const orderScheme=new mongoose.Schema({
   user_id:{
    type:mongoose.Schema.Types.ObjectId,ref:'users'
   },
   product_id:{
    type:mongoose.Schema.Types.ObjectId,ref:'products'
   },
   delivered:{
    type:Boolean,
    require:true,
    default:0
   }
},{
    timestamps: true
});



const order=mongoose.model('orders',orderScheme);
module.exports=order;