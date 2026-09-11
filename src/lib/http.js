export function requireMethod(req, res, method) {
  if (req.method !== method) {
    res.setHeader("Allow", method);
    res.status(405).json({ error: `Metodo ${req.method} no permitido.` });
    return false;
  }

  return true;
}
