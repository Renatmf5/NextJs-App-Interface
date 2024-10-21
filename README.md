# Nome da Aplicação

Aplicação é uma interface Web que faz integração com a aplicação em FastApi criado no [repositório](https://github.com/Renatmf5/API-FastApi-WebScraping) com Paginas de Autenticação e autorização de usuário, e paginas de interação com os endpoints da API.
A interface web consiste em um Menu lateral ontem contem as pagina de.
- DashBoard: Onde o Usuário ve se esta logado e pode editar seu perfil, no caso somente a senha:
- Extrair: Pagina onde o Usuário tem cards que contem Botões onde é chamado as integrações com a api e envia os dados para o Data Lake no Amazon S3
- Dados: Pagina onde o Usuário consegue ler os dados dos arquivos tratados, de forma legivel e tambem pode interagir com filtros, paginação e ordenação dos dados em forma de tabela.
- Analises ML/IA: Pagina onde o Usuário pode ver os scores de treinamento de um modelo de regressão linear simples para os dados de Categoria, também pode aplicar predições apos o modelo treinado e ver graficamente as predições.
- ApiDocs: Pagina de documentação da API do projeto.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PM2](https://pm2.keymetrics.io/)

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Passo a Passo para Configuração do Ambiente

- **configure Variáveis de ambiente**:
  **NODE_ENV**=development
  **NEXT_PUBLIC_SUBDOMINIO**=api.(seu dominio)
  **PORT**=80

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Renatmf5/nextjs-app-interface.git
cd nextjs-app-interface
```

2. Instale as dependências:
```bash
- npm install
```
