import express from "express";
import {
  listProducts,
  registerProduct,
  updateProducts,
  deleteProducts,
  listProductsSupplier,
} from "../controllers/productController.js";

const router = express.Router();
router.get("/", listProducts);
router.get("/reportproduct", listProductsSupplier);
router.post("/", registerProduct);
router.put("/", updateProducts);
router.delete("/", deleteProducts);

export default router;
