package com.nexora.api.controller;

import com.nexora.api.dto.ProductRequestDto;
import com.nexora.api.dto.ProductResponseDto;
import com.nexora.api.dto.UpdateProductStatusRequestDto;
import com.nexora.api.model.Product;
import com.nexora.api.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

// Sin @ControllerAdvice para manejo global de errores
// Accede directamente al Repository (sin capa de Service)
// Retorna la entidad JPA directamente (sin DTO)
// Sin paginacion
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductResponseDto> getAllProducts() {
        // Retorna la entidad JPA directamente, sin DTO
        // Sin paginacion: carga toda la tabla en memoria
        List<Product> products = productService.getAllProducts();
        List<ProductResponseDto> response = new ArrayList<>();
        for (Product product : products) {
            response.add(toResponseDto(product));
        }
        return response;
    }

    @GetMapping("/{id}")
    public ProductResponseDto getProductById(@PathVariable Long id) {
        // .get() sin manejo de Optional: lanza NoSuchElementException con 500
        // Deberia retornar 404 cuando no existe
        return toResponseDto(productService.getProductById(id));
    }

    @PostMapping
    public ProductResponseDto createProduct(@RequestBody ProductRequestDto product) {
        // Sin @Valid: acepta cualquier body sin validar
        // Validaciones manuales hardcodeadas dentro del controller
        return toResponseDto(productService.createProduct(toEntity(product)));
    }

    @PutMapping("/{id}/status")
    public ProductResponseDto updateStatus(@PathVariable Long id, @RequestBody UpdateProductStatusRequestDto body) {
        // .get() sin manejo de Optional
        // Sin validacion del status recibido
        return toResponseDto(productService.updateStatus(id, body.getStatus()));
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        // Sin verificar si existe antes de eliminar
        // Sin respuesta estructurada (retorna 200 con body vacio, deberia ser 204)
        productService.deleteProduct(id);
    }

    private static ProductResponseDto toResponseDto(Product product) {
        ProductResponseDto dto = new ProductResponseDto();
        dto.setId(product.getId());
        dto.setSku(product.getSku());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setCategory(product.getCategory());
        dto.setStatus(product.getStatus());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());
        return dto;
    }

    private static Product toEntity(ProductRequestDto dto) {
        Product product = new Product();
        product.setSku(dto.getSku());
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setCategory(dto.getCategory());
        product.setStatus(dto.getStatus());
        return product;
    }
}
