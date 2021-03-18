const express=require('express')
const {User}=require('../models/user')
const auth=require('../middleware/auth')
const {validateProduct,Product} = require('../models/product')
const validateObjectId = require('../middleware/validateObjectId')
const router=express.Router();
const multer=require('multer');


//file storage logic starts here
var storage = multer.diskStorage({
    destination: 'static/products/',
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
  });
  var upload = multer({ storage: storage })


//Creating a new Product
router.post('/',[auth,upload.single('image')],async (req,res)=>{
    console.log(req.body);
    if(!validateProduct(req.body) ) return res.status(400).send("Please Give all required data of Product");
    console.log(req.body);
    product=new Product(req.body);
    product.image=req.file.originalname;
    product.save();
    console.log("Recently added a New product")
    res.send("New Product Added");
})

//list of all products
router.get('/',auth,async (req,res)=>{
    allProducts=await Product.find();
    res.send(allProducts);
})

//Get specific Product by if
router.get('/:id',validateObjectId,auth,async (req,res)=>{
    let product=await Product.findOne({_id:req.params.id});
    res.send(product);
})

//delete product by id
router.get('/delete/:id',validateObjectId,auth,async (req,res)=>{
  console.log("del req came");
  let product=await Product.findOne({_id:req.params.id});
  if(!product) res.status(400).json("not found this product");

  try{
      const result=await Product.deleteOne({_id:req.params.id},{$set:req.body});
      console.log(result);
      res.json("deleted");
  }
  catch(err)
  {
    console.log(err);
    res.status(400).send(err);
  }

})

//edit product by id
router.post('/edit_product/:id',validateObjectId,auth,async (req,res)=>{
  console.log('Edit req came');
  let product=await Product.findOne({_id:req.params.id});
  if(!product) res.status(400).send("not found this product");
  
  try{
      const result=await Product.updateOne({_id:req.params.id},{$set:req.body});
      console.log(result);
      res.json("edited");
  }
  catch(err)
  {
    console.log(err);
    res.status(400).send(err);
  }
})


module.exports=router;