import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { ProductInputDTO } from "../model/Product";

export class ProductController {

    async storeProduct(req: Request, res: Response){
        try {
            const token: string = req.headers.authorization;

            const input: ProductInputDTO = {
                titulo: req.body.titulo,
                editora: req.body.editora,
                edicao: req.body.edicao,
                anoPublicacao: req.body.anoPublicacao,
                autores: req.body.autores,
                assunto: req.body.assunto,
                preco: req.body.preco
            }

            const productBusiness = new ProductBusiness()

            await productBusiness.storeProduct(input, token)

            res.status(201).send("Produto cadastrado")

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    async getPriceProduct(req: Request, res: Response){
        try {
            const token: string = req.headers.authorization;

            const id = req.params.id

            const productBusiness = new ProductBusiness()

            const result = await productBusiness.getPriceProduct(id, token)

            res.status(201).send(result)

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    async getAllProduct(req: Request, res: Response) {

        try {

            const token: string = req.headers.authorization;


            const result = await new ProductBusiness().getAllProduct(token);

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }


    async getShowProductById(req: Request, res: Response) {

        try {

            const token: string = req.headers.authorization;

            const id = req.params.id || "%";

            const result = await new ProductBusiness().getShowProductById(id, token);

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {

            const token: string = req.headers.authorization;
            const id = req.params.id;

            const input: ProductInputDTO = {
                titulo: req.body.titulo,
                editora: req.body.editora,
                edicao: req.body.edicao,
                anoPublicacao: req.body.anoPublicacao,
                autores: req.body.autores,
                assunto: req.body.assunto,
                preco: req.body.preco
            }

            await new ProductBusiness().updateProduct(input, token, id);


            res.status(200).send("Alterado com sucesso")

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}