const express=require("express")

function sessionAuth(res,req,next){
    res.locals.user=res.session.user;
    next();
}
module.exports=sessionAuth;