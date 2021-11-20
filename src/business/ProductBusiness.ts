import { ProductDatabase } from "../data/ProductDatabase";
import { NotFoundError } from "../error/NotFoundError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Product, ProductInputDTO } from "../model/Product";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const tokenManager = new Authenticator();
const idGenerator = new IdGenerator();

export class ProductBusiness {
    async storeProduct(input: ProductInputDTO, token: string){
        try {
            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            tokenManager.getData(token)

            if (!input.titulo || !input.editora || !input.edicao || !input.anoPublicacao || !input.autores || !input.assunto || !input.preco) {
                throw new Error("Preencha todos os campos para registro do produto");
            }

            const id = idGenerator.generate();

            await new ProductDatabase().createProduct(
              Product.toProductModel({
                  ...input,
                  id
              })
            )
            
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getPriceProduct(id: string, token: string){
        try {
            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            tokenManager.getData(token)

            const result = await new ProductDatabase().getPriceProduct(id)

            if(!result){
                throw new NotFoundError("Produto não cadastrado")
            }

            return result
            
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAllProduct(token: string) {

        try {

            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            const tokenData = tokenManager.getData(token)

            const result = await new ProductDatabase().getAllProduct();

            return result

        } catch (error) {
            throw new Error(error.message)
        }

    }

    async getShowProductById(id: string, token: string) {

        try {

            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            tokenManager.getData(token)

            const result = await new ProductDatabase().getShowProductById(id);

            return result

        } catch (error) {
            throw new Error(error.message)
        }

    }

    async updateProduct(input: ProductInputDTO, token: string, id: string) {

        try {

            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            tokenManager.getData(token)

            await new ProductDatabase().updateProduct(
                Product.toProductModel({
                    ...input,
                    id
                })
            );


        } catch (error) {
            throw new Error(error.message)
        }

    }

}