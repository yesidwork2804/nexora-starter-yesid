package com.nexora.api.controller;

import com.nexora.api.model.Product;
import com.nexora.api.service.ProductService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

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
    public List<Product> getAllProducts() {
        // Retorna la entidad JPA directamente, sin DTO
        // Sin paginacion: carga toda la tabla en memoria
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        // .get() sin manejo de Optional: lanza NoSuchElementException con 500
        // Deberia retornar 404 cuando no existe
        return productService.getProductById(id);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        // Sin @Valid: acepta cualquier body sin validar
        // Validaciones manuales hardcodeadas dentro del controller
        return productService.createProduct(product);
    }

    @PutMapping("/{id}/status")
    public Product updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        // .get() sin manejo de Optional
        // Sin validacion del status recibido
        return productService.updateStatus(id, body);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        // Sin verificar si existe antes de eliminar
        // Sin respuesta estructurada (retorna 200 con body vacio, deberia ser 204)
        productService.deleteProduct(id);
    }
}
