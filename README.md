# Projeto Catálogo de Produtos

### Boas vindas ao Catálogo de Produtos

## Contexto

O projeto foi uma proposta de desafio técnico para desenvolver uma aplicação que ajudasse a empresa a cadastrar produtos e suas respectivas categorias. Para isso, a proposta é fazer uma aplicação onde o usuário faça login e consulte, cadastre, edite e delete os produtos, bem como suas respectivas categorias, auxiliando na gestão do estoque.

## Como instalar

Pre-requisitos para rodar o projeto:

1. mongoDB
2. NPM

Copie a chave ssh do projeto:
~~~
git@github.com:felipedias1/products-catalog.git
~~~
Abra um terminal no seu computador e utilize os comandos a baixo na ordem que são apresentados:

~~~
git clone git@github.com:felipedias1/products-catalog.git
cd to-do-list
npm install
npm start
~~~

A aplicação está configurada para rodar na porta local 3000 - http://localhost:3000

## Modo de desenvolvimento

Este projeto foi desenvolvido com foco em Backend, utilizando o software "Isomnia" para realizar as requisições.

## Tecnologias

- NestJs
- NodeJS
- TypeScript
- MongoDB

## Como utilizar

A API possui as seguintes rotas:

### Documentação da API

- [x] [GET] /api 
  - Acessa a documentação da API feita em Swagger

### Login

- [x] [POST] /login 
  - Faz login do usuário para acesso ao sistema
  <b> Obs: Essa aplicação não cadastra novos usuários, mas utiliza JWT.
  Para gerar o token utilize esse Body na requisição.<b> 
 
~~~
{
  username: 'adm',
  password: 'adm123',
}
~~~  

### Produtos
  
- [x] [POST] /products
  - Faz o cadastramento de um novo produto (acesso com autenticação)
- [x] [GET] /products
  - Retorna todos os produtos cadastrados (acesso com autenticação)
- [x] [GET] /products/csv 
  - Retorna um arquivo csv com todos os produtos cadastrados (acesso com autenticação)
- [x] [GET] /products/pdf  
  - Retorna um arquivo pdf com todos os produtos cadastrados (acesso com autenticação)
- [x] [GET] /products:id 
  - Utilizando o id do produto, retorna um produto específico (acesso com autenticação)
- [x] [PATCH] (/products/:id)  
  - Utilizando o id do produto, o usuário poderá atualizar o produto (acesso com autenticação)
- [x] [DELETE] (/products/:id)  
  - Utilizando o id do produto, o usuário poderá deletar o produto (acesso com autenticação)
  
### Categorias
  
- [x] [POST] /categories  
  - Faz o cadastramento de uma nova categoria - (acesso com autenticação)
- [x] [GET] /categories  
  - Retorna todos as categorias cadastradas - (acesso com autenticação)
- [x] [GET] /categories/pdf  
  - Retorna um arquivo pdf com todos as categorias cadastradas - (acesso com autenticação)
- [x] [GET] /categories:id  
  - Utilizando o id da categoria, retorna uma categoria específico- (acesso com autenticação)
- [x] [PATCH] /categories/:id  
  - Utilizando o id da categoria, o usuário poderá atualizar a categoria - (acesso com autenticação)
- [x] [DELETE]/categories/:id  
  - Utilizando o id da categoria, o usuário poderá deletar a categoria - (acesso com autenticação)

 
## Qual o próximo passo?

* Desenvolver testes unitários e de integração
* Implementar Cadastro de usuários.
* Implementação de consumo de API's externas
* Desenvolver o Front-End da aplicação.
