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

create index if not exists idx_lecciones_user_tema on lecciones_completadas(user_id, tema);

alter table lecciones_completadas enable row level security;

drop policy if exists "lecciones service role full access" on lecciones_completadas;

create policy "lecciones service role full access" on lecciones_completadas
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
