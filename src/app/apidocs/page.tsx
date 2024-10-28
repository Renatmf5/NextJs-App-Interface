import React from 'react';

const ApiDocsPage = () => {
  return (
    <div className='sm:ml-14 p-4'>
      <h1>FastAPI API Documentation</h1>
      <p>
        Este repositório contém a implementação de uma API desenvolvida em FastAPI para manipular dados relacionados à produção, importação, exportação e comercialização de produtos da <a href="http://vitibrasil.cnpuv.embrapa.br" target="_blank" rel="noopener noreferrer">Embrapa</a>. A aplicação utiliza uma arquitetura de Data Lake no AWS S3 para armazenar arquivos na Vinícola e posteriormente trabalhar em cima dos dados desses arquivos. A aplicação também tem um pequeno recurso piloto que faz uso de machine learning para previsões de dados.
      </p>

      <h2>Funcionalidades</h2>
      <ul>
        <li><strong>Autenticação via JWT</strong>: A API utiliza autenticação baseada em JWT para proteger os endpoints.</li>
        <li><strong>Operações com AWS S3</strong>: Faz upload e download de arquivos para o S3 e manipula arquivos em formato Parquet.</li>
        <li><strong>Previsões com Machine Learning</strong>: Modelos de previsão para diferentes produtos baseados em séries temporais.</li>
        <li><strong>Web Scraping</strong>: Extrai dados de URLs específicas e armazena no data lake S3.</li>
      </ul>

      <h2>Endpoints</h2>

      <h3>Autenticação</h3>
      <ul>
        <li>
          <strong>POST /usuarios/login</strong>: Autentica um usuário e retorna um token JWT.
          <ul>
            <li><strong>Parâmetros</strong>:</li>
            <ul>
              <li><strong>username</strong>: string - Nome de usuário</li>
              <li><strong>password</strong>: string - Senha do usuário</li>
            </ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>200 OK</strong>: Token JWT válido</li>
              <li><strong>401 Unauthorized</strong>: Credenciais inválidas</li>
            </ul>
          </ul>
        </li>
        <li>
          <strong>POST /usuarios/signup</strong>: Cria um novo usuário.
          <ul>
            <li><strong>Parâmetros</strong>:</li>
            <ul>
              <li><strong>username</strong>: string - Nome de usuário</li>
              <li><strong>password</strong>: string - Senha do usuário</li>
              <li><strong>admin</strong>: boolean (opcional) - Indica se o usuário terá privilégios de administrador</li>
            </ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>201 Created</strong>: Usuário criado com sucesso</li>
              <li><strong>406 Not Acceptable</strong>: Nome de usuário já está em uso</li>
            </ul>
          </ul>
        </li>
        <li>
          <strong>GET /usuarios/logado</strong>: Retorna as informações do usuário autenticado.
          <ul>
            <li><strong>Cabeçalho</strong>:</li>
            <ul>
              <li><strong>Authorization</strong>: Bearer &lt;token&gt;</li>
            </ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>200 OK</strong>: Detalhes do usuário autenticado</li>
              <li><strong>401 Unauthorized</strong>: Token JWT inválido ou não fornecido</li>
            </ul>
          </ul>
        </li>
        <li>
          <strong>GET /usuarios/usuarios</strong>: Retorna uma lista de todos os usuários cadastrados no sistema.
          <ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>200 OK</strong>: Lista de usuários</li>
            </ul>
          </ul>
        </li>
        <li>
          <strong>PUT /usuarios/usuario_id</strong>: Atualiza os dados de um usuário específico.
          <ul>
            <li><strong>Parâmetros</strong>:</li>
            <ul>
              <li><strong>usuario_id</strong>: int - ID do usuário a ser atualizado</li>
              <li><strong>username</strong>: string (opcional) - Nome de usuário</li>
              <li><strong>password</strong>: string (opcional) - Nova Senha</li>
              <li><strong>admin</strong>: boolean (opcional) - Atualizar privilégio de administrador</li>
            </ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>202 Accepted</strong>: Usuário atualizado com sucesso</li>
              <li><strong>404 Not Found</strong>: Usuário não encontrado</li>
            </ul>
          </ul>
        </li>
      </ul>

      <h3>Manipulação de Dados</h3>
      <ul>
        <li>
          <strong>GET /producao/download-arquivo</strong>: Baixa os dados de produção e os envia para o Data Lake (S3).
          <ul>
            <li><strong>Cabeçalho</strong>:</li>
            <ul>
              <li><strong>Authorization</strong>: Bearer &lt;token&gt;</li>
            </ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>200 OK</strong>: Dados enviados com sucesso ao Data Lake</li>
              <li><strong>403 Forbidden</strong>: Usuário não autorizado</li>
            </ul>
          </ul>
        </li>
        <li>
          <strong>GET /processamento/download-arquivo</strong>: Baixa os dados de processamento e os envia para o Data Lake (S3).
          <ul>
            <li><strong>Cabeçalho</strong>:</li>
            <ul>
              <li><strong>Authorization</strong>: Bearer &lt;token&gt;</li>
            </ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>200 OK</strong>: Dados de processamento enviados ao Data-Lake com sucesso</li>
              <li><strong>403 Forbidden</strong>: Usuário não autorizado</li>
            </ul>
          </ul>
        </li>
        <li>
          <strong>GET /comercializacao/download-arquivo</strong>: Baixa os dados de comercialização e os envia para o Data Lake (S3).
          <ul>
            <li><strong>Cabeçalho</strong>:</li>
            <ul>
              <li><strong>Authorization</strong>: Bearer &lt;token&gt;</li>
            </ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>200 OK</strong>: Dados de comercialização enviados ao Data-Lake com sucesso</li>
              <li><strong>403 Forbidden</strong>: Usuário não autorizado</li>
            </ul>
          </ul>
        </li>
        <li>
          <strong>GET /importacao/download-arquivo</strong>: Baixa os dados de importação e os envia para o Data Lake (S3).
          <ul>
            <li><strong>Cabeçalho</strong>:</li>
            <ul>
              <li><strong>Authorization</strong>: Bearer &lt;token&gt;</li>
            </ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>200 OK</strong>: Dados de importação enviados ao Data-Lake com sucesso</li>
              <li><strong>403 Forbidden</strong>: Usuário não autorizado</li>
            </ul>
          </ul>
        </li>
        <li>
          <strong>GET /exportacao/download-arquivo</strong>: Baixa os dados de exportação e os envia para o Data Lake (S3).
          <ul>
            <li><strong>Cabeçalho</strong>:</li>
            <ul>
              <li><strong>Authorization</strong>: Bearer &lt;token&gt;</li>
            </ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>200 OK</strong>: Dados de exportação enviados ao Data-Lake com sucesso</li>
              <li><strong>403 Forbidden</strong>: Usuário não autorizado</li>
            </ul>
          </ul>
        </li>
        <li>
          <strong>GET /fetch-data</strong>: Busca dados filtrados de um arquivo específico no S3.
          <ul>
            <li><strong>Parâmetros</strong>:</li>
            <ul>
              <li><strong>file_key</strong>: string - Nome do arquivo no S3</li>
              <li><strong>year_filter</strong>: string - Filtro de ano para os dados</li>
            </ul>
            <li><strong>Cabeçalho</strong>:</li>
            <ul>
              <li><strong>Authorization</strong>: Bearer &lt;token&gt;</li>
            </ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>200 OK</strong>: Dados retornados com sucesso</li>
              <li><strong>403 Forbidden</strong>: Usuário não autorizado</li>
            </ul>
          </ul>
        </li>
        <li>
          <strong>GET /fetch-data/tables</strong>: Lista os arquivos disponíveis no bucket do S3.
          <ul>
            <li><strong>Cabeçalho</strong>:</li>
            <ul>
              <li><strong>Authorization</strong>: Bearer &lt;token&gt;</li>
            </ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>200 OK</strong>: Lista de arquivos do S3</li>
              <li><strong>403 Forbidden</strong>: Usuário não autorizado</li>
            </ul>
          </ul>
        </li>
      </ul>

      <h3>Machine Learning</h3>
      <ul>
        <li>
          <strong>GET /ml-models/train</strong>: Treina modelos de previsão usando dados do S3.
          <ul>
            <li><strong>Parâmetros</strong>:</li>
            <ul>
              <li><strong>file_key</strong>: string - Nome do arquivo de dados no S3</li>
            </ul>
            <li><strong>Cabeçalho</strong>:</li>
            <ul>
              <li><strong>Authorization</strong>: Bearer &lt;token&gt;</li>
            </ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>200 OK</strong>: Dados retornados com sucesso</li>
              <li><strong>403 Forbidden</strong>: Usuário não autorizado</li>
            </ul>
          </ul>
        </li>
        <li>
          <strong>GET /ml-models/predict</strong>: Gera previsões futuras com base em dados existentes.
          <ul>
            <li><strong>Parâmetros</strong>:</li>
            <ul>
              <li><strong>file_key</strong>: string - Nome do arquivo de dados no S3</li>
              <li><strong>anos_futuros</strong>: lista de strings - Anos para previsão</li>
            </ul>
            <li><strong>Cabeçalho</strong>:</li>
            <ul>
              <li><strong>Authorization</strong>: Bearer &lt;token&gt;</li>
            </ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>200 OK</strong>: Dados retornados com sucesso</li>
              <li><strong>403 Forbidden</strong>: Usuário não autorizado</li>
            </ul>
          </ul>
        </li>
      </ul>

      <h3>Endpoint Raiz</h3>
      <ul>
        <li>
          <strong>GET /</strong>: Endpoint raiz que retorna uma mensagem indicando que a API está em execução.
          <ul>
            <li><strong>Resposta</strong>:</li>
            <ul>
              <li><strong>200 OK</strong>:message: API is running/</li>
            </ul>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ApiDocsPage;