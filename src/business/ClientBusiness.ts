import { NotFoundError } from './../error/NotFoundError';
import { SalesDatabase } from './../data/SalesDatabase';
import { ClientDatabase } from './../data/ClientDatabase';
import { UnauthorizedError } from './../error/UnauthorizedError';
import { Authenticator } from './../services/Authenticator';
import { Client, ClientInputDTO } from "../model/Client";
import { IdGenerator } from '../services/IdGenerator';
import { CEP_REGEX, CPF_REGEX, EMAIL_REGEX, PHONE_REGEX } from '../services/regexValidar';

const tokenManager = new Authenticator();
const idGenerator = new IdGenerator();

export class ClientBusiness {

    async storeClient(input: ClientInputDTO, token: string) {

        try {

            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            tokenManager.getData(token)

            if (!input.nome || !input.cpf || !input.telefone || !input.email || !input.logradouro || !input.numero || !input.bairro || !input.cep || !input.cidade || !input.estado) {
                throw new Error("Preencha todos os campos para registro do cliente");
            }

            if (!EMAIL_REGEX.test(input.email)) {
                throw new Error("O formato do email é inválido")
            }

            if (!PHONE_REGEX.test(input.telefone)) {
                throw new Error("O formato do phone é inválido. Insira nesse formato (xx) xxxxx-xxxx")
            }

            if (!CPF_REGEX.test(input.cpf)) {
                throw new Error("CPF inválido")
            }

            if (!CEP_REGEX.test(input.cep)) {
                throw new Error("Cep inválido")
            }

            if (input.nome.length < 10) {
                throw new Error("O nome deve ter, no mínimo, 10 caracteres");
            }

            const id = idGenerator.generate();

            await new ClientDatabase().createClient(Client.toClientModel({
                ...input,
                id
            }));

        } catch (error) {
            throw new Error(error.message)
        }

    }

    async getAllClient(token: string) {

        try {

            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            const tokenData = tokenManager.getData(token)

            const result = await new ClientDatabase().getAllClient();

            return result

        } catch (error) {
            throw new Error(error.message)
        }

    }

    async updateClient(input: ClientInputDTO, token: string, id: string) {

        try {

            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            tokenManager.getData(token)

            await new ClientDatabase().updateClient(
                Client.toClientModel({
                    ...input,
                    id
                })
            );


        } catch (error) {
            throw new Error(error.message)
        }

    }

    async getShowClient(id: string, token: string) {

        try {

            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            tokenManager.getData(token)

            const result = await new ClientDatabase().getShowClient(id);

            const salesDatabase = new SalesDatabase();
            const vendas = await salesDatabase.getSaleById(id)

            if(!result){
                throw new NotFoundError("Usuário não encontrado")
            }

            return {
                Cliente: result,
                Vendas: vendas
            }

        } catch (error) {
            throw new Error(error.message)
        }

    }

    async deleteClientById(id: string, token: string) {

        try {

            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            tokenManager.getData(token)

            const salesDataBase = new SalesDatabase()
            const deleteSales = await salesDataBase.deleteSaleById(id)

            await new ClientDatabase().deleteClientById(id);

        } catch (error) {
            throw new Error(error.message)
        }

    }

}