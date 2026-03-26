--Pequeno script para poular inicialmente o banco de dados.

INSERT INTO produto (id_produto, nome, preco, estoque) VALUES 
(1, 'Smartphone Galaxy S23', 4500.00, 15),
(2, 'Notebook Dell Inspiron', 5200.00, 8),
(3, 'Geladeira Frost Free', 3100.00, 3),
(4, 'Leite Integral 1L', 5.50, 100),
(5, 'Peito de Peru Fatiado', 15.90, 20),
(6, 'Queijo Mussarela 500g', 22.00, 40);


INSERT INTO produto_eletronico (produto_id, voltagem) VALUES 
(1, 'Bivolt'),
(2, 'Bivolt'),
(3, '220v');

INSERT INTO produto_perecivel (produto_id, data_validade) VALUES 
(4, '2026-04-10'),
(5, '2026-04-05'),
(6, '2026-05-20');

INSERT INTO pedido (id_pedido, data_pedido, valor_total) VALUES 
(1, '2026-03-26 10:30:00', 4516.50), -- Pedido 1: 4500 (celular) + 16.50 (3 leites)
(2, '2026-03-26 14:15:00', 3122.00); -- Pedido 2: 3100 (geladeira) + 22 (queijo)

INSERT INTO item_pedido (codigo, quantidade, valor_item, produto_id, pedido_id) VALUES 
(1, 1, 4500.00, 1, 1),
(2, 3, 5.50, 4, 1);

INSERT INTO item_pedido (codigo, quantidade, valor_item, produto_id, pedido_id) VALUES 
(3, 1, 3100.00, 3, 2),
(4, 1, 22.00, 6, 2);