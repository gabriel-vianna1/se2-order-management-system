package com.order_management_system.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "produto_perecivel")
@PrimaryKeyJoinColumn(name = "produto_id")
public class ProdutoPerecivel extends Produto {

    private LocalDate data_validade;

    public ProdutoPerecivel() {}

    public LocalDate getData_validade() { return data_validade; }
    public void setData_validade(LocalDate data_validade) { this.data_validade = data_validade; }
}