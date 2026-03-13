# Nexora Migration — README técnico

Repositorio con los módulos de la prueba técnica (frontend + backend + funciones). Este README está escrito como guía de ejecución y como bitácora de decisiones.

---

## Sección 1 — Cómo ejecutar el proyecto

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

## Sección 2 — Decisiones técnicas

En cada módulo respondo estas 4 preguntas:
1) Decisiones y por qué.
2) Trade-offs por tiempo.
3) Qué haría diferente con más tiempo.
4) Incertidumbre.

### 🅜 Módulo 1

- **[Decisiones]**
  - Se corrigieron errores de compilación agregando `@types/node` **v16** para solucionar problemas de compatibilidad.
  - Se crearon los módulos definidos en el `app-routing`.
  - Para la tarea 1.3 se asumió la existencia de la ruta de reportes detrás de Kong.
  - Los errores del test fallan porque el spec todavía prueba el “wrapper” viejo (`status`, `data`, `pagination`).
  - Escogí los 2 test para las funciones (`updateStock`, `deactivateProduct`) por temas de complejidad, si son mas complejos tienden a romperse mas, los demás pueden tener una funcionalidad parecida al que ya traía de la función getProducts.

- **[Trade-offs]**
  - No se cubrieron todos los casos de tests por tiempo; se escogieron los de mayor impacto.

- **[Con más tiempo]**
  - Completar cobertura de tests y revisar consistencia del contrato en todos los endpoints.

- **[Incertidumbre]**
  - No tengo visibilidad completa de cómo está configurado Kong en el entorno real (rutas, headers, transforms). En el starter asumí esa parte para poder avanzar sin bloquear el módulo.

### 🅜 Módulo 2 — `nexora-functions`

- **[Decisiones]**
  - Migré `syncInventory` a **CloudEvents (2da generación)** con `@google-cloud/functions-framework`.
  - Reemplacé credenciales hardcodeadas por `process.env`.
  - Apliqué logging JSON estructurado para observabilidad en los `console.log`.
  - Separé responsabilidades: **una función por archivo**.
  - Ajusté tests Jest para validar el handler CloudEvents.

- **[Trade-offs]**
  - Mantener validaciones mínimas y comportamiento existente para no ampliar el alcance.

- **[Con más tiempo]**
  - Dejar validación de payload más estricta (por ejemplo, validar campos requeridos y tipos) y mejorar los mensajes de error para que sean más claros.

- **[Incertidumbre]**
  - Al inicio no tenía tan claro el concepto de “1ra generación vs 2da generación” en Cloud Functions (más como terminología). Ya con el ejercicio entendí que el cambio principal es cómo se firma/recibe el evento (HTTP vs evento tipo CloudEvents), no la lógica de negocio como tal.

### 🅜 Módulo 3A — `nexora-api`

- **[Decisiones]**
  - Separé capas creando `Service` y moviendo la lógica fuera del controller.
  - Usé **inyección por constructor** para dependencias explícitas y mejor testabilidad.
  - Agregué **DTOs** para que el frontend no dependa directamente del modelo de base de datos (así puedo cambiar el modelo interno sin romper el contrato).
  - Moví configuración sensible a **variables de entorno** (`application.properties` con placeholders).
  - Convertí `status` a **Enum** para integridad de dominio.
  - Implementé `@RestControllerAdvice` + 2 unit tests con JUnit 5 + Mockito.

- **[Trade-offs]**
  - Para no abrir demasiado el alcance, preferí hacer el mapeo DTO↔Entidad y mover solo lo necesario. Con más tiempo, lo automatizaría o lo centralizaría mejor.

- **[Con más tiempo]**
  - Validaciones con `@Valid` + errores más semánticos (409, 422), y más tests (service + controller).

### 🅜 Módulo 3B — `nexora-inventory-ui`

- **[Decisiones]**
  - Eliminé `any` tipando la respuesta con `Product`.
  - Moví la URL base a `VITE_API_URL`.
  - Saqué la lógica de cargar productos del componente y la moví a un hook `useProducts`, para que `App.tsx` se enfoque en mostrar la información.
  - Mejoré estados con indicador de éxito y botón de reintento.

- **[Trade-offs]**
  - Para ir rápido, asumí que la API siempre responde con la forma correcta y la tipé con TypeScript. Si el backend cambia o responde algo distinto, el problema se ve cuando lo ejecutas.

- **[Con más tiempo]**
  - Haría el hook más “a prueba de fallos”: validar que la respuesta sea JSON antes de parsearla y dejar mensajes de error más guiados. Si hubiera tiempo extra, añadiría pruebas automatizadas para el hook.
---

## Sección 3 — Mapeo al proyecto Nexora (máx. 10 líneas)

Lo trabajado se mapea a una migración real incremental:
1) Aislar lógica por capas (controller/service/repository),
2) estabilizar contratos (DTOs + tipado fuerte en front),
3) mover configuración a variables de entorno para que cada ambiente (local/dev/prod) use sus valores sin cambiar código,
4) endurecer dominio (enums/validaciones),
5) mejorar la trazabilidad/diagnóstico cuando algo falla (logging estructurado y manejo de errores más claro).
En una migración real esperaría desafíos extra como datos viejos inconsistentes (duplicados/campos faltantes) y evitar romper pantallas existentes mientras se migra por partes.

---

## Sección 4 — Bloqueos y comunicación

- **[Bloqueo: front recibe HTML en vez de JSON]**
  - **Qué fue:** al cargar productos apareció `Unexpected token '<'...`. Eso pasa cuando el front intenta leer JSON, pero en realidad el servidor devolvió una página HTML.
  - **Qué intenté:**
    - Confirmar que el backend estaba corriendo y que `http://localhost:8080/api/products` devolvía JSON.
    - Revisar `VITE_API_URL` y crear `nexora-inventory-ui/.env` usando `.env.example`.
    - Reiniciar el server de Vite para que tome las variables de entorno.
  - **Cómo lo comunicaría:** “Esto casi siempre significa que estamos apuntando a la URL equivocada o que el backend no está levantado. Propongo dejar documentado el `.env` y validar el tipo de respuesta para mostrar un mensaje más claro.”

---

## Nota sobre ramas y commits

Seguí la estructura de ramas y el formato de commits que pide la prueba técnica:

**Estructura de ramas**
- `feature/module1-angular-migration`
- `feature/module2-node-cloud-functions`
- `feature/module3a-spring-boot`
- `feature/module3b-react`

**Commits atómicos**
- Un commit por tarea/subtarea (no un solo commit con todo).
- Mensajes descriptivos con formato `feat:`, `fix:`, `refactor:`, `test:`, `docs:`.

**Cómo revisar cada módulo**
- Cada rama `feature/module*` contiene **solamente los cambios de ese módulo**.
- Para ver lo que hice en un módulo, cambia a esa rama:
  ```bash
  git checkout feature/module1-angular-migration
  git log --oneline
  git diff main
  ```
- El README técnico (este documento) está en la rama `main`, como se pidió en la prueba.
- Los cambios adicionales (mejoras fuera del alcance base de la prueba) están en la rama `dev`. Si hay mejoras nuevas en `dev`, se documentan en el README de `dev`.

**Nota sobre la rama `dev`**
- La rama `dev` está actualizada con **todos los cambios de las 4 ramas** (módulos 1, 2, 3A y 3B). Si prefieres ver todo integrado en un solo lugar, revisa `dev`.

- `feature/post-prueba-mejoras`
- Intención: mejoras adicionales (buenas prácticas/limpieza) una vez cumplidos los entregables base.
- Mantuve commits pequeños y scope por proyecto (por ejemplo, `refactor(nexora-api): ...`, `refactor(nexora-inventory-ui): ...`).
