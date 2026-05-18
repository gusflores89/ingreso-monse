import { setAccessCookie, verifyAccessPassword } from "@/lib/access";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const password = String(req.body?.password || "");

  if (!verifyAccessPassword("admin", password)) {
    return res.status(401).json({ error: "Contrasena admin incorrecta." });
  }

  setAccessCookie(res, "admin");
  res.status(200).json({ ok: true });
}
