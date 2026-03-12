package com.nexora.api.service;

import com.nexora.api.model.Product;
import com.nexora.api.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).get();
    }

    @Override
    public Product createProduct(Product product) {
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new RuntimeException("El campo name es requerido");
        }
        if (product.getPrice() == null || product.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("El precio debe ser mayor a cero");
        }
        if (product.getSku() == null || product.getSku().trim().isEmpty()) {
            throw new RuntimeException("El campo sku es requerido");
        }

        if (productRepository.findBySku(product.getSku()).isPresent()) {
            throw new RuntimeException("El SKU ya existe");
        }

        List<String> validStatuses = Arrays.asList("ACTIVE", "INACTIVE", "DISCONTINUED");
        if (product.getStatus() == null || !validStatuses.contains(product.getStatus())) {
            product.setStatus("ACTIVE");
        }

        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());

        return productRepository.save(product);
    }

    @Override
    public Product updateStatus(Long id, Map<String, String> body) {
        Product product = productRepository.findById(id).get();
        product.setStatus(body.get("status"));
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
