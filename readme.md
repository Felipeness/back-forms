# 🚀 Projeto Back-End Node.js

Bem-vindo ao repositório do projeto Back-End! Este projeto é uma aplicação back-end construída com Node.js, Express, PostgreSQL e TypeScript, focada na gestão de clientes e otimização de rotas.

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como Executar](#-como-executar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Destaques do Projeto](#-destaques-do-projeto)

## 🌟 Funcionalidades

- **Gerenciamento de Clientes**: Adicione, atualize, visualize e exclua informações dos clientes.
- **Otimização de Rotas**: Calcule rotas otimizadas com base nas coordenadas dos clientes.

## 💻 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express-validator](https://express-validator.github.io/docs/)
- [pg](https://node-postgres.com/)
- [pg-promise](https://vitaly-t.github.io/pg-promise/index.html)
- [nodemon](https://nodemon.io/)

## 🚀 Como Executar

Para rodar o projeto localmente, siga estas etapas:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Felipeness/teste-facilita-back.git
   cd nome-do-seu-projeto
   ```

## Instale as dependências

```bash
npm install
```

## Configure o ambiente

Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias (por exemplo, as credenciais do banco de dados).
No caso atual, está sendo feita conexão fia URL diretamente no arquivo database.ts
## Execute o projeto

- Em desenvolvimento:

    ```bash
    npm run dev
    ```

- Em produção:

    ```bash
    npm start
    ```

## 📁 Estrutura do Projeto

- `src/controllers`: Contém os controladores para lidar com as requisições e respostas da API.
- `src/models`: Define a lógica e a interação com o banco de dados.
- `src/routes`: Gerencia as rotas da API.
- `src/services`: Contém a lógica de negócios principal.
- `src/database`: Contém a conexão com o PostgreSQL

## 🏗️ Arquitetura do Projeto

Neste projeto, adotamos a arquitetura Model-View-Controller (MVC), uma escolha estratégica para:

- **Separar Responsabilidades**: MVC nos permite dividir a aplicação em três componentes interconectados, mas independentes. Isso simplifica o gerenciamento do código e a manutenção, já que cada componente tem uma responsabilidade clara.
  - **Model**: Lida com a lógica e a interação com o banco de dados.
  - **View**: Embora em aplicações back-end como esta o componente de visualização não seja sempre explícito, ele pode ser representado por templates de email ou interfaces de administração.
  - **Controller**: Atua como intermediário entre Model e View, gerenciando a entrada do usuário e as solicitações de sistema.
- **Facilitar a Escalabilidade**: A clara separação de preocupações facilita a expansão e a escalabilidade do projeto.
- **Melhorar a Colaboração**: Com a arquitetura MVC, diferentes membros da equipe podem trabalhar em componentes distintos sem interferir uns nos outros.

## 🌟 Destaques do Projeto

- **Gerenciamento Eficiente de Clientes**: Através de uma série de endpoints RESTful, nosso sistema permite gerenciar facilmente informações dos clientes, incluindo adição, atualização, visualização e exclusão.
- **Otimização de Rotas**: Uma característica única do nosso projeto é a capacidade de calcular rotas otimizadas. Isso é especialmente útil para logística e planejamento de entregas, maximizando a eficiência e reduzindo custos.
- **Validação Robusta**: Utilizamos express-validator para garantir que os dados de entrada estejam corretos e seguros, minimizando a possibilidade de erros e vulnerabilidades.

**Documentação API com Swagger**: Integrando o Swagger para documentação da API, proporcionamos uma interface clara e interativa, facilitando tanto para desenvolvedores quanto para usuários finais entenderem e interagirem com nossa API.

- **Segurança e Desempenho**: Atenção especial para aspectos de segurança e desempenho, incluindo proteção contra injeção SQL e otimização das consultas ao banco de dados.
- **Código Moderno e Legível**: Graças ao uso de TypeScript, o projeto beneficia-se de um código mais seguro e fácil de entender, melhorando a experiência de desenvolvimento e a manutenção a longo prazo.
