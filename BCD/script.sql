DROP DATABASE IF EXISTS Pizzaria;
CREATE DATABASE Pizzaria charset=UTF8 collate utf8_general_ci;
USE Pizzaria;

-- =====================
-- Tabela Funcionarios
-- =====================
CREATE TABLE Funcionarios(
    id_funcionario INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(30) NOT NULL
);

CREATE INDEX idx_nome_funcionario ON Funcionarios(nome);



-- =====================
-- Tabela Clientes
-- =====================
CREATE TABLE Clientes (
    id_cliente INTEGER PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    nome VARCHAR(25) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    logradouro VARCHAR(30),
    numero INTEGER,
    complemento VARCHAR(30),
    bairro VARCHAR(30),
    cidade VARCHAR(30),
    estado VARCHAR(30),
    cep VARCHAR(40),
    referencia VARCHAR(30),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    preferencia_entrega VARCHAR(30)
);

CREATE INDEX idx_nome_cliente ON Clientes(nome);


-- =====================
-- Tabela Pizzas
-- =====================
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


-- =====================
-- Tabela Pedidos
-- =====================
CREATE TABLE Pedidos(
    pedido_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    valor DECIMAL(10,2) NOT NULL,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status ENUM('Em Preparo', 'Pronto', 'Finalizado', 'Cancelado') DEFAULT 'Em Preparo' NOT NULL,
    data_conclusao DATETIME,
    forma_pagamento VARCHAR(50) NOT NULL,
    observacoes TEXT,
    nomeCliente VARCHAR(40),
    cliente_id INTEGER,

    FOREIGN KEY (cliente_id) REFERENCES Clientes(id_cliente) ON DELETE CASCADE
);

-- =====================
-- Tabela item_pedido
-- =====================
CREATE TABLE item_pedido(
    pedido_id INTEGER NOT NULL,
    id_pizza INTEGER NOT NULL,
    quantidade INTEGER,
    modo_entrega ENUM('Entrega', 'Retirada') NOT NULL,

    FOREIGN KEY (pedido_id) REFERENCES Pedidos(pedido_id) ON DELETE CASCADE,
    FOREIGN KEY (id_pizza) REFERENCES Pizzas(id_pizza)
);

-- =====================
-- Histórico de Status
-- =====================
CREATE TABLE historico_status_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status_anterior VARCHAR(50),
    status_novo VARCHAR(50),
    data_alteracao DATETIME DEFAULT CURRENT_TIMESTAMP,
    pedido_id INT,
    FOREIGN KEY (pedido_id) REFERENCES Pedidos(pedido_id) ON DELETE CASCADE
);

-- =====================
-- Tabela Imagens
-- =====================
CREATE TABLE Imagens(
    id_imagem INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    caminho VARCHAR(500),
    data_postada DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_pizza INTEGER,
    FOREIGN KEY (id_pizza) REFERENCES Pizzas(id_pizza) ON DELETE CASCADE
);

-- =====================
-- Gatilho: Atualizar data_conclusao quando status virar "Finalizado"
-- =====================
DELIMITER //
CREATE TRIGGER atualiza_data_conclusao
BEFORE UPDATE ON Pedidos
FOR EACH ROW
BEGIN
    IF NEW.status = 'Finalizado' AND OLD.status <> 'Finalizado' AND NEW.data_conclusao IS NULL THEN
        SET NEW.data_conclusao = NOW();
    END IF;
END;
//
DELIMITER ;


-- =====================
-- Views
-- =====================

-- 1. View: Total de itens por pedido
DROP VIEW IF EXISTS vw_pizza_ITEM_Pedido;
CREATE VIEW vw_pizza_ITEM_Pedido AS
SELECT p.nome AS nome_pizza, SUM(i.quantidade) AS total_quantidade, SUM(i.quantidade * p.valor) AS Valor_Total, i.pedido_id, i.modo_entrega
FROM Pizzas p INNER JOIN item_pedido i ON p.id_pizza = i.id_pizza
GROUP BY p.nome, i.pedido_id, i.modo_entrega;

-- 2. View: Pedido + Cliente
DROP VIEW IF EXISTS vw_pedido_cliente;
CREATE VIEW vw_pedido_cliente AS
SELECT p.pedido_id, p.status, p.data_pedido, p.data_conclusao, c.nome AS cliente_nome, c.telefone
FROM Pedidos p INNER JOIN Clientes c ON p.cliente_id = c.id_cliente;

-- 3. View: Histórico de status por pedido
DROP VIEW IF EXISTS vw_historico_status;
CREATE VIEW vw_historico_status AS
SELECT h.pedido_id, h.status_anterior, h.status_novo, h.data_alteracao
FROM historico_status_pedido h;

-- 4. View: Listagem rápida de pizzas
DROP VIEW IF EXISTS vw_listagem_pizzas;
CREATE VIEW vw_listagem_pizzas AS
SELECT id_pizza, nome, descricao, valor
FROM Pizzas;

-- 5. View: Pedidos em Aberto
DROP VIEW IF EXISTS vw_pedidos_em_preparo;
CREATE VIEW vw_pedidos_em_preparo AS
SELECT pedido_id, status, data_pedido, cliente_id
FROM Pedidos
WHERE status != 'Finalizado';

