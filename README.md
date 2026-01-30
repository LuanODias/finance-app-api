# Finance App - Full Stack Project

Este projeto é uma aplicação completa de gestão financeira, composta por uma **API RESTful** robusta (Back-end) e uma interface moderna em **React** (Front-end).

O objetivo principal deste projeto é demonstrar a implementação de arquiteturas de software sólidas (**Clean Architecture**, **MVC**) e boas práticas de desenvolvimento.

## 🚀 Tecnologias Utilizadas

### Back-end

- **Node.js** & **Express**: Servidor web e roteamento.
- **PostgreSQL**: Banco de dados relacional.
- **Prisma ORM**: Modelagem de dados e migrações.
- **Docker**: Containerização do banco de dados.
- **Zod**: Validação de dados (Schemas).
- **Jest**: Testes automatizados.

### Front-end

- **React**: Biblioteca para construção de interfaces.
- **Vite**: Build tool e servidor de desenvolvimento rápido.
- **CSS Modules**: Estilização.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node)
- [Docker](https://www.docker.com/) & **Docker Compose** (Para rodar o banco de dados)
- [Git](https://git-scm.com/)

---

## 🛠️ Instalação e Execução

### Passo 1: Clonar o Repositório

````bash
git clone [https://github.com/seu-usuario/finance-app-api.git](https://github.com/seu-usuario/finance-app-api.git)
cd finance-app-api```

# Passo 2: Configurando o Back-end (API)
A API está localizada na raiz do projeto.

## Instale as dependências:
```bash
npm install
````

## Configure as Variáveis de Ambiente:

- Renomeie o arquivo `.env.example` para `.env`
- Ajuste as variáveis se necessário (a configuração padrão geralmente funciona com o Docker Compose fornecido).

```bash
cp .env.example .env
```

- Certifique-se de que a `DATABASE_URL` no `.env` corresponde às credenciais definidas no `docker-compose.yml`.

## Suba o Banco de Dados (Docker):

```bash
docker-compose up -d
```

> Isso criará um container Postgres rodando na porta 5432.

## Execute as Migrations (Prisma):

Para criar as tabelas no banco de dados:

```bash
npx prisma migrate dev
```

## Inicie o Servidor:

```bash
npm run start:dev
```

🚀 A API estará rodando em: [http://localhost:3000](http://localhost:3000) (ou a porta definida no seu `.env`).

# Passo 3: Configurando o Front-end (Web)

A interface está localizada na pasta `web`.

## Navegue até a pasta do front-end:

```bash
cd web
```

## Instale as dependências:

```bash
npm install
```

## Inicie o Front-end:

```bash
npm run dev
```

🎨 A aplicação web estará acessível em: [http://localhost:5173](http://localhost:5173) (Padrão do Vite).

# 🧪 Rodando Testes (Back-end)

Para garantir que tudo está funcionando como esperado, você pode rodar os testes unitários e de integração da API.
na raiz do projeto:

```bash
npm run test

```
