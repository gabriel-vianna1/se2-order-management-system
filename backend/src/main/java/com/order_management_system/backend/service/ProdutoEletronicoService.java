package com.order_management_system.backend.service;

import com.order_management_system.backend.model.ProdutoEletronico;
import com.order_management_system.backend.repository.ProdutoEletronicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoEletronicoService {

    @Autowired
    private ProdutoEletronicoRepository repository;

    public List<ProdutoEletronico> listarTodos() {
        return repository.findAll();
    }

    public Optional<ProdutoEletronico> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public ProdutoEletronico salvar(ProdutoEletronico eletronico) {
        return repository.save(eletronico);
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }

   
    public List<ProdutoEletronico> buscarPorVoltagem(String voltagem) {
        return repository.findByVoltagem(voltagem);
    }
}