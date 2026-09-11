create extension if not exists pgcrypto;

create table if not exists usuarios (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text unique,
  fecha_examen date not null,
  nivel_inicial text,
  estilo_aprendizaje text,
  rasgos_especiales jsonb default '{}',
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists sesiones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references usuarios(id) on delete cascade,
  tema text not null,
  capa integer not null,
  tipo_pregunta text,
  pregunta_generada text not null,
  contexto_json jsonb,
  respuesta_usuario text,
  tiempo_segundos integer,
  es_correcta boolean,
  retroalimentacion_ia text,
  razon_evaluacion text,
  proximo_tema_recomendado text,
  proxima_capa_recomendada integer,
  modo text default 'NORMAL',
  ia_parametros_usados jsonb,
  created_at timestamp default now()
);

create table if not exists progreso (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references usuarios(id) on delete cascade,
  tema text not null,
  capa_actual integer default 1,
  capa_maxima integer default 1,
  total_sesiones integer default 0,
  total_correctas integer default 0,
  tasa_acierto numeric(5,2) default 0,
  fecha_ultima_sesion timestamp,
  dias_sin_actividad integer default 0,
  alerta_generada boolean default false,
  unique(user_id, tema),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists alertas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references usuarios(id) on delete cascade,
  tipo text not null,
  mensaje text not null,
  accion_recomendada text,
  generada_por_ia boolean default true,
  resuelta boolean default false,
  created_at timestamp default now(),
  resuelto_en timestamp
);

create table if not exists reportes_semanales (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references usuarios(id) on delete cascade,
  semana_inicio date not null,
  semana_fin date not null,
  markdown_contenido text not null,
  pdf_url text,
  generado_en timestamp default now(),
  enviado_a_papas_en timestamp
);

create table if not exists parametros_sesion (
  id uuid primary key default gen_random_uuid(),
  sesion_id uuid references sesiones(id) on delete cascade,
  capa integer,
  modo text,
  estilo_aprendizaje text,
  errores_patrones jsonb,
  fortalezas jsonb,
  racha_actual integer,
  dias_sin_tema integer,
  tasa_acierto_ultimo numeric(5,2),
  tiempo_disponible_sesion integer,
  created_at timestamp default now()
);

create table if not exists lecciones_completadas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references usuarios(id) on delete cascade,
  tema text not null,
  leccion_numero integer not null,
  completada boolean default false,
  fecha_completada timestamp,
  unique(user_id, tema, leccion_numero),
  created_at timestamp default now()
);

create index if not exists idx_sesiones_user_created on sesiones(user_id, created_at desc);
create index if not exists idx_sesiones_user_tema on sesiones(user_id, tema);
create index if not exists idx_progreso_user_tema on progreso(user_id, tema);
create index if not exists idx_alertas_user_open on alertas(user_id, resuelta, created_at desc);
create index if not exists idx_reportes_user_week on reportes_semanales(user_id, semana_inicio desc);
create index if not exists idx_lecciones_user_tema on lecciones_completadas(user_id, tema);

alter table usuarios enable row level security;
alter table sesiones enable row level security;
alter table progreso enable row level security;
alter table alertas enable row level security;
alter table reportes_semanales enable row level security;
alter table parametros_sesion enable row level security;
alter table lecciones_completadas enable row level security;

create policy "usuarios service role full access" on usuarios
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy "sesiones service role full access" on sesiones
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy "progreso service role full access" on progreso
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy "alertas service role full access" on alertas
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy "reportes service role full access" on reportes_semanales
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy "parametros service role full access" on parametros_sesion
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy "lecciones service role full access" on lecciones_completadas
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
