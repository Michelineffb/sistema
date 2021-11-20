import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    async createUser(
        id: string,
        nome: string,
        email: string,
        senha: string
    ): Promise<void>{
        try {
            await this.getConnection()
            .insert({
                id,
                nome,
                email,
                senha
            })
            .into(this.TABLE_NAME.USUARIOS)
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getUserByEmail(email: string): Promise<any>{
        try {
            const result: any = await this.getConnection()
            .select("*")
            .where({ email })
            .into(this.TABLE_NAME.USUARIOS)

            return result[0];

        } catch (error) {
            throw new Error( error.sqlMessage || error.message )
        }
    }
}