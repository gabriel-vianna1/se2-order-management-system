package com.order_management_system.backend.controller;

import com.order_management_system.backend.model.ProdutoEletronico;
import com.order_management_system.backend.service.ProdutoEletronicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos/eletronicos")
public class ProdutoEletronicoController {

    @Autowired
    private ProdutoEletronicoService service;

    // GET: /api/produtos/eletronicos
    @GetMapping
    public List<ProdutoEletronico> listar() {
        return service.listarTodos();
    }

    // GET: /api/produtos/eletronicos/5
    @GetMapping("/{id}")
    public ResponseEntity<ProdutoEletronico> buscar(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET Especial: /api/produtos/eletronicos/filtro?voltagem=220v
    @GetMapping("/filtro")
    public List<ProdutoEletronico> buscarPorVoltagem(@RequestParam String voltagem) {
        return service.buscarPorVoltagem(voltagem);
    }

    // POST
    @PostMapping
    public ProdutoEletronico criar(@RequestBody ProdutoEletronico eletronico) {
        return service.salvar(eletronico);
    }


    @PutMapping("/{id}")
public ResponseEntity<ProdutoEletronico> atualizar(@PathVariable Integer id, @RequestBody ProdutoEletronico dadosNovos) {
    return service.buscarPorId(id).map(produtoExistente -> {
        
        produtoExistente.setNome(dadosNovos.getNome());
        produtoExistente.setPreco(dadosNovos.getPreco());
        
        
        produtoExistente.setVoltagem(dadosNovos.getVoltagem());
        
        
        ProdutoEletronico atualizado = service.salvar(produtoExistente);
        return ResponseEntity.ok(atualizado);
    }).orElse(ResponseEntity.notFound().build());
}
    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}