package com.nexora.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class UpdateProductStatusRequestDto {

    @NotBlank(message = "status es requerido")
    @Pattern(
            regexp = "ACTIVE|INACTIVE|DISCONTINUED",
            message = "status debe ser uno de: ACTIVE, INACTIVE, DISCONTINUED"
    )
    private String status;

    public UpdateProductStatusRequestDto() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
