import { SignupInputDTO, LoginInputDTO } from './../model/User';
import { Request, Response } from "express"
import { UserBusiness } from '../business/UserBusiness';

const userBusiness = new UserBusiness();

export class UserController {

    async signup(req: Request, res: Response){

        try {
            const { nome, email, senha } = req.body

            const input: SignupInputDTO ={
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            }

            const token = await userBusiness.signup(input);

            res.status(201).send({ 
                message: "Usuário cadastrado.",
                token 
            })

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    async login (req: Request, res: Response){
        try {
            const { email, senha } = req.body

            const input: LoginInputDTO = {
                email: req.body.email,
                senha: req.body.senha
            }

            const token = await userBusiness.login(input);

            res.status(200).send({ message: "Login realizado com sucesso", token });

        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}