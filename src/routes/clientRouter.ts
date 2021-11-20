import express from "express";
import { ClientController } from "../controller/ClientController";

export const clientRouter = express.Router();

const clientController = new ClientController();

clientRouter.post("/store", clientController.storeClient);

clientRouter.get("/index", clientController.getAllClient);

clientRouter.put("/update/:id", clientController.updateClient);

clientRouter.get("/show/:id", clientController.getShowClient);

clientRouter.delete("/delete/:id", clientController.deleteClientById);

