# AUDIT.md — Ingreso Monse 2027
**Fecha:** 2026-05-25  
**Estado:** Solo lectura — ningún cambio realizado

---

## 1. ESTRUCTURA DE ARCHIVOS

### Root
```
package.json
jsconfig.json
next.config.mjs
.env.example
.env.local          ← contiene secrets reales
.gitignore
README.md
```

### pages/ (src/pages/)
```
index.jsx           ← pantalla de login (estudiante)
papas.jsx           ← dashboard familiar
setup.jsx           ← wrapper del setup inicial
tutoria.jsx         ← sesión de tutoría
admin-test.jsx      ← panel de testing admin
_app.jsx            ← wrapper global Next.js
```

### pages/api/ (src/pages/api/)
```
test.js
login-codigo.js
setup-inicial.js
progreso.js
sesion/
  init.js
  respuesta.js
  fin.js              ← ⚠️ ver problema #3
admin/
  login.js
  completar-leccion.js
tarea-manuscrita/
  asignar.js
  completar.js
  pendientes.js
  revisar.js
```

### src/components/
```
Monse.jsx
PantallaSetup.jsx
PantallaSessionTutoria.jsx
PantallaCasoResuelto.jsx
DashboardPapas.jsx
VisualizacionMatematica.jsx
```

### src/lib/
```
access.js
curriculum.js
casos-resueltos.js
date.js
ejercicios-manuscritos.js
examenes-monserrat.js
http.js
json.js
openrouter.js
progress.js
prompts.js
supabaseAdmin.js
tareas-manuscritas.js
```

### supabase/migrations/
```
001_abril_quest_schema.sql
002_lecciones_completadas.sql
003_tareas_manuscritas.sql
004_codigo_acceso_usuarios.sql
```

---

## 2. HARDCODEOS

### "Abril" (nombre de la estudiante)

| Archivo | Línea | Contenido |
|---|---|---|
| src/lib/prompts.js | 6 | `tutora a Abril (11 anos) para el examen de ingreso Monserrat.` |
| src/lib/prompts.js | 63 | `tutora MUY paciente de Abril (11 anos, dislexia leve, se distrae facil).` |
| src/lib/prompts.js | 109 | `"saludo": "Hola Abril! Hoy vamos a aprender {tema}..."` |
| src/lib/prompts.js | 140 | `"saludo": "Hola Abril! Hoy vamos a aprender fracciones del resto..."` |
| src/lib/prompts.js | 223 | `Eres Monse, tutora de Abril (11 anos).` |
| src/lib/prompts.js | 254 | `decidir que debe hacer Abril DESPUES de cada sesion.` |
| src/lib/prompts.js | 271 | `Si Abril domino el tema, elegir el proximo_tema...` |
| src/lib/prompts.js | 290 | `Eres el generador de insights para papas de Abril.` |
| src/lib/prompts.js | 306 | `- Como va Abril esta semana` |
| src/lib/prompts.js | 317 | `- "Abril confunde X porque..."` |
| src/pages/index.jsx | 70 | `placeholder="Ej: ABRIL"` |
| src/pages/papas.jsx | 22 | `<h1>Abril Quest</h1>` |
| src/pages/api/setup-inicial.js | 13 | `nombre = "Abril",` (default en destructuring) |
| src/pages/api/sesion/respuesta.js | 124 | `IMPORTANTE: Abril esta respondiendo el ejercicio final...` |
| src/pages/api/sesion/init.js | 119 | `"Ensena este tema a Abril por primera vez..."` |
| src/lib/ejercicios-manuscritos.js | 72 | `inicio: "Abril encontro una llave misteriosa en el patio de su escuela..."` |
| src/components/DashboardPapas.jsx | 86 | `data?.usuario?.nombre \|\| "Abril"` |

### "dislexia"

| Archivo | Línea | Contenido |
|---|---|---|
| src/lib/prompts.js | 63 | `Abril (11 anos, dislexia leve, se distrae facil)` |
| src/components/PantallaSetup.jsx | 12 | `dislexia: false,` (default del form state) |
| src/components/PantallaSetup.jsx | 36 | `rasgos_especiales: { dislexia: form.dislexia }` |
| src/components/PantallaSetup.jsx | 151 | `<input type="checkbox" ... />` |
| src/components/PantallaSetup.jsx | 152 | `Rasgo a contemplar: dislexia` |

### Edad hardcodeada (11 años — nota: la consigna decía "9 años", la app dice 11)

| Archivo | Línea | Contenido |
|---|---|---|
| src/lib/prompts.js | 6 | `Abril (11 anos)` |
| src/lib/prompts.js | 63 | `Abril (11 anos, dislexia leve...)` |
| src/lib/prompts.js | 223 | `Abril (11 anos)` |
| src/pages/api/sesion/init.js | 422 | `estudiante de 11 anos` |

### UUID hardcodeado (mismo ID en 3 lugares)

| Archivo | Línea | Contenido |
|---|---|---|
| src/pages/admin-test.jsx | 4 | `const DEFAULT_TEST_USER_ID = "f8dbb32d-2498-4fd3-839a-9387b79f01a2"` |
| supabase/migrations/004_codigo_acceso_usuarios.sql | 4–5 | `WHERE id = 'f8dbb32d-2498-4fd3-839a-9387b79f01a2'` |
| README.md | 10 | URL con `user_id=f8dbb32d-2498-4fd3-839a-9387b79f01a2` |

### Código de acceso hardcodeado en migración SQL

| Archivo | Línea | Contenido |
|---|---|---|
| supabase/migrations/004_codigo_acceso_usuarios.sql | 4 | `SET codigo_acceso = 'ABRIL'` |

### API keys y secrets en .env.local

> **Nota:** .env.local es local y no debería llegar a git si .gitignore está bien. Los valores aquí son solo para documentar qué existe.

| Variable | Descripción |
|---|---|
| `OPENROUTER_API_KEY` | Clave real `sk-or-v1-...` |
| `MONSE_LOGIN_PASSWORD` | `Monse2027!` |
| `MONSE_SETUP_PASSWORD` | `PadresMonse2027!` |
| `MONSE_ADMIN_PASSWORD` | `AdminMonse2027!` |
| `MONSE_AUTH_SECRET` | `monse-local-auth-secret-2027` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | JWT de Supabase |
| `SUPABASE_SERVICE_KEY` | JWT de Supabase (service role) |

### URL de localhost hardcodeada

| Archivo | Línea | Contenido |
|---|---|---|
| src/lib/openrouter.js | 15 | `"HTTP-Referer": process.env.OPENROUTER_SITE_URL \|\| "http://localhost:3000"` |

---

## 3. PROMPTS — CONTENIDO COMPLETO

**Archivo:** `src/lib/prompts.js`

### SYSTEM_PROMPT_MONSE (líneas 5–60)
Prompt para evaluación de respuestas en modo práctica normal.

```
Eres Monse, un buho sabio y amable que tutora a Abril (11 anos) para el examen de ingreso Monserrat.

CONTEXTO ACTUAL:
- Tema: {tema}
- Capa de dificultad: {capa} (1=infantil con imagenes, 2=basico, 3=estandar, 4=avanzado, 5=experto)
- Modo: {modo} (NORMAL=progresion lenta, INTENSIVO=acelerado)
- Estilo de aprendizaje: {estilo_aprendizaje}
- Tasa de acierto en este tema: {tasa_acierto}%
- Errores frecuentes: {errores_patrones_json}
- Racha: {racha} dias seguidos

INSTRUCCIONES:

1. SI ABRIL AUN NO HA RESPONDIDO (primera llamada):
   Generar una pregunta sobre {tema} apropiada para capa {capa}.
   - Si capa <= 2: incluir indicaciones de imagenes/diagramas a mostrar
   - Si capa >= 4: hacer preguntas con contexto real, problemas verbales
   - Usar lenguaje simple, emojis ocasionalmente
   - Maximo 150 palabras

   Response JSON:
   {
     "pregunta": "texto de la pregunta",
     "tipo": "multiple|verdadero_falso|completar|produccion",
     "opciones": ["A", "B", "C", "D"],
     "indicaciones_visuales": "mostrar un grafico de...",
     "tiempo_estimado": 3
   }

2. SI ABRIL YA RESPONDIO (segunda llamada):
   Evaluar su respuesta. NO comparar con respuesta "correcta" hardcodeada.
   En su lugar:
   - Analizar la LOGICA de su razonamiento
   - Si es correcta: validar el proceso
   - Si es incorrecta: preguntar por que penso eso ANTES de corregir

   Response JSON:
   {
     "es_correcta": true|false,
     "retroalimentacion": "explicacion amable de por que",
     "razon_error": "si es falsa, explicar el error conceptual",
     "siguiente_pregunta": "pista para intentar de nuevo O siguiente pregunta"
   }

TONO:
- Amable, celebra esfuerzo
- Usa emoji de buho ocasionalmente
- Nunca condescendiente
- Maximo 200 palabras por respuesta

EVITAR:
- Sarcasmo
- Respuestas larguisimas
- Comparaciones con otros
```

---

### SYSTEM_PROMPT_TEACHER (líneas 62–220)
Prompt para primera exposición a un tema (modo lección).

```
Eres Monse, tutora MUY paciente de Abril (11 anos, dislexia leve, se distrae facil).

MODO: ENSENANZA (primera vez que ve este tema)

CONTEXTO:
- Tema: {tema}
- Capa: {capa}
- Estilo: visual, concreto, con MUCHOS ejemplos

REGLAS CRITICAS PARA ABRIL:

1. BOMBARDEAR CON EJEMPLOS
   - Minimo 4-5 ejemplos (no 2)
   - Todos con objetos concretos (caramelos, lapices, galletas, juguetes)
   - Empezar MUY facil, subir gradualmente
   - NUNCA asumir que entiende

2. REPETIR EL CONCEPTO CLAVE cada 2-3 oraciones
   - "Viste? Esto es el RESTO"
   - "Recorda: el RESTO es lo que QUEDA"
   - "Importante: calculamos sobre el RESTO, no el total"

3. LENGUAJE ULTRA-SIMPLE
   - Oraciones cortas (max 12 palabras)
   - Sin palabras tecnicas (fraccion -> "pedazo", "parte")
   - Hablar como hablaria una amiga de 12 anos

4. VISUAL Y CONCRETO
   - Usar emojis para mantener atencion
   - Cada ejemplo con objetos diferentes
   - NUNCA conceptos abstractos

5. PASO A PASO MICROSCOPICO
   - Cada paso en una linea separada
   - Numerar: "Paso 1:", "Paso 2:"
   - Explicar POR QUE hacemos cada cosa

6. ENGAGEMENT CONSTANTE
   - Preguntas retoricas: "Te das cuenta?"
   - Celebraciones: "Exacto!" "Eso es!"
   - Conectar con su vida: "Como cuando..."

ESTRUCTURA DE RESPUESTA:
{
  "tipo": "leccion",
  "saludo": "Hola Abril! Hoy vamos a aprender {tema}. Es re facil, vas a ver!",
  "explicacion_simple": "1-2 oraciones MUY simples del concepto",
  "concepto_clave_repetir": "LA FRASE QUE VAS A REPETIR 5 VECES",
  "ejemplos_resueltos": [
    {
      "numero": 1,
      "contexto": "objeto concreto",
      "enunciado": "enunciado ultra simple",
      "pasos": ["Paso 1: ...", "Paso 2: ...", "Viste? [CONCEPTO CLAVE]"],
      "respuesta": "...",
      "refuerzo": "Eso es! [CONCEPTO CLAVE otra vez]"
    }
  ],
  "ejercicio_practica": {
    "enunciado": "Super facil, casi identico al ultimo ejemplo",
    "pista": "Recorda: [CONCEPTO CLAVE]",
    "tipo": "completar"
  },
  "cierre_motivacional": "..."
}

NUNCA hagas una leccion con menos de 4 ejemplos.
SIEMPRE repeti el concepto clave al menos 5 veces.
```

---

### SYSTEM_PROMPT_PRACTICE (líneas 222–251)
Prompt para ejercitación una vez completada la lección.

```
Eres Monse, tutora de Abril (11 anos).

MODO: PRACTICA (Abril ya vio la leccion de este tema)

CONTEXTO:
- Tema: {tema}
- Capa: {capa}
- Tasa de acierto: {tasa_acierto}%
- Sesiones completadas: {sesiones_en_tema}

TU TRABAJO:

1. GENERAR ejercicio del tema
   - Dificultad segun capa y tasa de acierto
   - Si tasa < 60%: mas facil
   - Si tasa > 80%: mas desafiante

2. NO explicar de nuevo (ya vio la leccion)
   - Solo dar el ejercicio
   - Si se equivoca 2+ veces, DAR PISTA

RESPONDE SOLO EN JSON:
{
  "tipo": "practica",
  "pregunta": "...",
  "tipo_pregunta": "multiple|completar|produccion",
  "opciones": []
}
```

---

### SYSTEM_PROMPT_ANALYZER (líneas 253–287)
Decide qué hace la estudiante después de cada sesión.

```
Eres el analizador de progreso. Tu trabajo es decidir que debe hacer Abril DESPUES de cada sesion.

ENTRADA (JSON):
{
  "tema_actual": "string",
  "materia_actual": "matematica|lengua",
  "capa_actual": number,
  "tasa_acierto": number (0-100),
  "sesiones_en_tema": number,
  "modo": "NORMAL|INTENSIVO",
  "dias_falta_examen": number,
  "errores_patrones": object,
  "ultimas_3_respuestas": array
}

ANALIZA Y DECIDE:

1. Si Abril domino el tema, elegir el proximo_tema siguiendo el orden del curriculum recibido.
2. Mantener la misma materia salvo que el input indique alternar o que el tema actual sea el ultimo de esa materia.
3. Subir de capa si tasa_acierto >= 80 AND sesiones_en_tema >= 3.
4. Volver atras si tasa_acierto < 40 despues de 5+ sesiones.
5. Activar MODO INTENSIVO si dias_falta < 30 AND (progreso_promedio < 60% OR multiples_temas < 50%).
6. Generar ALERTA de inactividad, ritmo_lento o tema_debil cuando aplique.

RESPUESTA (JSON):
{
  "proximo_tema": "string",
  "proxima_capa": number,
  "modo_recomendado": "NORMAL|INTENSIVO",
  "razon": "explicacion breve de por que",
  "alerta": null | {"tipo": "string", "mensaje": "string", "accion": "string"},
  "tiempo_estimado_siguiente": 25
}
```

---

### SYSTEM_PROMPT_DASHBOARD_IA (líneas 289–332)
Genera el reporte semanal para los papás en Markdown.

```
Eres el generador de insights para papas de Abril.

ENTRADA (JSON de ultima semana):
{
  "semana": "03-07 mayo",
  "sesiones_completadas": number,
  "temas_trabajados": array,
  "tasa_promedio": number,
  "distribucion_errores": object,
  "racha_maxima": number,
  "alertas_generadas": array
}

GENERA Markdown con:

1. RESUMEN EJECUTIVO (1 parrafo)
   - Como va Abril esta semana
   - 1 fortaleza destacada
   - 1 area a mejorar urgente

2. POR MATERIA (Matematica y Lengua)
   - Tasa de acierto
   - Tema mas fuerte / mas debil
   - Patron de error especifico

3. ANALISIS PROFUNDO
   - "Abril confunde X porque..."
   - "Esta progresando bien en..."
   - Recomendacion concreta para papas

4. PROYECCION
   - "Al ritmo actual, llegara con 85% cubierto"
   - "Recomendamos intensificar en..."

5. DATOS CRUDOS (tabla Markdown simple)
   - Lista de temas trabajados / sesiones / alertas

Tono: profesional pero calido. Dirigido a papas.
Maximo 1500 palabras.
```

### hydratePrompt (líneas 334–340)
```javascript
export function hydratePrompt(template, values) {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = values[key];
    if (value === null || value === undefined) return "";
    return typeof value === "string" ? value : JSON.stringify(value);
  });
}
```

---

## 4. BASE DE DATOS

### Tabla: `usuarios`
| Columna | Tipo | Restricciones |
|---|---|---|
| id | uuid | PK, default gen_random_uuid() |
| nombre | text | NOT NULL |
| email | text | UNIQUE |
| fecha_examen | date | NOT NULL |
| nivel_inicial | text | — |
| estilo_aprendizaje | text | — |
| rasgos_especiales | jsonb | default '{}' |
| codigo_acceso | text | UNIQUE (agregado en migración 004) |
| created_at | timestamp | default now() |
| updated_at | timestamp | default now() |

### Tabla: `sesiones`
| Columna | Tipo | Restricciones |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → usuarios(id) ON DELETE CASCADE |
| tema | text | NOT NULL |
| capa | integer | NOT NULL |
| tipo_pregunta | text | — |
| pregunta_generada | text | NOT NULL |
| contexto_json | jsonb | — |
| respuesta_usuario | text | — |
| tiempo_segundos | integer | — |
| es_correcta | boolean | — |
| retroalimentacion_ia | text | — |
| razon_evaluacion | text | — |
| proximo_tema_recomendado | text | — |
| proxima_capa_recomendada | integer | — |
| modo | text | default 'NORMAL' |
| ia_parametros_usados | jsonb | — |
| created_at | timestamp | default now() |

### Tabla: `progreso`
| Columna | Tipo | Restricciones |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → usuarios(id) ON DELETE CASCADE |
| tema | text | NOT NULL |
| capa_actual | integer | default 1 |
| capa_maxima | integer | default 1 |
| total_sesiones | integer | default 0 |
| total_correctas | integer | default 0 |
| tasa_acierto | numeric(5,2) | default 0 |
| fecha_ultima_sesion | timestamp | — |
| dias_sin_actividad | integer | default 0 |
| alerta_generada | boolean | default false |
| created_at | timestamp | default now() |
| updated_at | timestamp | default now() |
| UNIQUE | — | (user_id, tema) |

### Tabla: `alertas`
| Columna | Tipo | Restricciones |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → usuarios(id) ON DELETE CASCADE |
| tipo | text | NOT NULL |
| mensaje | text | NOT NULL |
| accion_recomendada | text | — |
| generada_por_ia | boolean | default true |
| resuelta | boolean | default false |
| created_at | timestamp | default now() |
| resuelto_en | timestamp | — |

### Tabla: `reportes_semanales`
| Columna | Tipo | Restricciones |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → usuarios(id) ON DELETE CASCADE |
| semana_inicio | date | NOT NULL |
| semana_fin | date | NOT NULL |
| markdown_contenido | text | NOT NULL |
| pdf_url | text | — |
| generado_en | timestamp | default now() |
| enviado_a_papas_en | timestamp | — |

### Tabla: `parametros_sesion`
| Columna | Tipo | Restricciones |
|---|---|---|
| id | uuid | PK |
| sesion_id | uuid | FK → sesiones(id) ON DELETE CASCADE |
| capa | integer | — |
| modo | text | — |
| estilo_aprendizaje | text | — |
| errores_patrones | jsonb | — |
| fortalezas | jsonb | — |
| racha_actual | integer | — |
| dias_sin_tema | integer | — |
| tasa_acierto_ultimo | numeric(5,2) | — |
| tiempo_disponible_sesion | integer | — |
| created_at | timestamp | default now() |

### Tabla: `lecciones_completadas` (migración 002)
| Columna | Tipo | Restricciones |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → usuarios(id) ON DELETE CASCADE |
| tema | text | NOT NULL |
| leccion_numero | integer | NOT NULL |
| completada | boolean | default false |
| fecha_completada | timestamp | — |
| created_at | timestamp | default now() |
| UNIQUE | — | (user_id, tema, leccion_numero) |

### Tabla: `tareas_manuscritas` (migración 003)
| Columna | Tipo | Restricciones |
|---|---|---|
| id | UUID | PK |
| user_id | UUID | FK → usuarios(id) ON DELETE CASCADE |
| tema | TEXT | NOT NULL |
| tipo_tarea | TEXT | NOT NULL |
| instruccion | TEXT | NOT NULL |
| contenido | JSONB | — |
| tiempo_estimado | INTEGER | — |
| estado | TEXT | default 'pendiente' |
| fecha_asignada | TIMESTAMP | default NOW() |
| fecha_completada | TIMESTAMP | — |
| fecha_revisada | TIMESTAMP | — |
| resultado | TEXT | — |
| cantidad_errores | INTEGER | — |
| comentario_revisor | TEXT | — |
| created_at | TIMESTAMP | default NOW() |

### RLS
Todas las tablas tienen Row Level Security habilitado. Las políticas permiten acceso completo solo a `service_role`.

---

## 5. FLUJO DE LA APP

### Login (estudiante)
```
1. /index.jsx          → form: { codigo, password }
2. POST /api/login-codigo
   - verifica password (familia) contra env MONSE_LOGIN_PASSWORD
   - SELECT * FROM usuarios WHERE codigo_acceso = :codigo
   - setAccessCookie(res, "student")
   - retorna { userId, nombre }
3. redirect → /tutoria?user_id={userId}
```

### Setup inicial (papás)
```
1. /setup.jsx + PantallaSetup.jsx
   - form: { nombre, email, fecha_examen, nivel_inicial,
             estilo_aprendizaje, dislexia, setup_password }
2. POST /api/setup-inicial
   - verifica setup_password contra env MONSE_SETUP_PASSWORD
   - genera codigo_acceso único
   - UPSERT INTO usuarios ON CONFLICT (email)
   - llama OpenRouter con SYSTEM_PROMPT_ANALYZER para plan inicial
   - retorna { usuario, plan, codigo_acceso }
3. frontend muestra el código generado al padre
```

### Sesión de tutoría
```
1. /tutoria.jsx         → query params: user_id, tema?, capa?, modo?
2. POST /api/sesion/init { user_id, tema, capa, modo, tiempo_disponible_sesion }
   - GET usuarios WHERE id = user_id
   - GET/calcula progreso del tema
   - Decide tipo de sesión:
       ├── leccion_completada = false → SYSTEM_PROMPT_TEACHER
       ├── caso_resuelto disponible   → devuelve caso estático
       ├── examen_final (≥3 prácticas y ≥80% acierto) → genera examen
       ├── tarea_manuscrita (≥2 prácticas) → asigna tarea
       └── práctica normal            → SYSTEM_PROMPT_PRACTICE
   - INSERT INTO sesiones
   - INSERT INTO parametros_sesion
   - retorna { sesion_id, pregunta, tipo, opciones, ... }
3. Estudiante responde
4. POST /api/sesion/respuesta { sesion_id, respuesta_usuario, tiempo_segundos }
   - Si examen_final → evaluarExamenFinal() (determinístico, sin LLM)
   - Si práctica/lección → OpenRouter con SYSTEM_PROMPT_MONSE
   - UPDATE sesiones SET respuesta_usuario, es_correcta, retroalimentacion_ia, ...
   - Si lección correcta → UPSERT lecciones_completadas
   - refreshTopicProgress() → UPDATE progreso
   - Decide siguiente paso (próximo tema, capa, modo)
   - retorna { es_correcta, retroalimentacion, siguiente_accion, decision, progreso }
```

### Dashboard de papás
```
1. /papas.jsx           → query param: user_id
2. GET /api/progreso?user_id={id}
   - SELECT FROM usuarios
   - SELECT FROM progreso (todos los temas)
   - SELECT FROM alertas WHERE resuelta = false
   - SELECT FROM sesiones ORDER BY created_at DESC LIMIT 80
   - Calcula métricas: balance materia, oportunidades, fortalezas
   - Llama OpenRouter con SYSTEM_PROMPT_DASHBOARD_IA
   - retorna { usuario, progreso, alertas, sesiones_recientes,
               metricas, insight_markdown }
```

### Admin / testing
```
1. /admin-test.jsx
2. POST /api/admin/login            → setAccessCookie("admin")
3. POST /api/admin/completar-leccion { user_id, tema }
   → UPSERT lecciones_completadas (activa modo práctica)
```

---

## 6. DEPENDENCIAS (package.json)

```json
{
  "name": "ingreso-monse-2027",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.99.0",
    "next": "16.1.6",
    "openai": "^6.37.0",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "eslint": "^9.39.1",
    "eslint-config-next": "16.1.6"
  }
}
```

**Nota:** El paquete `openai` se usa para conectar a OpenRouter (compatible con la API de OpenAI). No se usa la API de OpenAI directamente.

---

## 7. PROBLEMAS ENCONTRADOS

### P1 — CRÍTICO: UUID de usuario de test hardcodeado en código de producción
El UUID `f8dbb32d-2498-4fd3-839a-9387b79f01a2` aparece en:
- `admin-test.jsx:4` como `DEFAULT_TEST_USER_ID`
- `migrations/004_codigo_acceso_usuarios.sql` con acceso hardcodeado `'ABRIL'`
- `README.md` con URL completa al dashboard

La migración SQL corre en producción y hardcodea un usuario específico. Si ese usuario no existe, falla silenciosamente.

### P2 — CRÍTICO: Nombre "Abril" hardcodeado en 17 lugares
Los prompts de IA, los fallbacks del dashboard, los textos de ejercicios manuscritos y los endpoints todos asumen que la estudiante se llama Abril. Si se agrega otra estudiante al sistema, recibe la experiencia de Abril (dislexia leve, 11 años, etc.). El campo `{nombre}` del usuario existe en la DB pero no se inyecta en la mayoría de los prompts.

### P3 — MENOR: `sesion/fin.js` parece ser duplicado de `sesion/respuesta.js`
El archivo `src/pages/api/sesion/fin.js` existe pero su contenido maneja evaluación de respuestas, no finalización de sesión. Posible archivo residual o alias sin uso claro.

### P4 — MENOR: `console.log` en código de producción

| Archivo | Línea | Contenido |
|---|---|---|
| src/lib/examenes-monserrat.js | 392 | `console.log('No hay examen final definido para el tema: ${tema}')` |
| src/pages/api/sesion/respuesta.js | 201 | `console.log('Practicas dominadas. Siguiente paso: examen final...')` |
| src/pages/api/sesion/respuesta.js | 215–217 | `console.log(...)` para detalles de progresión |

### P5 — MENOR: URL localhost hardcodeada en openrouter.js
```js
"HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000"
```
Si la variable de entorno no está configurada en Vercel, el header HTTP-Referer apunta a localhost en producción. No rompe nada pero es incorrecto.

### P6 — DISEÑO: Fecha de examen hardcodeada como default
`fecha_examen` tiene default `"2027-12-01"` en el form (`PantallaSetup.jsx`) y en `setup-inicial.js`. Funciona por ahora pero requiere cambio manual cuando llegue la fecha real.

### P7 — DISEÑO: Race condition potencial en generación de código de acceso
`generarCodigoUnico()` en `setup-inicial.js` verifica disponibilidad del código antes de insertarlo. Si dos setups corren en paralelo para el mismo nombre, ambos pueden pasar el check y luego fallar en el UNIQUE constraint de la DB. El error llega al usuario como 500.

### P8 — DISEÑO: Validación mínima en setup
- Email: no se valida formato antes de insertar en DB
- Nombre: acepta cualquier string sin sanitización
- fecha_examen: no se valida que sea futura

### P9 — DISEÑO: Mensajes de error exponen `error.message`
Todos los endpoints devuelven `{ error: error.message }` en catch. Si Supabase lanza un error SQL con detalles de schema, ese detalle llega al cliente. No es crítico dado que la app es privada, pero es un antipatrón.

### Sin TODOs ni FIXMEs en el código
No se encontraron comentarios `TODO`, `FIXME`, `HACK` ni `XXX` en ningún archivo.

### Sin imports rotos detectados
Todos los imports referenciados existen como archivos. No se encontraron imports a módulos inexistentes.

### Sin código muerto obvio
Todas las funciones exportadas tienen callers identificables. No se detectan funciones definidas y nunca llamadas.

---

## RESUMEN EJECUTIVO

| Categoría | Estado |
|---|---|
| Estructura general | Limpia y bien organizada |
| Hardcodeos críticos | **17+ menciones de "Abril" en prompts y lógica** |
| UUID hardcodeado | **Mismo UUID en migration SQL + admin + README** |
| Secrets en .env.local | OK si .gitignore cubre .env.local |
| Prompts de IA | Completos, bien estructurados, muy específicos para una sola estudiante |
| Schema de DB | Bien normalizado, RLS habilitado |
| Flujo de la app | Coherente de punta a punta |
| Dependencias | Mínimas (4 deps de producción) |
| Código muerto | Ninguno detectado |
| TODOs pendientes | Ninguno |
| console.log en producción | 3 instancias en API routes |
| Validaciones | Mínimas en setup (email, nombre, fecha) |
