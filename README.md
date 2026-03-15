# Nexora Migration — README técnico

Repositorio con los módulos de la prueba técnica (frontend + backend + funciones). Este README parte de la base de lo entregado en la **prueba técnica** en la rama `main` y documenta las **mejoras aplicadas después** sobre los módulos.

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
- Se implementó **validación estricta del payload CloudEvents** (campos requeridos y tipos) en `syncInventory`.
- Se extrajo la validación a un archivo propio (`validators/inventorySyncValidator.js`) para código limpio y reutilizable.
- Se mejoraron **mensajes de error** para que sean claros.
- Se ampliaron **pruebas unitarias Jest** para cubrir múltiples casos inválidos y validar nuevos errores.

### 🅜 Módulo 3A — `nexora-api`
- Se agregaron validaciones con `@Valid` en los requests (DTOs) para rechazar payloads inválidos desde el controller.
- Se dejó un test mínimo de controller para validar el rechazo de un body inválido al crear un producto.

### 🅜 Módulo 3B — `nexora-inventory-ui`
- Se robusteció el hook `useProducts` para validar que la respuesta sea JSON antes de parsearla.
- Se mejoraron los mensajes de error: distingue entre red, HTTP y respuesta no JSON, con textos guiados.
- Se agregó validación temprana de `VITE_API_URL` con mensaje claro si no está configurado.

---

## 🌿 Nota sobre la rama `dev`

La rama `dev` se usa para mostrar la versión integrada con las mejoras realizadas a partir de la prueba.
