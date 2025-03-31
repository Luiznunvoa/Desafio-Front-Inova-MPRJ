# Desafio Front Inova MPRJ - Luiz Gabriel Moraes Pinheiro

O desafio tem como objetivo desenvolver uma plataforma com informações extraídas de fontes públicas sobre as compras diretas realizadas por municípios do Rio de Janeiro.

## Ferramentas

Para o projeto, foi criada uma aplicação web baseada em <i>TypeScript</i>, utilizando <i>Vite</i> como ferramenta de build. Foram empregadas as bibliotecas <i>React</i>, <i>React Query</i>, <i>Axios</i>, <i>Zustand</i> e <i>TailwindCSS</i> para a estilização.

## Implementação

A implementação conta com três páginas principais:
1. Uma introdução ao projeto.
2. Uma lista de municípios, exibindo o valor total gasto em compras diretas e o número total de compras realizadas.
3. Uma página de detalhes, com informações detalhadas sobre as compras diretas de um município selecionado.

### Página Inicial
![Página Inicial](https://i.postimg.cc/1tKhYST6/2025-03-31-10-49-30.jpg "Página Inicial")

### Lista de Municípios
![Lista de Municípios](https://i.postimg.cc/pdztzzJs/2025-03-31-10-50-47.jpg "Lista de Municípios")

### Compras do Município
![Compras do Município](https://i.postimg.cc/Y0ncM3tC/2025-03-31-10-52-06.jpg "Compras do Município")

## Como Instalar e Executar

Para executar a aplicação web, siga os passos abaixo:

1. Clonar o repositório:  
   ```sh
   git clone https://github.com/Luiznunvoa/Desafio-Front-Inova-MPRJ/
   ```
2. Renomear o arquivo oculto `.env.example` para `.env`.
3. Instalar as dependências do projeto:  
   ```sh
   npm install
   ```
4. Executar o projeto:  
   ```sh
   npm run dev
   ```
5. Acessar a URL exibida no console para visualizar a aplicação.

## Observação

Atualmente, o projeto obtém os dados a partir de um arquivo JSON localizado na pasta `data` no diretório raiz do projeto. Para recriar os dados, execute o seguinte comando em um terminal Linux:
```sh
curl https://dados.tcerj.tc.br/api/v1/compras_diretas_municipio | jq . > data/data.json
```

Também é possível alterar a única variável de ambiente no arquivo `.env` para apontar para a URL da API. No entanto, isso exigirá a configuração de um servidor proxy para permitir a requisição diretamente da aplicação web.

