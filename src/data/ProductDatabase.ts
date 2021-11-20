import { Product, ProductOutputDTO } from "../model/Product";
import { BaseDatabase } from "./BaseDatabase";

export class ProductDatabase extends BaseDatabase {
   
    async createProduct(product: Product): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: product.getId(),
                    titulo: product.getTitulo(),
                    editora: product.getEditora(),
                    edicao: product.getEdicao(),
                    ano_publicacao: product.getAnoPublicacao(),
                    autores: product.getAutores(),
                    assunto: product.getAssunto(),
                    preco: product.getPreco()
                })
                .into(this.TABLE_NAME.PRODUTOS)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async getPriceProduct(id: string): Promise<ProductOutputDTO[]> {
        try {
            const result = await this.getConnection()
                .where("id", id)
                .select("preco")
                .into(this.TABLE_NAME.PRODUTOS)

            return result[0].preco

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async getAllProduct(): Promise<ProductOutputDTO[]> {
        try {
            const result = await this.getConnection()
                .select("id", "titulo", "editora", "preco")
                .into(this.TABLE_NAME.PRODUTOS)
                .orderBy("titulo", "asc")

            return result

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getShowProductById(id: string): Promise<ProductOutputDTO[]> {
        try {
            const result = await this.getConnection()
                .where("id", id)
                .select()
                .into(this.TABLE_NAME.PRODUTOS)


            return result

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async updateProduct(product: Product): Promise<void> {
        try {
            await this.getConnection()
                .where("id", product.getId())
                .update({
                    titulo: product.getTitulo(),
                    editora: product.getEditora(),
                    edicao: product.getEdicao(),
                    ano_publicacao: product.getAnoPublicacao(),
                    autores: product.getAutores(),
                    assunto: product.getAssunto(),
                    preco: product.getPreco()
                })
                .into(this.TABLE_NAME.PRODUTOS)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}