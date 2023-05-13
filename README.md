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

2. Criando e populando o banco de dados:

    2.1. Encontre o arquivo <code>database.sql</code>. Esse arquivo contém
o script que define e preenche as tabelas utilizados na aplicação.
    2.2. Execute o arquivo no seu gerenciador de banco de dados.

3. Abrir a pasta backend em um terminal e rodar o comando:
        <pre>npm install</pre>

4. Criar o arquivo .env na pasta backend com as seguintes variáveis de ambiente:

        DB_HOST=localhost

        DB_USER= #inserir o usuário do seu banco de dados

        DB_PASS= #inserir a senha do seu usuário no banco de daodos

        DB_NAME= #inserir o nome do seu banco de dados 

        DB_DIALECT=mysql

        PORT=5000

5. Rode no terminal o comando:
        <pre>npm start</pre>

6. Se tudo etiver correto, o backend da aplicação deverá estar ativo e você receberá no terminal a seguinte mensagem:

        />> Mensagem do backend <<\

<hr>

## Frontend
1. Estando na pasta raiz, abra a pasta <code>/frontend</code>;

2. Abrir a pasta frontend em um terminal e rodar o comando:
        <pre>npm install</pre>
        Obs.: Será necessário abrir esta pasta em um terminal diferente do backend para que a aplicação funcione corretamente.

3. Ao concluir a instalação de todos os módulos e dependências, execute no terminal o comando:
        <pre>npm run dev</pre>

6. Se tudo etiver correto, o frontend da aplicação deverá estar ativo e você receberá no terminal a seguinte mensagem:

        />> Mensagem do frontend <<\

7. Em seu navegador, abra o endereço indicado no terminal, conforme a mensagem acima.

<hr>

OBS. Para quaisquer problemas na instalaçao, favor entrar em contato diretamente com o desenvolvedor: <a href="mailto:dev.mazinho@gmail.com">Mazinho</a>

## Ir para...
[Topo](#Shopper) [Instalação](#Instalação) | [Backend](#Backend) | [Frontend](#Frontend)


