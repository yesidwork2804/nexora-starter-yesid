# 🧭 Nexora Migration — README técnico

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

**Tests**
```bash
cd nexora-admin-ui
ng test
```

#### `nexora-api`
```bash
cd nexora-api
./mvnw spring-boot:run
```

**Tests**
```bash
cd nexora-api
./mvnw test
```

#### `nexora-inventory-ui`
```bash
cd nexora-inventory-ui
npm install
npm run dev
```

**Variables de entorno**

- Crear `nexora-inventory-ui/.env` tomando como base `.env.example`.

#### `nexora-functions`
```bash
cd nexora-functions
npm install
npm test
```

---

## 🧠 Sección 2 — Decisiones técnicas

En cada módulo respondo estas 4 preguntas:
1) Decisiones y por qué.
2) Trade-offs por tiempo.
3) Qué haría diferente con más tiempo.
4) Incertidumbre.

### 🅜 Módulo 1 — `nexora-admin-ui`

- **[Decisiones]**
  - Se corrigieron errores de compilación agregando `@types/node` **v16** para solucionar problemas de compatibilidad.
  - Se crearon los módulos definidos en el `app-routing`.
  - Para la tarea 1.3 se asumió la existencia de la ruta de reportes detrás de Kong.
  - Los errores del test fallan porque el spec todavía prueba el “wrapper” viejo (`status`, `data`, `pagination`).
  - Se escogieron 2 tests para las funciones (`updateStock`, `deactivateProduct`) por temas de complejidad: si son más complejos tienden a romperse más; los demás pueden tener una funcionalidad parecida a la que ya traía la función `getProducts`.
  - **Refactorización de Arquitectura**: Se eliminó la carpeta `features` y adoptó arquitectura limpia con `ui` (componentes) y `core` (application + infrastructure).
  - **UI Layer**: Componentes en `src/app/ui/` separados por dominio (products, customers, orders, inventory).
  - **Core Layer**: 
    - `core/application/`: Módulos Angular y routing por dominio
    - `core/infrastructure/services/`: Servicios HTTP con CRUD operations
  - **Tests Unitarios**: Se crearon archivos `.spec.ts` para todos los servicios.

- **[Trade-offs]**
  - No se cubrieron todos los casos de tests por tiempo; se escogieron los de mayor impacto.
  - Se mantuvo la arquitectura simple para no sobre-complicar la refactorización.

- **[Con más tiempo]**
  - Completar cobertura de tests y revisar consistencia del contrato en todos los endpoints.
  - Agregar más validaciones y componentes de UI reutilizables.
  - Implementar guards para mejorar manejo de rutas.

- **[Incertidumbre]**
  - No tengo visibilidad completa de cómo está configurado Kong en el entorno real (rutas, headers, transforms). En el starter asumí esa parte para poder avanzar sin bloquear el módulo.

### 🅜 Módulo 2 — `nexora-functions`

- **[Decisiones]**
  - Se migró `syncInventory` a **CloudEvents (2da generación)** con `@google-cloud/functions-framework`.
  - Se reemplazaron credenciales hardcodeadas por `process.env`.
  - Se aplicó logging JSON estructurado para observabilidad.
  - Se separaron responsabilidades: **una función por archivo**.
  - Se ajustaron tests Jest para validar el handler CloudEvents.

- **[Trade-offs]**
  - Mantener validaciones mínimas y comportamiento existente para no ampliar el alcance.

- **[Con más tiempo]**
  - Dejar validación de payload más estricta (por ejemplo, validar campos requeridos y tipos) y mejorar los mensajes de error para que sean más claros.

- **[Incertidumbre]**
  - Al inicio no tenía claro el concepto de “1ra generación vs 2da generación” en Cloud Functions (más como terminología). Ya con el ejercicio entendí que el cambio principal es cómo se firma/recibe el evento (HTTP vs evento tipo CloudEvents), no la lógica de negocio como tal.

### 🅜 Módulo 3A — `nexora-api`

- **[Decisiones]**
  - Se separaron capas creando `Service` y moviendo la lógica fuera del controller.
  - Se usó **inyección por constructor** para dependencias explícitas y mejor testabilidad.
  - Se agregaron **DTOs** para que el frontend no dependa directamente del modelo de base de datos.
  - Se movió configuración sensible a **variables de entorno** (`application.properties` con placeholders).
  - Se convirtió `status` a **Enum** para integridad de dominio.
  - Se implementó `@RestControllerAdvice` + 2 unit tests con JUnit 5 + Mockito.

- **[Trade-offs]**
  - Para no abrir demasiado el alcance, preferí hacer el mapeo DTO↔Entidad y mover solo lo necesario. Con más tiempo, lo automatizaría o lo centralizaría mejor.

- **[Con más tiempo]**
  - Validaciones con `@Valid` + errores más semánticos (409, 422), y más tests (service + controller).

### 🅜 Módulo 3B — `nexora-inventory-ui`

- **[Decisiones]**
  - Se eliminó `any` tipando la respuesta con `Product`.
  - Se movió la URL base a `VITE_API_URL`.
  - Se sacó la lógica de cargar productos del componente y se movió a un hook `useProducts`, para que `App.tsx` se enfoque en mostrar la información.
  - Se mejoraron estados con indicador de éxito y botón de reintento.

- **[Trade-offs]**
  - Para avanzar rápido, se asumió que la API responde con la forma correcta y se tipó con TypeScript. Si el backend cambia o responde algo distinto, el problema se ve al ejecutarlo.

- **[Con más tiempo]**
  - Haría el hook más “a prueba de fallos”: validar que la respuesta sea JSON antes de parsearla y dejar mensajes de error más guiados.
---

## 🗺️ Sección 3 — Mapeo al proyecto Nexora (máx. 10 líneas)

Lo trabajado se mapea a una migración real incremental:
1) Aislar lógica por capas (controller/service/repository),
2) estabilizar contratos (DTOs + tipado fuerte en front),
3) mover configuración a variables de entorno para que cada ambiente (local/dev/prod) use sus valores sin cambiar código,
4) endurecer dominio (enums/validaciones),
5) mejorar la trazabilidad/diagnóstico cuando algo falla (logging estructurado y manejo de errores más claro).
En una migración real esperaría desafíos extra como datos viejos inconsistentes (duplicados/campos faltantes) y evitar romper pantallas existentes mientras se migra por partes.

---

## 🚧 Sección 4 — Bloqueos y comunicación

- **[Bloqueo: ejecución de tests de API en Windows]**
  - **Qué fue:** al intentar ejecutar pruebas de `nexora-api` no se encontraba `mvn` en el entorno local.
  - **Impacto:** no se podían correr `mvn test`/`mvnw` desde PowerShell sin instalar/configurar Maven.
  - **Cómo se abordó:** se recomendó instalar Maven (o ejecutar desde un entorno que ya lo incluya) y validar con `mvn -v` antes de correr los tests.
  - **Cómo se comunicaría:** “En Windows, la ejecución de tests depende de tener Maven disponible en el PATH. Se deja la verificación `mvn -v` como precondición para evitar bloqueos.”

---

## 🌿 Nota sobre ramas y commits

Seguí la estructura de ramas y el formato de commits que pide la prueba técnica:

**Estructura de ramas**
- `feature/module1-angular-migration`
- `feature/module2-node-cloud-functions`
- `feature/module3a-spring-boot`
- `feature/module3b-react`

**Cómo revisar cada módulo**
- Cada rama `feature/module*` contiene **solamente los cambios de ese módulo**.
- Para ver lo que se realizó en un módulo, cambia a esa rama:
  ```bash
  git checkout feature/module1-angular-migration
  git log --oneline
  git diff main
  ```
- Los cambios adicionales (mejoras fuera del alcance base de la prueba) están en la rama `dev`. Si hay mejoras nuevas en `dev`, se documentan en el README de `dev`.

**Nota sobre la rama `dev`**
- La rama `dev` está actualizada con **todos los cambios de las 4 ramas** (módulos 1, 2, 3A y 3B). Si prefieres ver todo integrado en un solo lugar, revisa `dev`.

- `feature/post-prueba-mejoras`
- Intención: mejoras adicionales (buenas prácticas/limpieza) una vez cumplidos los entregables base.
- Se mantuvo commits pequeños y scope por proyecto (por ejemplo, `refactor(nexora-api): ...`, `refactor(nexora-inventory-ui): ...`).
