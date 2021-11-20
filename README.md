# Be mobile - Teste de Back-end
O teste de back-end da Be mobile consiste em estruturar uma API RESTful e um banco de dados ligado a esta API. Trate-se de um sistema que permite cadastrar usuários externamente e, ao realizarem login, poderão registrar clientes, produtos e vendas.

## Tecnologias utilizadas
- Nodejs;
- MySQL;
- express;
- typescript;
- uuid;
- knex;
- jsonwebtoken;
- bcryptjs.


## Requisitos
- Tenha instalado em sua máquina as seguintes ferramentas: Git, Node.js.
- Para comfigurar o banco de dados crie um arquivo .env na raiz do projeto e insira as variáveis de ambiente:
```
DB_USER = 
DB_PASSWORD = 
DB_HOST = 
DB_PORT = 3306
JWT_KEY = 
DB_DATABASE_NAME = 
ACCESS_TOKEN_EXPIRES_IN =
```

## Rodando a aplicação
- Faça um clone do projeto;
- Entre no projeto e no terminal execute os comandos abaixo
### Instalar as dependências
```
npm i
```

### Criar as tabelas no banco
```
npm run migrations
```

### rodar a aplicação
```
npm run start
```


## Rotas do Sistema
- cadastro de usuário do sistema
    ```
    /user/signup
    ```

- login com JWT de usuário cadastrado
    ```
    http://localhost:3003/user/login
    ```

- clientes:
    - listar todos os clientes cadastrados
       ```
       http://localhost:3003/client/index
       ```
    - detalhar um(a) cliente e vendas a ele(a)
        ```
        http://localhost:3003/client/show/:id
        ```
    - adicionar um(a) cliente 
        ```
        http://localhost:3003/client/store
        ```
    - editar um(a) cliente
        ```
        http://localhost:3003/client/update/:id
        ```
    - excluir um(a) cliente e vendas a ele(a)
        ```
        http://localhost:3003/client/delete/id
        ```


- produtos:
    - listar todos os produtos cadastrados
        ```
        http://localhost:3003/product/index
        ```
    - detalhar um produto
        ```
        http://localhost:3003/product/show/:id
        ```

    - criar um produto
        ```
        http://localhost:3003/product/store
        ```

    - editar um produto
        ```
        http://localhost:3003/product/update/:id
        ```

- vendas:
    - registrar venda de 1 produto a 1 cliente
        ```
        http://localhost:3003/sales/store
        ```



Obs: as rotas em clientes, produtos e vendas só podem ser acessadas por usuário logado.



## Requisitos não implementado
- soft delete;
- possibilidade de filtrar as vendas por mês + ano.
