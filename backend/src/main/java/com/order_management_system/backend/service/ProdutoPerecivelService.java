package com.order_management_system.backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 

import com.order_management_system.backend.model.ProdutoPerecivel;
import com.order_management_system.backend.repository.ProdutoPerecivelRepository;

@Service 
public class ProdutoPerecivelService {

    @Autowired
    private ProdutoPerecivelRepository repository;

    public List<ProdutoPerecivel> listarTodos() {
        return repository.findAll();
    }

    public Optional<ProdutoPerecivel> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }

    public List<ProdutoPerecivel> listarPorIntervalo(LocalDate inicio, LocalDate fim) {
        return repository.findByDataValidadeBetween(inicio, fim);
    }

    public ProdutoPerecivel salvar(ProdutoPerecivel produto) {
        if (produto.getData_validade().isBefore(LocalDate.now())) {
            throw new RuntimeException("Não é possível cadastrar um produto já vencido!");
        }
        return repository.save(produto);
    }
}