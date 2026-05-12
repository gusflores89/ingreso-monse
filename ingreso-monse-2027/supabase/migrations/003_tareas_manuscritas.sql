CREATE TABLE IF NOT EXISTS tareas_manuscritas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  tema TEXT NOT NULL,
  tipo_tarea TEXT NOT NULL,
  instruccion TEXT NOT NULL,
  contenido JSONB,
  tiempo_estimado INTEGER,
  estado TEXT DEFAULT 'pendiente',
  fecha_asignada TIMESTAMP DEFAULT NOW(),
  fecha_completada TIMESTAMP,
  fecha_revisada TIMESTAMP,
  resultado TEXT,
  cantidad_errores INTEGER,
  comentario_revisor TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tareas_user_estado ON tareas_manuscritas(user_id, estado);

ALTER TABLE tareas_manuscritas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "tareas service role full access" ON tareas_manuscritas;

CREATE POLICY "tareas service role full access" ON tareas_manuscritas
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
