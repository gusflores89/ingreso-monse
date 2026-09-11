ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT 'buho';
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS nombre_tutor TEXT DEFAULT 'Búho';
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS color_tema TEXT DEFAULT '#D85A30';

UPDATE usuarios
SET avatar = 'buho',
    nombre_tutor = 'Búho',
    color_tema = '#D85A30'
WHERE codigo_acceso = 'ABRIL';
