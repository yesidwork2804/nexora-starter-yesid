package com.nexora.api.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public class ProductRequestDto {

    @NotBlank(message = "sku es requerido")
    @Size(max = 50, message = "sku excede el tamaño permitido")
    private String sku;

    @NotBlank(message = "name es requerido")
    @Size(max = 200, message = "name excede el tamaño permitido")
    private String name;

    @Size(max = 1000, message = "description excede el tamaño permitido")
    private String description;

    @NotNull(message = "price es requerido")
    @DecimalMin(value = "0.01", message = "price debe ser mayor a cero")
    private BigDecimal price;

    @Positive(message = "stock debe ser mayor a cero")
    private Integer stock;

    @Size(max = 200, message = "category excede el tamaño permitido")
    private String category;

    @Pattern(
            regexp = "ACTIVE|INACTIVE|DISCONTINUED",
            message = "status debe ser uno de: ACTIVE, INACTIVE, DISCONTINUED"
    )
    private String status;

    public ProductRequestDto() {
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
