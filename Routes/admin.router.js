const express = require('express');
const bodyParser = require('body-parser');
const router = express();
const user = require('../models/user.model.js');
const product = require('../models/product.model.js');
const cart = require('../models/cart.model.js');
const order = require('../models/order.model.js');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
const adminAuth = require('../Auth/adminAuth');
const adminController=require('../controllers/admin.controllers.js');
const productController=require('../controllers/product.controllers.js');

router.post('/login',adminController.login)

router.post('/product',adminAuth.mt,adminController.productPost)

router.get('/product',adminAuth.mt,productController.productGetAll)

router.get('/product/deleted',adminAuth.mt,adminController.allDeletedProducts)

router.get('/product/:id',adminAuth.mt,productController.productGetById)

router.put('/product/:id',adminAuth.mt,adminController.productPut)

router.delete('/product/:id',adminAuth.mt,adminController.productDeleteById)

router.get('/Orders',adminAuth.mt,adminController.getAllOrders)

module.exports = router





// router.post("/signup", (req, res) => {
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;

//     if (name == undefined ||
//         email == undefined ||
//         password == undefined) {
//         res.send(`all fields are required`);
//         return;
//     }
//     const HPassword = passAuth.hash(password);

//     admin
//         .create({
//             name: name,
//             email: email,
//             password: HPassword
//         })
//         .then((result) => {
//             res.send(`admin created successfully`);
//         })
//         .catch((err) => {
//             if (err.code = 11000) {
//                 console.log(`email must be unique `);
//                 res.send(`email must be unique`);
//             } else {
//                 console.log(err);
//                 res.status(500).send('Internal server error');
//             }
//         });
// })