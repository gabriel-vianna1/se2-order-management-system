package com.order_management_system.backend.controller;

import com.order_management_system.backend.model.ItemPedido;
import com.order_management_system.backend.service.ItemPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/itens-pedido")
public class ItemPedidoController {

    @Autowired
    private ItemPedidoService service;

    // ADICIONAR (POST)
    @PostMapping
    public ItemPedido adicionar(@RequestBody ItemPedido item) {
        return service.salvar(item);
    }

    // ATUALIZAR (PUT) 
    @PutMapping("/{id}")
    public ResponseEntity<ItemPedido> atualizar(@PathVariable Integer id, @RequestBody ItemPedido itemDadosNovos) {
        return service.buscarPorId(id).map(itemExistente -> {
            
            itemExistente.setQuantidade(itemDadosNovos.getQuantidade());
            itemExistente.setValorItem(itemDadosNovos.getValorItem());
          
            
            ItemPedido atualizado = service.salvar(itemExistente);
            return ResponseEntity.ok(atualizado);
        }).orElse(ResponseEntity.notFound().build());
    }

    // REMOVER (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Integer id) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}