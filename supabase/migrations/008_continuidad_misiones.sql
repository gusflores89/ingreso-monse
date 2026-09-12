-- Estado de interfaz separado de calificaciones y perfil pedagógico.
create table if not exists public.continuidad_misiones (
  user_id uuid primary key references public.usuarios(id) on delete cascade,
  revision bigint not null default 1 check (revision > 0),
  envio_id uuid not null,
  estado jsonb not null check (jsonb_typeof(estado) = 'object'),
  updated_at timestamptz not null default now()
);
alter table public.continuidad_misiones enable row level security;
revoke all on public.continuidad_misiones from anon, authenticated;
grant select, insert, update, delete on public.continuidad_misiones to service_role;
-- Solo la API con clave de servidor accede a la tabla; comprueba propiedad de cuenta.
notify pgrst, 'reload schema';
