const express=require('express')
const mongoose=require('mongoose')
const user=require('./routes/user')
const product=require('./routes/product')
const cors=require('cors')
const app=express()

app.use(cors());
app.use(express.json());//read req.body
app.use('/static',express.static('static/'))
app.use(express.urlencoded({extended:true}))
app.use('/users',user);
app.use('/product',product)

const port = process.env.PORT || 3000;
app.listen(3000,(req,res)=>{
    console.log("Our Node Server is Running ........."+port);
})


mongoose.connect('mongodb://localhost/bi',{useUnifiedTopology: true ,useNewUrlParser: true} )
    .then(()=>console.log("Connected to Mongo db....."))
    .catch(()=>console.log("Error in Mongo Connection...."))
