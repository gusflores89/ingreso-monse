ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS codigo_acceso TEXT UNIQUE;

UPDATE usuarios
SET codigo_acceso = 'ABRIL'
WHERE id = 'f8dbb32d-2498-4fd3-839a-9387b79f01a2';
