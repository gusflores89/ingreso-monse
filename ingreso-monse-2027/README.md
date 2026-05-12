# Abril Quest

Abril Quest es una plataforma educativa con IA para acompanar a Abril en la preparacion del examen de ingreso al Monserrat del 1 de diciembre de 2027.

La app funciona como una tutora de practica: genera preguntas, corrige respuestas, registra el progreso por tema y muestra un panel familiar para que los papas puedan ver como viene avanzando.

## Accesos Para Priscila

- Practica de Abril: https://ingreso-monse-2027.vercel.app/
- Dashboard familiar: https://ingreso-monse-2027.vercel.app/papas?user_id=f8dbb32d-2498-4fd3-839a-9387b79f01a2

Usuario de produccion:

- Nombre: Abril
- Email: abril.flores.gonzalez16@gmail.com
- Fecha de examen: 2027-12-01
- Nivel inicial: algo_sabe
- Estilo de aprendizaje: visual

## Como Usar El Dashboard

El dashboard familiar es solo de lectura. Sirve para revisar el avance sin modificar sesiones ni respuestas.

Muestra:

- Dias restantes: cuantos dias faltan para el examen.
- Progreso por tema: cada tema trabajado y su tasa de acierto.
- Estado:
  - Bien: Abril viene con buen desempeno en ese tema.
  - En curso: el tema tiene practica suficiente para seguir midiendo.
  - Refuerzo: conviene volver a practicar porque la tasa de acierto esta baja.
- Ultimas sesiones: fecha, tema y si la respuesta fue correcta o incorrecta.
- Alertas: avisos cuando hay temas debiles, baja actividad o algo que requiera atencion.

## Que Significa Cada Metrica

- Tasa de acierto: porcentaje de respuestas correctas sobre el total de sesiones del tema.
- Total de sesiones: cantidad de preguntas o ejercicios registrados.
- Capa actual: nivel de dificultad actual, de 1 a 5.
- Capa maxima: mayor nivel alcanzado en ese tema.
- Alertas abiertas: recomendaciones pendientes para revisar con Abril.

## Si Algo Falla

Contactar a Gustavo con:

- URL donde ocurrio el problema.
- Captura de pantalla si es posible.
- Que accion se intento hacer, por ejemplo "Calcular ruta", "Enviar respuesta" o "Abrir dashboard".

Nota: la generacion de preguntas usa Groq. Si la API key de Groq no esta configurada o falla, el dashboard puede seguir cargando, pero la tutoria con IA puede fallar al pedir una nueva pregunta.

## Stack Tecnico

- Next.js + React
- Supabase
- Groq con modelos Llama

## Desarrollo Local

1. Crear las tablas ejecutando `supabase/migrations/001_abril_quest_schema.sql` en Supabase.
2. Copiar `.env.example` a `.env.local` y completar:
   - `GROQ_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
   - opcional: `NEXT_PUBLIC_DEMO_USER_ID`
3. Instalar dependencias con `npm install`.
4. Correr localmente con `npm run dev`.

## Endpoints

- `POST /api/setup-inicial`
- `POST /api/sesion/init`
- `POST /api/sesion/respuesta`
- `POST /api/sesion/fin`
- `GET /api/progreso?user_id=...`
