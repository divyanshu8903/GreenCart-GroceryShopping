import express from "express"
import {upload} from "../configs/multer.js"
import { addProduct } from "../controllers/productController.jsx ";
import authSeller from "../middlewares/authSeller.js"
import { changeStock, productById, productList } from "../controllers/productController";


const productRouter=express.Router();

productRouter.post("/add",upload.array([images]),authSeller,addProduct)

productRouter.get("/list",productList)
productRouter.get("/id",productById)
productRouter.get("/stock",authSeller,changeStock)

export default productRouter;