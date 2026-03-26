USE se2_order_management;

CREATE TABLE pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valor_total DECIMAL(10, 2)
);

CREATE TABLE produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    preco DECIMAL(10, 2),
    estoque INT
);
jh

CREATE TABLE item_pedido (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    quantidade INT,
    valor_item DECIMAL(10, 2),
    produto_id INT NOT NULL,
    pedido_id INT NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedido(id_pedido),
    FOREIGN KEY (produto_id) REFERENCES produto(id_produto)
);


CREATE TABLE produto_eletronico (
    produto_id INT PRIMARY KEY,
    voltagem VARCHAR(20),
    FOREIGN KEY (produto_id) REFERENCES produto(id_produto)
);

CREATE TABLE produto_perecivel (
    produto_id INT PRIMARY KEY,
    data_validade DATE,
    FOREIGN KEY (produto_id) REFERENCES produto(id_produto)
);