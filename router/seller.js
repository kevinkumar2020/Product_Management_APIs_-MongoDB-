const express = require("express");
const router = express.Router();
router.use(express.json());

const seller = require("../Model/seller");
const product = require("../Model/product");

router.get("/sellerOfProduct", async (req,res)=>{
    const name = req.body.name;
    const details = await seller.findOne({name:name});
    if(details){
        const pDetail = await product.findOne({product_id:details["product_id"]});
        return res.json({data:pDetail});
    }
    return res.json({data:"No Data Found"});
});

router.post("/addseller",(req,res)=>{
    const {addSeller} = req.body;

    if(addSeller){
        seller.create(addSeller);
        return res.json({data:"New Seller Add Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

router.put("/updateProductId", async (req,res)=>{
    const sId = req.body.seller_id;
    const pId = req.body.product_id;
    const details = await seller.findOne({seller_id:sId});
    if(details){
        seller.findOneAndUpdate({seller_id:sId , product_id:pId});
        return res.json({data:"Product_Id Update Successfully"});
    }
    return res.json({data:"No Data Found"});
});

router.delete("/deleteSeller", async (req,res)=>{
    const sId = req.body.seller_id;
    const details = await seller.findOne({seller_id:sId});
    if(details){
        seller.findOneAndDelete({seller_id:sId});
        return res.json({data:"Delete Seller Successfully"});
    }
    return res.json({data:"No Data Found"});
});


module.exports = router;