const express=require("express");
const router=express.Router();
const User=require("../models/User");


router.get("/register", function (req, res, next) {
  res.render("users/register");
});



router.get("/logout", function (req, res, next) {
  req.session.user = null;
  res.redirect("/login");
});



router.get("/login", function (req, res, next) {
  res.render("users/login");
});
router.post("/login", async function (req, res, next) {
    try{
        let user = await User.findOne({email: req.body.email,password: req.body.password,});
        if (!user) 
        {
            return res.redirect("/login");
        }
            req.session.user = user;
        return res.redirect("/");
    }catch(err){
    return res.status(400).send("Cannot login..")
    }

});
router.post("/register", async function (req, res, next) {
  try{
    let user = new User(req.body);
        await user.save();
    res.redirect("/");
}catch(err){
    return res.status(400).send("Cannot Register New User")
}
});

module.exports=router;