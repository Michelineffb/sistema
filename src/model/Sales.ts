export class Sales{
    constructor(
        private id: string,
        private quantidade: number,
        private precoUnid: number,
        private precoTotal: number,
        private data: Date,
        private idCliente: string,
        private idProduto: string
    ){}

    getId(){
        return this.id
    }

    getQuantidade(){
        return this.quantidade
    }

    getPrecoUnid(){
        return this.precoUnid
    }

    getPrecoTotal(){
        return this.precoTotal
    }

    getData(){
        return this.data
    }

    getIdCliente(){
        return this.idCliente
    }

    getIdProduto(){
        return this.idProduto
    }

    static toSalesModel(data?: any){
        return (data && new Sales(
            data.id,
            data.quantidade,
            data.precoUnid || data.preco_unid,
            data.precoTotal || data.preco_total,
            data.data,
            data.idCliente || data.id_cliente,
            data.idProduto || data.id_produto
        ))
    }
}

export interface SalesInputDTO{
    quantidade: number,
    idCliente: string,
    idProduto: string
}

export interface SalesOutputDTO{
    id: string,
    precoUnid: number,
    precoTotal: number,
    data: Date,
    quantidade: number,
    idCliente: string,
    idProduto: string
}

