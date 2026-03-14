package com.nexora.api.service;

import com.nexora.api.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();

    Product getProductById(Long id);

    Product createProduct(Product product);

    Product updateStatus(Long id, String status);

    void deleteProduct(Long id);
}
