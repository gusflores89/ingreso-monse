export default function handler(req, res) {
  res.json({ metodo: req.method, ok: true });
}
