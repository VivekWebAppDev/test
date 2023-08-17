const product = require('../models/product.model.js');
const cart=require('../models/cart.model.js');
const order=require('../models/order.model.js');
const userAuth=require('../Auth/userAuth.js');


// exports.productGetAll = async (req, res) => {
//     try {
//         const products = await product.find({});
//         res.send(products);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Internal server error');
//     }
// };

exports.productGetAll=async(req,res)=>{
  
    try{
      let page=parseInt(req.query.page);
    if (!page||page==0||page<0) {
      page=1;
    }
    let limit=parseInt(req.query.limit);
    if (!limit||limit==0||limit<0) {
        limit=5;
    }
    const startIndex=(page-1)*limit;
    const endIndex=page*limit;
    const results={};
    if (endIndex<await product.countDocuments({deleted:0}).exec()) {
    results.next={
        page:page+1,
        limit:limit
    }
}
if(startIndex>0){
    results.previous={
        page:page-1,
        limit:limit
    }
}
     results.results= await product.find({deleted:0}).sort({createdAt: 'desc',price: 1}).limit(limit).skip(startIndex).exec();
     if (!results.results[0]) {
        res.status(404).send(`page : ${page} not found`);
        return;
     }
    res.send(results);
  }catch(err){
    console.log(err);
    res.status(500).send('Internal server error');
  }
}


exports.productGetById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await product.findOne({_id: id,deleted:0});
        if (!result) {
            res.status(404).send(`Product with ID ${id} not found`);
        } else {
            res.send(result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
};


exports.productGetByName = async (req, res) => {
    const name = req.params.name;
    try {
        const result = await product.findOne({name: name,deleted:0});
        if (!result) {
            res.status(404).send(`Product with Name ${name} not found`);
        } else {
            res.send(result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
}


exports.productSortByName = async (req, res) => {
    try {
        const result = await product.find({deleted:0}).sort({price: 0,name: 1,})
        if (!result) {
            res.status(404).send(`Products not found`);
        } else {
            res.send(result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    };
}


exports.productSortByPrice = async (req, res) => {
    try {
        const result = await product.find({deleted:0}).sort({price: 1});
        if (!result) {
            res.status(404).send(`Products not found`);
        } else {
            res.send(result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    };
}


exports.productSortByLatest = async (req, res) => {
    try {
        const result = await product.find({deleted:0}).sort({createdAt: 'desc'});
        if (!result) {
            res.status(404).send(`Products not found`);
        } else {
            res.send(result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    };
}

