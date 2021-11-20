import { Client, ClientOutputDTO } from "../model/Client";
import { BaseDatabase } from "./BaseDatabase";

export class ClientDatabase extends BaseDatabase {

    async createClient(client: Client): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: client.getId(),
                    nome: client.getNome(),
                    cpf: client.getCpf(),
                    telefone: client.getTelefone(),
                    email: client.getEmail(),
                    logradouro: client.getLogradouro(),
                    numero: client.getNumero(),
                    complemento: client.getComplemento(),
                    bairro: client.getBairro(),
                    cep: client.getCep(),
                    cidade: client.getCidade(),
                    estado: client.getEstado()
                })
                .into(this.TABLE_NAME.CLIENTES)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }


    async getAllClient(): Promise<ClientOutputDTO[]> {
        try {
            const result = await this.getConnection()
                .select("id", "nome", "telefone", "email", "cpf")
                .into(this.TABLE_NAME.CLIENTES)
                .orderBy("id")

            return result

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async updateClient(client: Client): Promise<void> {
        try {
            await this.getConnection()
                .where("id", client.getId())
                .update({
                    nome: client.getNome(),
                    cpf: client.getCpf(),
                    telefone: client.getTelefone(),
                    email: client.getEmail(),
                    logradouro: client.getLogradouro(),
                    numero: client.getNumero(),
                    complemento: client.getComplemento(),
                    bairro: client.getBairro(),
                    cep: client.getCep(),
                    cidade: client.getCidade(),
                    estado: client.getEstado()
                })
                .into(this.TABLE_NAME.CLIENTES)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getShowClient(id: string): Promise<ClientOutputDTO[]> {
        try {
            const result = await this.getConnection()
                .where("id", id)
                .select()
                .into(this.TABLE_NAME.CLIENTES)
                
                return result[0]

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async deleteClientById(id: string): Promise<void> {
        try {
                await this.getConnection()
                .where("id", id)
                .into(this.TABLE_NAME.CLIENTES)
                .del()

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

}