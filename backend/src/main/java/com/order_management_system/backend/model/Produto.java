package com.order_management_system.backend.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@Entity
@Table(name = "produto")

@Inheritance(strategy = InheritanceType.JOINED)
public class Produto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_produto;

     private String nome;

    private BigDecimal preco;

    private Integer estoque;

    public Produto() {
    }

    public Produto(Integer estoque, String nome, BigDecimal preco) {
        this.estoque = estoque;
        this.nome = nome;
        this.preco = preco;
    }


    public Integer getId_produto() {
        return id_produto;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public void setEstoque(Integer estoque) {
        this.estoque = estoque;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public Integer getEstoque() {
        return estoque;
    }
}