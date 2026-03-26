package com.order_management_system.backend.service;

import com.order_management_system.backend.model.ItemPedido;
import com.order_management_system.backend.repository.ItemPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class ItemPedidoService {

    @Autowired
    private ItemPedidoRepository repository;

    public Optional<ItemPedido> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public ItemPedido salvar(ItemPedido item) {
        if (item.getQuantidade() != null && item.getQuantidade() <= 0) {
            throw new RuntimeException("A quantidade do item deve ser pelo menos 1");
        }
        return repository.save(item);
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}