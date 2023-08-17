const express = require('express');
const bodyParser = require('body-parser');
const router = express();
const user = require('../models/user.model.js');
const product = require('../models/product.model.js');
const cart=require('../models/cart.model.js');
const order=require('../models/order.model.js');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
const passAuth = require('../Auth/passwordAuth.js');
const userAuth = require('../Auth/userAuth.js');
const productController=require('../controllers/product.controllers.js');
const userController=require('../controllers/user.controllers.js');


router.post("/signup",userController.signup)

router.post('/login',userController.login)

router.get('/product', userAuth.mt,productController.productGetAll)

router.get('/product/name', userAuth.mt,productController.productSortByName )

router.get('/product/price', userAuth.mt,productController.productSortByPrice)

router.get('/product/Latest', userAuth.mt,productController.productSortByLatest)

router.post("/product/addToCart/:id", userAuth.mt,userController.AddToCart)

router.get('/product/:name', userAuth.mt,productController.productGetByName)

router.get('/MyCart', userAuth.mt,userController.MyCart)

router.post('/MyCart/Order', userAuth.mt,userController.MyCartOrder)

router.get('/MyCart/Order', userAuth.mt,userController.getMyCartOrder)

module.exports = router