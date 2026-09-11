ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'trial';
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS trial_started_at TIMESTAMP DEFAULT NOW();
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS trial_expires_at TIMESTAMP;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'trial';

UPDATE usuarios
SET plan = 'full',
    subscription_status = 'manual_full'
WHERE codigo_acceso = 'ABRIL';
