# Resilia M5 - T11 - API Academia

Como projeto de finalização do Módulo 05 da [Resilia Educação](https://www.resilia.com.br/) tivemos que desenvolver um site usando [React](https://reactjs.org/) capaz de consumir uma API, esse repositório contém a API criada para comportar as necessidades do site desenvolvido.

Projeto feito utilizando o [Node.js](https://nodejs.org/en/) e o framework [Express](https://expressjs.com/) e também tentando seguir o [padrão MVC](https://pt.wikipedia.org/wiki/MVC).

## Objetivo

Essa API tem como objetivo a capacidade de criação de usuários e de login dos mesmos.

## Rotas implementadas

### Usuários

- **GET `/usuarios`**

    Retorna todos os usuários no banco de dados.

    Schema da resposta

    ```json
   {
    "ListaUsuarios": [
        {
          "id": <Int>,
          "nome": <String>,
          "cpf": <String>,
          "email": <String>,
          "senha": <String>,
        },
      ]
    }

- **POST `/cadastrar`**

    Insere um usuário no banco de dados.

    Dados a serem enviados no body via POST

    | Parâmetro | Descrição |
    |---|---|
    | `"nome"` | Nome do usuário (string, obrigatório) |
    | `"cpf"` | CPF do usuário (número de 11 digitos, obrigatório, aceita pontos e traços, deve ser um CPF válido e não cadastrado ainda) |
    | `"email"` | Email do usuário (string, obrigatório, deve ser um email válido) | |
    | `"senha"` | Senha do usuário (string, obrigatório)|
  
    Exemplo de body da requisição:

    ```json
    {
        "nome": "Jão da Silva",
        "cpf": "836.799.020-00",
        "email": "jao.silva@example.com",
        "senha": "123456"
    }
    ```

    Exemplo de resposta:

    ```json
    {
      "erro": false,
      "Resposta": "Usuário de nome 'Jão da Silva' adicionado ao banco de dados com sucesso."
    }
    ```

- **PUT `/atualizar/{id}`**

    Modifica os dados do usuário com o ID especificado, caso seja encontrado no banco de dados.

    Dados a serem enviados no body via PUT, essa rota usa a mesma validação de dados da rota POST.

    | Parâmetro | Descrição |
    |---|---|
    | `"nome"` | Nome do usuário (string, obrigatório) |
    | `"cpf"` | CPF do usuário (número de 11 digitos, obrigatório, aceita pontos e traços, deve ser um CPF válido e não cadastrado ainda) |
    | `"email"` | Email do usuário (string, obrigatório, deve ser um email válido) | |
    | `"senha"` | Senha do usuário (string, obrigatório)|

    Exemplo de body da requisição:

    ```json
    {
        "nome": "Jão da Silva Atualizado",
        "cpf": "994.279.600-27",
        "email": "jao.silva@example.com",
        "senha": "654321"
    }
    ```

    Exemplo de resposta:

    ```json
        {
            "erro": false,
            "resposta": "Dados do usuário 'Jão da Silva Atualizado' atualizado com sucesso no banco de dados.",
            "dadosAntigos": [
                {
                    "id": 4,
                    "nome": "Jão da Silva",
                    "cpf": "836.799.020-00",
                    "email": "jao.silva@example.com",
                    "senha": "$2b$11$32Fo7yZeOTKKnqD0wt9Wx.zyW3B.ihlNMeObcgrWR.fRXhvkv1Ksa"
                }
            ],
            "dadosAtualizados": [
                {
                    "id": 4,
                    "nome": "Jão da Silva Atualizado",
                    "cpf": "994.279.600-27",
                    "email": "jao.silva@example.com",
                    "senha": "$2b$11$XwA8vZqfknwF/N8hX.e5reIL2hTikVglWNKWE32YOOBKpG0z/VjV6"
                }
            ]
        }
    ```

- **DELETE `/funcionarios/apagar/{id}`**

    Apaga o funcionário com o ID especificado, caso seja encontrado no banco de dados.

    Exemplo de resposta:

    ```json
    {
        "erro": false,
        "resposta": "Usuário de ID 4 apagado com sucesso.",
        "usuarioApagado": {
            "id": 4,
            "nome": "Jão da Silva Atualizado",
            "cpf": "994.279.600-27",
            "email": "jao.silva@example.com",
            "senha": "$2b$11$XwA8vZqfknwF/N8hX.e5reIL2hTikVglWNKWE32YOOBKpG0z/VjV6"
        }
    }
    ```

- **POST `/medidas/cadastrar`**

    Insere as medidas de um usuário no banco de dados.

    Dados a serem enviados no body via POST

    Exemplo de body da requisição:

    ```json
    {
        "user_id": 1,
        "altura": 1.23, 
        "peso": 1.23, 
        "massaMuscular": 1.23, 
        "ombros": 1.23, 
        "taxaGordura": 1.23, 
        "tricipal": 1.23, 
        "peitoral": 1.23, 
        "cintura": 1.23, 
        "quadril": 1.23, 
        "bracoE": 1.23, 
        "bracoD": 1.23, 
        "pernaE": 1.23, 
        "pernaD": 1.23, 
        "panturrilhaE": 1.23, 
        "panturrilhaD": 1.23, 
        "abdomem": 1.23, 
        "gluteo": 1.23
    }
    ```

    Exemplo de resposta:

    ```json
    {
        "registraMedidas": "Medidas adicionadas ao banco de dados com sucesso."
    }
    ```

- **GET `/medidas/listar`**

    Retorna todas as medidas no banco de dados.

    Schema da resposta

    ```json
   {
        "listaMedidas": [
            {
                "id": 1,
                "user_id": 1,
                "timestamp": "2022-04-24 05:02:15",
                "altura": 1.23,
                "peso": 1.23,
                "massaMuscular": 1.23,
                "ombros": 1.23,
                "taxaGordura": 1.23,
                "tricipal": 1.23,
                "peitoral": 1.23,
                "cintura": 1.23,
                "quadril": 1.23,
                "bracoE": 1.23,
                "bracoD": 1.23,
                "pernaE": 1.23,
                "pernaD": 1.23,
                "panturrilhaE": 1.23,
                "panturrilhaD": 1.23,
                "abdomem": 1.23,
                "gluteo": 1.23
            }
        ]
    }
