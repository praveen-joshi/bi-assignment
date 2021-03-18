const express=require('express')
const multer=require('multer');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {validateUser,User}=require('../models/user')
const auth=require('../middleware/auth')
const router=express.Router();



//file storage logic starts here
var storage = multer.diskStorage({
    destination: 'static/profile/',
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
  });
  var upload = multer({ storage: storage })


//Creating a new User
router.post('/register',[upload.single('profile')],async (req,res)=>{

    //find if the req.body contain all required valid  user details or not
    if(!validateUser(req.body)) return res.status(400)
    .send("Please Give all mandatory data of user to server").json();

    //find if this user is alreasy registered
    let user=await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("User already Registered Please Try to Login");

    //find if this mobile is alreasy registered
    user=await User.findOne({mobile: req.body.mobile});
    if(user) return res.status(400).send("mobile already Registered Please Try another");

    //create new object 
    user=new User(req.body);

    //change password with hash of it 
    user.password=await getHasedPassword(user.password);
    //set current date to be  last seen later
    user.toBelastSeen=Date.now();
    //set profile photo name 
    user.profile=req.file.originalname;
    console.log(user);
    await user.save();

    //get token and return it(not necessay for register)
    const token=getToken(user);
    res.header('x-auth-token',token).json("Returning you a Token in header to Login next time");
})


//Getting info of Current User
router.get('/me',auth,async (req,res)=>{

    user=await User.findOne({_id:req.user._id}).select('-password');
    if(user) res.send(user);
    else res.status(404).send("This User is Not Available");

})

//Loggin User
router.post('/login',async (req,res)=>{
	console.log("A Loggin Request Came");
	
    const email=req.body.email;
    let password=req.body.password;
    if(!email || !password) return res.status(400).send("Please pass email and password to get token");
    
    user=await User.findOne({'email':email});
    if(!user) return res.status(404).send("This email is Not registered with us");

    
    if(! await bcrypt.compare(password,user.password)) return res.status(400).send("Wrong Password");

    const token=getToken(user);
    console.log("A user Logged In");

    
    user.lastSeen=user.toBelastSeen;
    user.toBelastSeen=new Date().toUTCString();
    await User.updateOne({'email':email},{$set:user});

    res.send({token});
})

function getToken(user) {
    jwtKey="praveenJoshi";
    token=jwt.sign(JSON.stringify(user),jwtKey);
    return token;
}

async function getHasedPassword(password) {
    const salt=await bcrypt.genSalt(10);
    const hasedPassword=await bcrypt.hash(password,salt);
    return hasedPassword;
    //warning this return different values for same string 
    //make sure to use compare method to check if two differenet hash is same
}


module.exports=router;