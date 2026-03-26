package com.order_management_system.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pedido")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_pedido;

    @Column(name = "dataPedido")
    private LocalDateTime dataPedido;

    @Column(name = "valorTotal")
    private BigDecimal valorTotal;

    public Pedido() {
    }

    public Integer getId_pedido() {
        return id_pedido;
    }

    public LocalDateTime getDataPedido() {
        return dataPedido;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setDataPedido(LocalDateTime dataPedido) {
        this.dataPedido = dataPedido;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

}
