package com.order_management_system.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "produto_eletronico")

@PrimaryKeyJoinColumn(name = "produto_id") 
public class ProdutoEletronico extends Produto {

    private String voltagem;

    public ProdutoEletronico() {}

    public String getVoltagem() { return voltagem; }
    public void setVoltagem(String voltagem) { this.voltagem = voltagem; }
}