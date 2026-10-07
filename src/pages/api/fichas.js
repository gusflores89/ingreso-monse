import { requireAccess, requireOwnership } from '@/lib/access';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { CURRICULUM_MATEMATICA, CURRICULUM_LENGUA } from '@/lib/curriculum';
import { BASE_LECTURA, VERSION_FICHAS, getFichaModulo, fichaPublica, cargarLectura, estadoLectura } from '@/lib/fichas-lectura';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST'); return res.status(405).json({ error: 'Método no permitido.' });
  }
  if (!requireAccess(req, res, ['student', 'admin'])) return;
  const datos = req.method === 'GET' ? req.query : req.body || {};
  const { user_id, tema } = datos;
  if (typeof user_id !== 'string' || !user_id || user_id.length > 100) return res.status(400).json({ error: 'Falta identificar la cuenta.' });
  if (!requireOwnership(req, res, user_id)) return;
  try {
    const db = getSupabaseAdmin();
    if (req.method === 'GET' && !tema) {
      const r = await db.from('lecciones_completadas').select('tema,leccion_numero,completada')
        .eq('user_id', user_id).in('leccion_numero', [0,1,2,3].map(n => BASE_LECTURA + n));
      if (r.error) throw Error('No pudimos cargar la biblioteca.');
      const catalogo = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].map(t => {
        const f = fichaPublica(t.tema);
        return { tema: t.tema, materia: CURRICULUM_MATEMATICA.some(m => m.tema === t.tema) ? 'Matemática' : 'Lengua',
          titulo: f.title, pdf_url: f.pdf_url, ...estadoLectura((r.data || []).filter(s => s.tema === t.tema)) };
      });
      return res.status(200).json({ catalogo });
    }
    if (typeof tema !== 'string' || !getFichaModulo(tema)) return res.status(400).json({ error: 'Tema no disponible.' });
    const lectura = await cargarLectura(db, user_id, tema);
    if (req.method === 'GET') return res.status(200).json({ ficha: fichaPublica(tema), lectura });
    if (datos.version !== VERSION_FICHAS) return res.status(409).json({ error: 'La ficha cambió. Volvé a abrirla para leer la versión actual.' });
    const paso = datos.paso;
    if (!Number.isInteger(paso) || paso < 0 || paso > 3) return res.status(400).json({ error: 'Paso inválido.' });
    if (paso > lectura.paso) return res.status(409).json({ error: 'Primero recorramos el paso anterior.' });
    // Una repetición no borra el avance ni vuelve a corregir una lectura ya terminada.
    if (lectura.completada || paso < lectura.paso) return res.status(200).json({ lectura });
    if (paso === 3) {
      const c = getFichaModulo(tema).comprobacion;
      if (!Number.isInteger(datos.respuesta) || datos.respuesta < 0 || datos.respuesta >= c.opciones.length) return res.status(400).json({ error: 'Elegí una opción para conversar sobre el ejemplo.' });
      if (datos.respuesta !== c.correcta) return res.status(200).json({ lectura, revisar: true,
        pista: c.pista, explicacion: c.explicacion, respuesta_guiada: c.correcta });
    }
    const r = await db.from('lecciones_completadas').upsert({ user_id, tema, leccion_numero: BASE_LECTURA + paso,
      completada: true, fecha_completada: new Date().toISOString() }, { onConflict: 'user_id,tema,leccion_numero' });
    if (r.error) throw Error('No pudimos guardar este paso. Tu lectura sigue abierta; volvé a intentar.');
    return res.status(200).json({ lectura: await cargarLectura(db, user_id, tema) });
  } catch (e) { return res.status(503).json({ error: e.message || 'No pudimos guardar la lectura.' }); }
}
