import { BaseDatabase } from '../BaseDatabase';

const printError = (error: any) => {console.log(error.sqlMessage || error.message)}

export class CreateTables extends BaseDatabase{
    public createTable = async (): Promise<void> => {
        const result = await this.getConnection().raw(`
            CREATE TABLE IF NOT EXISTS usuario_table(
                id VARCHAR(255) PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS cliente_table(
                id VARCHAR(255) PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                cpf VARCHAR(255) UNIQUE NOT NULL,
                telefone VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                logradouro VARCHAR(255) NOT NULL,
                numero INT NOT NULL,
                complemento VARCHAR(255),
                bairro VARCHAR(255) NOT NULL,
                cep VARCHAR(255) NOT NULL,
                cidade VARCHAR(255) NOT NULL,
                estado VARCHAR(255) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS produto_table(
                id VARCHAR(255) PRIMARY KEY,
                titulo VARCHAR(255) UNIQUE NOT NULL,
                editora VARCHAR(255) NOT NULL,
                edicao VARCHAR(255) NOT NULL,
                ano_publicacao VARCHAR(255) NOT NULL,
                autores VARCHAR(255) NOT NULL,
                assunto VARCHAR(255) NOT NULL,
                preco FLOAT NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS vendas_table(
                id VARCHAR(255) PRIMARY KEY,
                quantidade INT NOT NULL,
                preco_unid FLOAT NOT NULL,
                preco_total FLOAT NOT NULL,
                data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                id_cliente VARCHAR(255) NOT NULL,
                id_produto VARCHAR(255) NOT NULL,
                FOREIGN KEY(id_cliente) REFERENCES cliente_table(id),
                FOREIGN KEY(id_produto) REFERENCES produto_table(id)
                
            );
        `)
        .then(() => { console.log("Tabelas criadas")})
        .catch(printError)
        .finally(() => {
            this.getConnection().destroy()
        })
    }
   
}

const createDB = new CreateTables();

createDB.createTable()