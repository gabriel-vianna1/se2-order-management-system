package com.order_management_system.backend.service;

import com.order_management_system.backend.model.Produto;
import com.order_management_system.backend.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    public List<Produto> listarTodos() {
        return repository.findAll();
    }

    public Optional<Produto> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public Produto salvar(Produto produto) {
        // Regras gerais de produto (ex: preço nunca pode ser zero)
        if (produto.getPreco().compareTo(BigDecimal.ZERO) <= 0) {
    throw new RuntimeException("Preço inválido para o produto!");
}
        return repository.save(produto);
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}