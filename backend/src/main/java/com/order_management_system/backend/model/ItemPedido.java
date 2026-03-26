package com.order_management_system.backend.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GeneratedValue;

@Entity
@Table(name = "item_pedido")
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo")
    private Integer codigo;

    private Integer quantidade;

    @Column(name = "valor_item") 
    private BigDecimal valorItem;

    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false) 
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false) 
    private Produto produto;

    public ItemPedido() {
    }

    // Getters e Setters
    public Integer getCodigo() { return codigo; }

    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }

    public BigDecimal getValorItem() { return valorItem; }
    public void setValorItem(BigDecimal valorItem) { this.valorItem = valorItem; }

    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }

    public Produto getProduto() { return produto; }
    public void setProduto(Produto produto) { this.produto = produto; }

}
