import { ProductDatabase } from './../data/ProductDatabase';
import { Sales } from './../model/Sales';
import { SalesDatabase } from "../data/SalesDatabase";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { SalesInputDTO } from "../model/Sales";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { NotFoundError } from '../error/NotFoundError';

const tokenManager = new Authenticator();
const idGenerator = new IdGenerator();

export class SalesBusiness {
    async storeProduct(input: SalesInputDTO, token: string){
        try {
            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            tokenManager.getData(token)

            if (!input.quantidade || !input.idCliente || !input.idProduto ) {
                throw new Error("Preencha todos os campos para registro do produto");
            }

            const productDatabase = new ProductDatabase()
            const precoUnid = await productDatabase.getPriceProduct(input.idProduto)

            const id = idGenerator.generate();

            await new SalesDatabase().createSales(
                Sales.toSalesModel({
                    ...input,
                    id, 
                    precoUnid
                })
            )
            
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getSaleById(id: string, token: string) {

        try {

            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            tokenManager.getData(token)

            const result = await new SalesDatabase().getSaleById(id);

            if(!result){
                throw new NotFoundError("Não há vendas para esse cliente")
            }

            return result

        } catch (error) {
            throw new Error(error.message)
        }

    }

    async deleteSaleById(id: string, token: string) {

        try {

            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            tokenManager.getData(token)

            await new SalesDatabase().deleteSaleById(id);

        } catch (error) {
            throw new Error(error.message)
        }

    }
}