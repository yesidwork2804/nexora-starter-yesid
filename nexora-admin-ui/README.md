# Nexora Admin UI (`nexora-admin-ui`)

Aplicación de administración construida con Angular.

Este README parte de la base de lo entregado en la **prueba técnica** y documenta las **mejoras aplicadas después** sobre los módulos.

- Se mantiene lo esencial (cómo ejecutar y probar).
- Se explica qué se mejoró y con qué objetivo.

---

## 🚀 Sección 1 — Cómo ejecutar y probar

### ✅ Prerrequisitos

- Node.js / npm instalados.
- Angular CLI disponible.

### ▶️ Ejecutar en local

```bash
npm install
ng serve
```

Abrir:

- `http://localhost:4200/`

### 🧪 Ejecutar unit tests

```bash
ng test
```

---

## 🌟 Mejoras y actualizaciones

### 🅜 Módulo 1 — Refactor (arquitectura + DI + tests)

- Se reorganizó el módulo con **separación por capas** para reducir acoplamiento y mejorar mantenibilidad:
  - **Dominio**: contratos (gateways), modelos y casos de uso.
  - **Infraestructura**: implementación HTTP de esos contratos.
  - **UI / Features**: componentes consumiendo casos de uso en lugar de depender directamente de HTTP.
- Se implementó **inyección de dependencias por contrato** (tokens) para permitir cambiar implementaciones sin tocar la UI.
- Se incorporaron **usecases** como punto único de entrada a la lógica, evitando duplicación y dejando la UI más delgada.
- Se agregaron **pruebas unitarias** enfocadas en:
  - casos de uso (con gateways mockeados),
  - gateways HTTP (validando endpoints, métodos y payload con `HttpClientTestingModule`).
- Se corrigió un error de runtime típico en Angular:
  - en módulos feature se usa `CommonModule` y no `BrowserModule`.
