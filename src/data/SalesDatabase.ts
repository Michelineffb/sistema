import dayjs from 'dayjs';
import { Sales, SalesOutputDTO } from "../model/Sales";
import { BaseDatabase } from "./BaseDatabase";

export class SalesDatabase extends BaseDatabase {
    async createSales(sales: Sales): Promise<void>{
        try {
            await this.getConnection()
            .insert({
                id: sales.getId(),
                quantidade: sales.getQuantidade(),
                preco_unid: sales.getPrecoUnid(),
                preco_total: sales.getPrecoUnid()*sales.getQuantidade(),
                data: sales.getData(),
                id_cliente: sales.getIdCliente(),
                id_produto: sales.getIdProduto()
            })
            .into(this.TABLE_NAME.VENDAS)
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async getSaleById(clienteId: string): Promise<SalesOutputDTO[]> {
        try {
                const result = await this.getConnection()
                .raw(`
                select * , venda.id as idVenda, produto.id as idProduto, cliente.id as idCliente
                FROM ${this.TABLE_NAME.VENDAS} as venda
                LEFT JOIN ${this.TABLE_NAME.CLIENTES} as cliente ON cliente.id = venda.id_cliente
                LEFT JOIN ${this.TABLE_NAME.PRODUTOS} as produto ON produto.id = venda.id_produto
                WHERE venda.id_cliente = "${clienteId}"
                ORDER BY data DESC
                `)

                return result[0]
                .map((data: any) => ({
                    venda: {
                        idVenda: data.idVenda,
                        idProduto: data.idProduto,
                        titulo: data.titulo,
                        quantidade: data.quantidade,
                        precoUnid: data.preco_unid,
                        precoTotal: data.preco_total,
                        data: dayjs(data.data, 'YYYY-MM-DD').format('DD/MM/YYYY')
                    }
                }))

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async deleteSaleById(clienteId: string): Promise<void> {
        try {
                await this.getConnection()
                .where("id_cliente", clienteId)
                .into(this.TABLE_NAME.VENDAS)
                .del()

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    
}