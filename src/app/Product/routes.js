const router = require("express").Router();
const productController = require("./controller");
//const multerInstance = require('../../../config/multer')
const multer = require("multer")
const upload = multer({dest:"uploads/"})
router.post("/",productController.createProduct);
router.post("/upload",upload.array("file"),(req,res)=>{
    
    console.log("res.req.file: ", res.req.file);
    console.log("req.body: ", req.body, "authorization" in req.headers);
    res.json({status:"success",res:req.file})
})
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.removeProduct);
module.exports = router;