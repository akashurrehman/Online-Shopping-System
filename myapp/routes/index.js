var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/cart",async function(req,res){
  let cart=req.cookies.cart;
  if(!cart)
  {
    cart=[];
  }
  res.render("cart",{cart});
})
module.exports = router;
