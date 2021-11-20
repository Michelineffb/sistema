export class User{
    constructor(
    private id: string,
    private nome: string,
    private email: string,
    private senha: string,
    ){}

    getId(){
        return this.id;
    }

    getNome(){
        return this.nome
    }

    getEmail(){
        return this.email;
    }

    getSenha(){
        return this.senha;
    }

    
    static toUserModel(user: any): User {
        return new User(user.id, user.nome, user.email, user.senha);
      }


}

export interface SignupInputDTO{
    nome: string;
    email: string;
    senha: string;
}



export interface LoginInputDTO{
    email: string;
    senha: string;
}


