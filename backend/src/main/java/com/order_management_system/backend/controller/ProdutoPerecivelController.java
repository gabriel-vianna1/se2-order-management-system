package com.order_management_system.backend.controller;

import com.order_management_system.backend.model.ProdutoPerecivel;
import com.order_management_system.backend.service.ProdutoPerecivelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/produtos/pereciveis")
public class ProdutoPerecivelController {

    @Autowired
    private ProdutoPerecivelService service;

    // LISTAR TODOS
    @GetMapping
    public List<ProdutoPerecivel> listarTodos() {
        return service.listarTodos();
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<ProdutoPerecivel> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    
    // Exemplo: /api/produtos/pereciveis/vencimento?inicio=2026-04-01&fim=2026-04-30
    @GetMapping("/vencimento")
    public List<ProdutoPerecivel> buscarPorVencimento(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        return service.listarPorIntervalo(inicio, fim);
    }

    //  CRIAR (POST)
    @PostMapping
    public ProdutoPerecivel criar(@RequestBody ProdutoPerecivel produto) {
        return service.salvar(produto);
    }

    @PutMapping("/{id}")
public ResponseEntity<ProdutoPerecivel> atualizar(@PathVariable Integer id, @RequestBody ProdutoPerecivel dadosNovos) {
    return service.buscarPorId(id).map(produtoExistente -> {
       
        produtoExistente.setNome(dadosNovos.getNome());
        produtoExistente.setPreco(dadosNovos.getPreco());
        
    
        produtoExistente.setData_validade(dadosNovos.getData_validade());
        
        ProdutoPerecivel atualizado = service.salvar(produtoExistente);
        return ResponseEntity.ok(atualizado);
    }).orElse(ResponseEntity.notFound().build());
}

    //  DELETAR (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}