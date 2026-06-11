# Checklist Pre-Lanzamiento — ingreso-monse-2027
Generado: 2026-06-10

---

## 1. Despersonalización ⚠️ (1 fix necesario)

| Resultado | Archivo | Detalle |
|---|---|---|
| ✅ OK | `src/components/PantallaSetup.jsx:185` | `["04", "Abril"]` — falso positivo: es el mes en el dropdown de fecha de nacimiento |
| ❌ FIX | `src/pages/api/test-email.js:17,19` | `from: "Abril Quest <...>"` y `subject: "Test de email - Abril Quest"` — nombre de app viejo |

**Fix:** Cambiar `"Abril Quest"` por el nombre actual de la app en `test-email.js`.

---

## 2. Build ✅

```
Next.js 16.1.6 (Turbopack) — build exitoso sin errores ni warnings.
8/8 páginas generadas correctamente.
```

---

## 3. Prompts ✅

| Check | Estado |
|---|---|
| Usa `buildPrompt*` functions dinámicas (no constantes hardcodeadas) | ✅ |
| `nombre_tutor` viene del usuario (`alumno.nombre_tutor` → fallback `"Buho"`) | ✅ |
| Adaptaciones dislexia/tdah son condicionales en `buildAdaptaciones()` | ✅ |
| Constantes `SYSTEM_PROMPT_*` (deprecated) no se usan en ningún otro archivo | ✅ dead code |

---

## 4. Avatares ✅

| Check | Estado |
|---|---|
| SVGs en `public/avatars/` (atenea, nyx, lux, buho + mini variants) | ✅ 8 archivos |
| PNGs en `public/avatars/` (atenea, nyx, lux, buho) | ✅ 4 archivos |
| Endpoint `src/pages/api/guardar-avatar.js` existe | ✅ |
| Endpoint valida whitelist de avatares válidos | ✅ |
| `index.jsx` tiene selector de avatares con `AVATARES` array y `elegirAvatar` | ✅ |

---

## 5. Seguridad ❌ (varios fixes críticos)

### 5a. API keys hardcodeadas en `src/`
| Check | Estado |
|---|---|
| No hay keys hardcodeadas — todo usa `process.env.*` | ✅ |

### 5b. Validación de acceso por endpoint

| Endpoint | `requireAccess` | Riesgo |
|---|---|---|
| `sesion/init.js` | ✅ student/admin | — |
| `sesion/respuesta.js` | ✅ student/admin | Ver nota abajo |
| `guardar-avatar.js` | ✅ student/admin | — |
| `admin/*.js` | ✅ admin | — |
| `test-email.js` | ✅ admin | — |
| `progreso.js` | ❌ NINGUNO | Cualquiera puede ver progreso de cualquier alumno |
| `sesion/fin.js` | ❌ NINGUNO | Cualquiera puede cerrar sesiones ajenas |
| `sugerir-tema.js` | ❌ NINGUNO | Cualquiera puede alterar el tema sugerido de cualquier alumno |
| `guardar-config-pedagogica.js` | ❌ NINGUNO | Cualquiera puede cambiar la config pedagógica |
| `guardar-ruta-flexible.js` | ❌ NINGUNO | Cualquiera puede cambiar la ruta flexible |

**Fix:** Agregar `if (!requireAccess(req, res, ["student", "admin"])) return;` a los 5 endpoints sin protección.

> **Nota — `sesion/respuesta.js`:** Recibe `sesion_id` del body y obtiene el `user_id` desde la DB, pero no verifica que la sesión pertenezca al usuario autenticado. Un alumno podría responder sesiones de otro si conoce un `sesion_id`. Fix: comparar `sesion.user_id` contra el usuario de la cookie.

### 5c. `SELECT *` sin filtro — table dump

`guardar-config-pedagogica.js:37-41` y `guardar-ruta-flexible.js:37-41` tienen un bloque fallback que hace:

```js
const dbUsersResult = await supabase.from("usuarios").select("*"); // ← dump completo
```

Si las dos búsquedas anteriores fallan, descarga TODA la tabla de usuarios. Con pocos usuarios actuales no rompe, pero es una bomba de tiempo en rendimiento y privacidad.

**Fix:** Eliminar ese bloque fallback — si el UUID y el código de acceso no coinciden, retornar 404.

### 5d. Error 500 con detalles internos

| Archivo | Estado |
|---|---|
| Todos los demás endpoints | ✅ Solo expone `"Error interno del servidor"` |
| `test-email.js:29` | ❌ Expone `err.message` y `err.stack` en la respuesta HTTP |

**Fix:** Cambiar en `test-email.js`:
```js
// Antes:
return res.status(500).json({ ok: false, error: err.message, stack: err.stack... });
// Después:
console.error(err);
return res.status(500).json({ ok: false, error: "Error interno del servidor" });
```

### 5e. Rate limiting en `/api/sesion/init`

| Check | Estado |
|---|---|
| Rate limit implementado (`checkDailyRateLimit`) | ✅ 80 sesiones/24h por usuario |
| Aplicado en `sesion/init` | ✅ |
| Aplicado en `sesion/respuesta` | ✅ |
| Rate limit a nivel IP (para proteger antes del login) | ⚠️ No existe — `/api/login-codigo` no tiene rate limiting. Un bot puede intentar contraseñas ilimitadamente. |

**Fix sugerido:** Agregar rate limiting por IP en `login-codigo.js` (ej: 10 intentos/hora por IP).

---

## 6. Flujo completo ✅ (con advertencias)

`login-codigo` → cookie student → `/tutoria` → `sesion/init` → `sesion/respuesta`

| Punto de falla potencial | Estado |
|---|---|
| `usuario.nombre` null → `buildAlumnoProfile` usa `"el alumno"` | ✅ Fallback ok |
| `usuario.nombre_tutor` null → `getTutorPayload` usa nombre del avatar | ✅ Fallback ok |
| `usuario.avatar` inválido → fuerza `"buho"` | ✅ Whitelist validada |
| `usuario.fecha_examen` null → `daysUntilExam` devuelve 0 (no rompe) | ✅ |
| `usuario.edad` null → `calcularEdadDesdeFecha` intenta inferir, sino null | ✅ |
| Sin sesiones previas → `resolverTemaDeReingreso` cae en `DEFAULT_TOPIC` | ✅ |
| Usuario nuevo sin progreso → `capaActual` se calcula desde edad/grado | ✅ |
| Nombre "Abril" hardcodeado en el flujo crítico | ✅ No existe |

---

## 7. Migraciones pendientes

Archivos en `supabase/migrations/`:

| Archivo | Estado en prod |
|---|---|
| `001_abril_quest_schema.sql` | ❓ Verificar |
| `002_lecciones_completadas.sql` | ❓ Verificar |
| `003_tareas_manuscritas.sql` | ❓ Verificar |
| `004_codigo_acceso_usuarios.sql` | ❓ Verificar |
| `005_perfil_alumno.sql` | ❓ Verificar |
| `006_avatar_preferencias.sql` | ❓ Verificar — necesaria para el sistema de avatares |
| `007_planes_freemium.sql` | ❓ Verificar — necesaria para `getUserPlan()` |

**Nota:** El nombre `001_abril_quest_schema.sql` es cosmético (nombre interno del archivo), no afecta al runtime.

Para verificar estado en Supabase: ir al dashboard → SQL Editor → `SELECT * FROM supabase_migrations.schema_migrations ORDER BY version;`

---

## Resumen de fixes por prioridad

### 🔴 Crítico (bloquear lanzamiento)
1. **5 endpoints sin `requireAccess`** — `progreso`, `sesion/fin`, `sugerir-tema`, `guardar-config-pedagogica`, `guardar-ruta-flexible`
2. **Table dump en `guardar-config-pedagogica.js:37` y `guardar-ruta-flexible.js:37`** — eliminar fallback `SELECT *`

### 🟡 Importante (hacer antes o justo después)
3. **`sesion/respuesta.js`** — validar que `sesion.user_id` coincida con el usuario autenticado
4. **`test-email.js`** — no exponer `err.stack` en respuesta HTTP
5. **Rate limiting en `login-codigo.js`** — proteger contra fuerza bruta

### 🟢 Menor (post-lanzamiento)
6. **`test-email.js`** — cambiar `"Abril Quest"` por el nombre real de la app
7. **Migraciones** — confirmar que las 7 están aplicadas en prod, especialmente `006` y `007`
8. **Constantes `SYSTEM_PROMPT_*` deprecated** — pueden eliminarse (dead code)
