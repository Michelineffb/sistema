export class Client{
    constructor(
    private id: string,
    private nome: string,
    private cpf: string,
    private telefone:  string,
    private email: string,
    private logradouro: string,
    private numero: number,
    private complemento: string,
    private bairro: string,
    private cep: string,
    private cidade: string,
    private estado: string
    ){}

    getId(){
        return this.id
    }

    getNome(){
        return this.nome;
    }

    getCpf(){
        return this.cpf;
    }

    getTelefone(){
        return this.telefone;
    }

    getEmail(){
        return this.email;
    }

    getLogradouro(){
        return this.logradouro;
    }

    getNumero(){
        return this.numero;
    }

    getComplemento(){
        return this.complemento;
    }

    getBairro(){
        return this.bairro;
    }

    getCep(){
        return this.cep;
    }

    getCidade(){
        return this.cidade;
    }

    getEstado(){
        return this.estado;
    }

    static toClientModel(data?: any){
        return (data && new Client(
            data.id,
            data.nome,
            data.cpf,
            data.telefone,
            data.email,
            data.logradouro,
            data.numero,
            data.complemento,
            data.bairro,
            data.cep,
            data.cidade,
            data.estado
        ))
    }    

}

export interface ClientInputDTO{
    nome: string,
    cpf: string,
    telefone:  string,
    email: string,
    logradouro: string,
    numero: number,
    complemento: string,
    bairro: string,
    cep: string,
    cidade: string,
    estado: string,
}

export interface ClientOutputDTO{
    nome: string,
    cpf: string,
    telefone:  string,
    email: string,
    logradouro: string,
    numero: number,
    complemento: string,
    bairro: string,
    cep: string,
    cidade: string,
    estado: string
}







