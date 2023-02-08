const express=require("express");
let router=express.Router();

const {Product} = require("../models/Product");

router.get("/",async function(req,res,next){
    let products=await Product.find();
    console.log(req.session.user);  
    return res.render("products/list",{title: "Products in Database", products});
});
router.get("/add",async function(req,res){
    res.render("products/add")
});

router.post("/add",async function(req,res){
    try{
        let product = new Product(req.body);
        await product.save();
        return res.redirect("/products");
    }
    catch(err){
        return res.status(400).send("cannot post data");
    }
});

router.get("/delete/:id", async function (req, res, next) {
    try{ 
        let product = await Product.findByIdAndDelete(req.params.id);
        res.redirect("/products");
    }
    catch(err){
        return res.status(400).send("Cannot delete data")
    }
});
router.get("/cart/:id", async function (req, res, next) {
  try{
    let product = await Product.findById(req.params.id);
    
    if(!product)
    {
        return res.status(400).send("Cannot find data");
    }
    console.log("Add This Product in cart");
    let cart = [];
    if (req.cookies.cart) 
        cart = req.cookies.cart;
    cart.push(product);
    res.cookie("cart", cart);
    res.redirect("/products");
}catch(err){
    return res.status(400).send("Product cannot add to the Cart!");
}
});

router.get("/cart/remove/:id", async function (req, res, next) {
  try{
    let cart = [];
    if (req.cookies.cart) 
        cart = req.cookies.cart;
    cart.splice(cart.findIndex((c) => c._id == req.params.id),1);
    res.cookie("cart", cart);
    res.redirect("/cart");
}catch(err){
    return res.status(400).send("Cannot remove the Product!");
}

});

router.get("/edit/:id", async function (req, res, next) {
  try{
    let product = await Product.findById(req.params.id);
    if(!product)
    {
        return res.status(400).status("cannnot find product for edit");
    }
    res.render("products/edit", { product });

}catch(err){
    return res.status(400).send("Cannot find Product for edit")
}
});

router.post("/edit/:id", async function (req, res, next) {
  try{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(400).send("Cannot find Produt");
    }

    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();
    res.redirect("/products");
}catch(err){
    return res.status(400).send("Cannot post new Product");
}
});
module.exports=router;
