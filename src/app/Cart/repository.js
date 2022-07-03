const Cart = require("./model");
exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: "items.productId",
        select: "name price total"
    });;
    return carts[0];
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}
exports.productByOne = async id=>{
    const product = await Cart.findOne({id});
    return product;
}
exports.delete = async id =>{
   const item = await Cart.findByIdAndRemove(id)
   return item
    
}
