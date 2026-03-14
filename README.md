# Nexora Migration — README técnico

Repositorio con los módulos de la prueba técnica (frontend + backend + funciones). Este README está escrito como guía de ejecución y como bitácora de decisiones.

---

## 🚀 Sección 1 — Cómo ejecutar el proyecto

### ✅ Prerrequisitos (versiones)

- **Node.js**: probado con **v22.12.0**
- **npm**: probado con **10.9.0**
- **Java**: **17**

### 🧩 Módulos incluidos

| Módulo | Proyecto | Stack | Puerto |
|---|---|---|---|
| Admin UI | `nexora-admin-ui` | Angular 14 + TypeScript | 4200 |
| API | `nexora-api` | Spring Boot 3 + Java 17 | 8080 |
| Inventory UI | `nexora-inventory-ui` | React + Vite + TypeScript | 5173 |
| Functions | `nexora-functions` | Node.js | — |

### ▶️ Comandos para correr cada módulo

#### `nexora-admin-ui`
```bash
cd nexora-admin-ui
npm install
ng serve
```

#### `nexora-api`
```bash
cd nexora-api
./mvnw spring-boot:run
```

#### `nexora-inventory-ui`
```bash
cd nexora-inventory-ui
npm install
npm run dev
```

#### `nexora-functions`
```bash
cd nexora-functions
npm install
npm test
```

---

## 🌟 Mejoras y actualizaciones por módulo

### 🅜 Módulo 1 — `nexora-admin-ui`
- Se organizó el código con arquitectura de cebolla (dominio / infraestructura / UI) para facilitar la inyección de dependencias.
- Se agregaron casos de uso que centralizan la lógica y desacoplan la UI del HTTP.
- Se crearon pruebas unitarias para usecases y gateway HTTP.
- Se registraron providers en `AppModule` para resolver contratos por implementación HTTP.

### 🅜 Módulo 2 — `nexora-functions`
- Se migró `syncInventory` a CloudEvents (2da generación) con `@google-cloud/functions-framework`.
- Se reemplazaron credenciales hardcodeadas por variables de entorno.
- Se aplicó logging JSON estructurado para mejor observabilidad.
- Se separaron responsabilidades: una función por archivo.
- Se ajustaron tests Jest para validar el handler CloudEvents.

### 🅜 Módulo 3A — `nexora-api`
- Se separaron capas creando `Service` y moviendo la lógica fuera del controller.
- Se usó inyección por constructor para dependencias explícitas y mejor testabilidad.
- Se agregaron DTOs para que el frontend no dependa directamente del modelo de base de datos.
- Se movió configuración sensible a variables de entorno (`application.properties` con placeholders).
- Se convirtió `status` a Enum para integridad de dominio.
- Se implementó `@RestControllerAdvice` + 2 unit tests con JUnit 5 + Mockito.

### 🅜 Módulo 3B — `nexora-inventory-ui`
- Se eliminó `any` tipando la respuesta con `Product`.
- Se movió la URL base a `VITE_API_URL`.
- Se extrajo la lógica de carga de productos a un hook `useProducts`.
- Se mejoraron estados con indicador de éxito y botón de reintento.

---

## 🗺️ Mapeo al proyecto Nexora (máx. 10 líneas)

Lo trabajado se mapea a una migración real incremental:
1) Aislar lógica por capas (controller/service/repository),
2) estabilizar contratos (DTOs + tipado fuerte en front),
3) mover configuración a variables de entorno para que cada ambiente (local/dev/prod) use sus valores sin cambiar código,
4) endurecer dominio (enums/validaciones),
5) mejorar la trazabilidad/diagnóstico cuando algo falla (logging estructurado y manejo de errores más claro).
En una migración real esperaría desafíos extra como datos viejos inconsistentes (duplicados/campos faltantes) y evitar romper pantallas existentes mientras se migra por partes.

---

## 🌿 Nota sobre la rama `dev`

La rama `dev` se usa para mostrar la versión integrada con las mejoras realizadas a partir de la prueba.
