import dayjs from "dayjs";
import { Request, Response } from "express";
import { SalesBusiness } from "../business/SalesBusiness";
import { SalesInputDTO } from "../model/Sales";

export class SalesController {

    async storeSales(req: Request, res: Response){
        try {
            const token: string = req.headers.authorization;

            const input: SalesInputDTO = {
                quantidade: req.body.quantidade,
                idCliente: req.body.idCliente,
                idProduto: req.body.idProduto
            }

            const productBusiness = new SalesBusiness()

            await productBusiness.storeProduct(input, token)

            res.status(201).send("Venda cadastrada")

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    async getSaleById(req: Request, res: Response) {

        try {

            const token: string = req.headers.authorization;

            const id = req.params.id;

            const result = await new SalesBusiness().getSaleById(id, token);

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    async deleteSaleById(req: Request, res: Response) {

        try {

            const token: string = req.headers.authorization;

            const id = req.params.id;

            await new SalesBusiness().deleteSaleById(id, token);

            res.status(200).send("Venda deletada");

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}