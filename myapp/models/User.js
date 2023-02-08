const mongoose=require("mongoose");

var UserSchema=mongoose.Schema({
    username:{
        type:String
    },
    phoneNo:{
        type:String
    },
    fullname:{
        type:String
    },
    password:{
        type:String
    }
});

const User=mongoose.model("User",UserSchema);

module.exports=User;