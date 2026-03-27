package com.order_management_system.backend.controller;

import com.order_management_system.backend.model.Pedido;
import com.order_management_system.backend.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    
    @PostMapping
    public ResponseEntity<Pedido> criarPedido(@RequestBody Pedido pedido) {
        if (pedido.getItensPedido() != null) {
            pedido.getItensPedido().forEach(item -> item.setPedido(pedido));
        }
        Pedido novo = pedidoService.salvar(pedido);
        return ResponseEntity.ok(novo);
    }

    
    @GetMapping
    public List<Pedido> listarTodos() {
        return pedidoService.listarTodos();
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscarPorId(@PathVariable Integer id) {
        return pedidoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}