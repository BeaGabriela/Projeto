DROP DATABASE IF EXISTS Pizzaria; --Apaga um banco de dados existente com o mesmo nome.
CREATE DATABASE Pizzaria charset=UTF8 collate utf8_general_ci; --Cria um banco de dados do nome pizzaria e passa a confuguração UTP8
USE Pizzaria; --Define o banco de dadoa a ser usado;

--Criando a tabela de clientes;
CREATE TABLE Clientes(
    id_cliente INTEGER PRIMARY KEY AUTO_INCREMENT,

    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,

    nome VARCHAR(25) NOT NULL,
    telefone VARCHAR(25) NOT NULL,
    logradouro VARCHAR(30),
    numero INTEGER,
    complemento VARCHAR(30),
    bairro VARCHAR(30),
    cidade VARCHAR(30),
    estado VARCHAR(30),
    cep NUMERIC(8,2),
    referencia VARCHAR(30)
);

--Criando um arquivo que sempre que o banco for reiniciado, a tabela clientes começa com alguns clientes.
LOAD DATA INFILE 'C:/Users/Undertaker/Desktop/Pizzaria/BCD/dados/cliente.csv'
INTO TABLE Clientes
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY "\r\n"
IGNORE 1 ROWS;


--Criando a tabela de pizzas.
CREATE TABLE Pizzas(
    id_pizza INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30),
    descricao VARCHAR(30),
    valor DECIMAL(4,2)
);

--Criando um arquivo para sempre que o banco de dados precisar ser criado novamente, terá algumas pizzas já agregada a tabela pizza;
LOAD DATA INFILE 'C:/Users/Undertaker/Desktop/Pizzaria/BCD/dados/pizzas.csv'
INTO TABLE Pizzas
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY "\r\n"
IGNORE 1 ROWS;



--Criando a tabela de pedidos.
CREATE TABLE Pedidos(
    pedido_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    valor NUMERIC(4,2),
    data_pedido DATE NOT NULL,
    
    cliente_id INTEGER NOT NULL,

    FOREIGN KEY (cliente_id) REFERENCES Clientes(id_cliente)
);

--Criando um arquivo para sempre que o banco de dados precisar ser criado novamente, terá alguns pedidos já agregados a tabela pedidos;
LOAD DATA INFILE 'C:/Users/Undertaker/Desktop/Pizzaria/BCD/dados/pedidos.csv'
INTO TABLE Pedidos
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY "\r\n"
IGNORE 1 ROWS;


--Criando a tabela de itens, que relaciona a pizza ao pedido feito
CREATE TABLE item_pedido(
    pedido_id INTEGER,
    id_pizza INTEGER,
    quantidade DECIMAL(4,2),
    valor DECIMAL(4,2)
);

--Criando um arquivo para sempre que o banco de dados precisar ser criado novamente, terá alguns pedidos já agregados a tabela item_pedidos;
LOAD DATA INFILE 'C:/Users/Undertaker/Desktop/Pizzaria/BCD/dados/item_pedido.csv'
INTO TABLE item_pedido
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY "\r\n"
IGNORE 1 ROWS;


--Criando uma tabela para armazenar imagens localmente, ou melhor, o caminho da imagem. 
CREATE TABLE Imagens(
    id_imagem INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    caminho VARCHAR(500),
    data_postada DATETIME DEFAULT CURRENT_TIMESTAMP,

    id_pizza INTEGER,

    FOREIGN KEY (id_pizza) REFERENCES Pizzas(id_pizza) 
);

--Criando um arquivo para preeencher a tabela imagens sempre que o banco for reiniciado.
LOAD DATA INFILE 'C:/Users/Undertaker/Desktop/Pizzaria/BCD/dados/imagens.csv'
INTO TABLE Imagens
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY "\r\n"
IGNORE 1 ROWS;


--Criado uma tabela que mostra a pizza, a quantidade e o valor do item_pedido
DROP IF EXISTS vw_pizza_ITEM_Pedido;
CREATE View vw_pizza_ITEM_Pedido AS
SELECT p.nome, i.quantidade, i.valor
FROM pizzas p INNER JOIN item_pedido i
ON p.id_pizza = i.id_pizza;

