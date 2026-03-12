package com.nexora.api.service;

import com.nexora.api.model.Product;

import java.util.List;
import java.util.Map;

public interface ProductService {
    List<Product> getAllProducts();

    Product getProductById(Long id);

    Product createProduct(Product product);

    Product updateStatus(Long id, Map<String, String> body);

    void deleteProduct(Long id);
}
