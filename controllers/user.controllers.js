const user = require('../models/user.model.js');
const product = require('../models/product.model.js');
const cart = require('../models/cart.model.js');
const order = require('../models/order.model.js');

const passAuth = require('../Auth/passwordAuth.js');
const userAuth = require('../Auth/userAuth.js');

exports.signup = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (name == undefined ||
        email == undefined ||
        password == undefined) {
        res.send(`all fields are required`);
        return;
    }
    const HPassword = passAuth.hash(password);
    try {
        const result = await user.create({ name: name, email: email, password: HPassword })
        if (result) {
            res.send(`user created successfully`);
        }
    } catch (err) {
        if (err.code = 11000) {
            console.log(`email must be unique `);
            res.send(`email must be unique`);
        } else {
            console.log(err);
            res.status(500).send('Internal server error');
        }
    };
}




exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email ||
        !password) {
        console.log(` email and password are require`);
        res.send(` email and password are require`);
        return;
    }

    try {
        const result = await user.findOne({ email: email })
        if (!result) {
            res.send('user email is not true');
            return;
        } else {
            const passwordMatch = await passAuth.bcrypt(password, result.password);
            if (passwordMatch) {
                const token = userAuth.sign(result._id);
                result.token = token;
                await result.save()
                res.send(result);
            } else {
                console.log(`your password is not true`);
                res.send('your password is not true');
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
}




exports.AddToCart=async(req,res)=>{
    const head=req.headers.authorization;
    const userId= userAuth.verify(head).id;
    const productId=req.params.id;
    try {
        const isProduct=await product.findOne({_id:productId,deleted:0});
        if (!isProduct) {
            res.send(`product Id: ${productId} not found`);
            
        }else{
        const result=await cart.create({user_id:userId,product_id:productId});
      
            res.send(`Product ${isProduct.name} is Add to your Cart`);
       
    }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
}

exports.MyCart=async(req,res)=>{
    const head=req.headers.authorization;
    const userId= userAuth.verify(head).id;
    try {
        const products=await cart.find({user_id:userId,ordered:0}).populate('product_id');
        if (!products[0]) {
            res.send(`thar is no product in Your cart`);
            return;
        }
            const result=[];
           for (const key in products) {
            result[key]=products[key].product_id
           }
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
}


exports.MyCartOrder=async(req,res)=>{
    const head=req.headers.authorization;
    const userId= userAuth.verify(head).id;
    try {
        const MyCart=await cart.find({user_id:userId,ordered:0});
        if (!MyCart) {
            res.send(`thar is no product in Your cart`);
            return;
        }
      
        for (const key in MyCart) {
            await order.create({user_id:MyCart[key].user_id,product_id:MyCart[key].product_id});
            MyCart[key].ordered=1;
            await MyCart[key].save();
        }
     
        res.send(`Order completed successfully`);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
}

exports.getMyCartOrder=async(req,res)=>{
    const head=req.headers.authorization;
    const userId= userAuth.verify(head).id;
    try {
        const products=await order.find({user_id:userId,delivered:0}).populate('product_id');
        if (!products[0]) {
            res.send(`thar is no product in Your cart`);
            return;
        }
            const result=[];
           for (const key in products) {
            result[key]=products[key].product_id
           }
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
}