package com.nexora.api.service;

import com.nexora.api.model.Product;
import com.nexora.api.model.ProductStatus;
import com.nexora.api.repository.ProductRepository;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceImplTest {

    @Test
    void createProduct_shouldDefaultStatusToActive_whenStatusIsNull() {
        ProductRepository productRepository = mock(ProductRepository.class);
        ProductServiceImpl service = new ProductServiceImpl(productRepository);

        Product product = new Product();
        product.setSku("NXR-100");
        product.setName("Test Product");
        product.setPrice(new BigDecimal("10.00"));
        product.setStatus(null);

        when(productRepository.findBySku("NXR-100")).thenReturn(Optional.empty());
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Product created = service.createProduct(product);

        assertEquals(ProductStatus.ACTIVE, created.getStatus());
        assertNotNull(created.getCreatedAt());
        assertNotNull(created.getUpdatedAt());
        verify(productRepository).save(created);
    }

    @Test
    void createProduct_shouldThrow_whenSkuAlreadyExists() {
        ProductRepository productRepository = mock(ProductRepository.class);
        ProductServiceImpl service = new ProductServiceImpl(productRepository);

        Product product = new Product();
        product.setSku("NXR-101");
        product.setName("Test Product");
        product.setPrice(new BigDecimal("10.00"));

        when(productRepository.findBySku("NXR-101")).thenReturn(Optional.of(new Product()));

        RuntimeException ex = assertThrows(RuntimeException.class, () -> service.createProduct(product));
        assertEquals("El SKU ya existe", ex.getMessage());
        verify(productRepository, never()).save(any());
    }
}
