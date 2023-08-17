
const admin = require('../models/admin.model.js');
const product = require('../models/product.model.js');

const passAuth = require('../Auth/passwordAuth.js');
const adminAuth = require('../Auth/adminAuth.js');

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    console.log('Email and password are required');
    res.status(400).send('Email and password are required');
    return;
  }

  try {
    const result = await admin.findOne({ email: email });

    if (!result) {
      console.log('Admin email is not true');
      res.send('Admin email is not true');
    } else {
      const passwordMatch = await passAuth.bcrypt(password, result.password);

      if (passwordMatch) {
        const token = adminAuth.sign(result._id);
        result.token = token;
        await result.save();
        res.send(result);
      } else {
        console.log('Your password is not true');
        res.send('Your password is not true');
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
};

exports.productPost = async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  if (!name || !price) {
    res.status(400).send('Name and price are required');
    return;
  }

  try {
    const newProduct = await product.create({ name: name, price: price });
    res.send(newProduct);
  } catch (err) {
    if (err.code === 11000) {
      console.log('Name must be unique');
      res.send('Name must be unique');
    } else {
      console.log(err);
      res.status(500).send('Internal server error');
    }
  }
};

exports.productPut = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const price = req.body.price;

  try {
    const result = await product.findOne({ _id: id ,deleted:0});

    if (!result) {
      res.status(404).send(`Product with ID ${id} not found`);
      return;
    }

    if (name) {
      result.name = name;
    }
    if (price) {
      result.price = price;
    }

    await result.save();
    res.send(result);
  } catch (err) {
    if (err.code === 11000) {
      console.log('Name must be unique');
      res.send('Name must be unique');
    } else {
      console.log(err);
      res.status(500).send('Internal server error');
    }
  }
};

exports.productDeleteById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await product.findOne({_id:id})
    if (!result) {
      res.status(404).send(`Product with ID ${id} not found`);
    } else {
      result.deleted=1;
      await result.save();
      res.send(`Product with ID ${id} is deleted`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
};



exports.allDeletedProducts = async (req, res) => {
  try {
    const result = await product.find({deleted:1})
    if (!result) {
      res.status(404).send(`thar is no deleted Product`);
    } else {
      res.send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error in allDeletedProducts ');
  }
};

exports.getAllOrders=async(req,res)=>{
  try {
      const orders=await order.find({}).populate('user_id');
      if (!orders[0]) {
          res.send(`thar are on orders`);
          return;
      }
      res.send(orders);
  } catch (err) {
      console.log(err);
      res.status(500).send('Internal server error');
  }
}