# Shopper
Teste técnico - Desenvolvimento de Software JR. Full Stack - Shopper.com


# Sobre o aplicativo
Em fase de desenvolvimento

## Ir para...
[Instalação](#Instalação) | [Backend](#Backend) | [Frontend](#Frontend)

# Instalação

1. Faça o download da aplicação clicando <a href="https://github.com/mazinhorj/shopper/archive/refs/heads/main.zip"> aqui</a>.

2. Descompacte o arquivo baixado (shopper-main.zip) em seu computador e abra a pasta <code>shopper-main</code>. Ela será a pasta raiz da aplicação.



## Backend
1. Estando na pasta raiz, abra a pasta <code>/backend</code>;

2. Abrir a pasta backend em um terminal e rodar o comando:
        <pre>npm install</pre>

3. Criando e populando o banco de dados:

    3.1. Crie um banco de dados com o nome <code>shopper</code>.

    3.2. Execute os passos 3.3 e 3.4 apenas após iniciar a aplicação pela primeira vez.
    
    3.3. Encontre o arquivo <code>database.sql</code>. Esse arquivo contém
o script que define e preenche as tabelas utilizados na aplicação.
    
    3.4. Execute o arquivo no seu gerenciador de banco de dados.


4. Criar o arquivo .env na pasta backend com as seguintes variáveis de ambiente:

        DB_HOST=localhost

        DB_USER= #inserir o usuário do seu banco de dados

        DB_PASS= #inserir a senha do seu usuário no banco de daodos

        DB_NAME= #inserir o nome do seu banco de dados 

        DB_DIALECT=mysql

        PORT=5000

5. Antes de iniciar a aplicação pela primeira vez, descomente a linha 29 do arquivo index.js. Ela irá construir as tabelas no banco criado.
        5.1. Com as tabelas criadas, execute os passos 3.3 e 3.4.
        Obs.: É importante comentar esta linha novamente pois ela limpa todos os registros no banco!

6. Rode no terminal o comando:
        <pre>npm start</pre>

7. Se tudo etiver correto, o backend da aplicação deverá estar ativo e você receberá no terminal a seguinte mensagem:

        > backend@1.0.0 start
        > nodemon ./index.js localhost 5000

        [nodemon] 2.0.22
        [nodemon] to restart at any time, enter `rs`
        [nodemon] watching path(s): *.*
        [nodemon] watching extensions: js,mjs,json
        [nodemon] starting `node ./index.js localhost 5000`
        DB connected.
        Server status: Loaded and running on port 5000.
        Executing (default): SELECT 1+1 AS result
        Executing (default): SELECT 1+1 AS result

<hr>

## Frontend
1. Estando na pasta raiz, abra a pasta <code>/frontend</code>;

2. Abrir a pasta frontend em um terminal e rodar o comando:
        <pre>npm install</pre>
        Obs.: Será necessário abrir esta pasta em um terminal diferente do backend para que a aplicação funcione corretamente.

3. Ao concluir a instalação de todos os módulos e dependências, execute no terminal o comando:
        <pre>npm run dev</pre>

6. Se tudo etiver correto, o frontend da aplicação deverá estar ativo e você receberá no terminal a seguinte mensagem:

          ➜  Local:   http://localhost:5173/
          ➜  Network: use --host to expose
          ➜  press h to show help

7. Em seu navegador, abra o endereço indicado no terminal, conforme a mensagem acima.

<hr>

OBS. Para quaisquer problemas na instalaçao, favor entrar em contato diretamente com o desenvolvedor: <a href="mailto:dev.mazinho@gmail.com">Mazinho</a>

## Ir para...
[Topo](#Shopper) | [Instalação](#Instalação) | [Backend](#Backend) | [Frontend](#Frontend)


