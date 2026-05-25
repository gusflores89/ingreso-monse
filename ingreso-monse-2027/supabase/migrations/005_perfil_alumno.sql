ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS edad INTEGER;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS grado TEXT;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS fecha_nacimiento DATE;

UPDATE usuarios
SET edad = 10,
    grado = '5to',
    fecha_nacimiento = '2016-08-11',
    rasgos_especiales = COALESCE(rasgos_especiales, '{}'::jsonb) || '{"dislexia": true}'::jsonb
WHERE codigo_acceso = 'ABRIL';
