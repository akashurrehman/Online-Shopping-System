const mongoose=require('mongoose');
var productSchema=mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    ManufacturingDate:{
        type:String
    }
});

function validateProduct(data){
    return schema.validate(data, { abortEarly: false });
}

const Product=mongoose.model("Product",productSchema);

module.exports.Product=Product;
module.exports.validate=validateProduct;

