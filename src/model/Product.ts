export class Product {
    constructor(
        private id: string,
        private titulo: string,
        private editora: string,
        private edicao: string,
        private anoPublicacao: string,
        private autores: string,
        private assunto: string,
        private preco: number

    ) { }

    getId(){
        return this.id
    }

    getTitulo(){
        return this.titulo
    }

    getEditora(){
        return this.editora
    }

    getEdicao(){
        return this.edicao
    }

    getAnoPublicacao(){
        return this.anoPublicacao
    }

    getAutores(){
        return this.autores
    }

    getAssunto(){
        return this.assunto
    }

    getPreco(){
        return this.preco
    }

    static toProductModel(data?: any){
        return (data && new Product(
            data.id,
            data.titulo,
            data.editora,
            data.edicao,
            data.anoPublicacao || data.ano_publicacao,
            data.autores,
            data.assunto,
            data.preco
        ))
    }

}

export interface ProductInputDTO {
    titulo: string,
    editora: string,
    edicao: string,
    anoPublicacao: string,
    autores: string,
    assunto: string,
    preco: number,
}

export interface ProductOutputDTO {
    titulo: string,
    editora: string,
    edicao: string,
    anoPublicacao: string,
    autores: string,
    assunto: string,
    preco: number,
}





