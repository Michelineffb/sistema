import express from "express";
import { SalesController } from "../controller/SalesController";

export const salesRouter = express.Router();

const salesController = new SalesController();

salesRouter.post("/store", salesController.storeSales);

