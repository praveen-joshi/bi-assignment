const joi=require('joi')
mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: [true,"name is required"],
        minLength: 3,
        maxLength: 50,
        tolower: true
    },
    email:{
        type:String,
        minLength:3,
        maxLength:500
    },
    password:{
        type:String,
        required: true
    },
    mobile:{
        type:String,
    },
    dob:{
        type:String,
    },
    age:{
        type:Number,
    },
    profile:{
        type:String
    },
    lastSeen:{
        type:Date
    },
    toBelastSeen:{
        type:Date
    }
});


const User=mongoose.model('User',userSchema);

function validateUser(user){
    const schema=joi.object({
        name:joi.string().max(250).required(),
        email: joi.string().max(250).required().email(),
        password:joi.string().max(250).required(),
        mobile:joi.string(),
        dob:joi.string(),
        age:joi.number(),
        lastSeen:joi.string(),
        profile:joi.string(),
        
    });
    

    const res=schema.validate(user);    
    console.log()
    if(res.error)
    { 
        console.log(res.error);
        return false;
    }
    else return true;
}


exports.User=User;
exports.validateUser=validateUser;