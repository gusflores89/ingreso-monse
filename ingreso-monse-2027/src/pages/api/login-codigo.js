import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const codigo = String(req.body?.codigo || "").trim().toUpperCase();

  if (!codigo) {
    return res.status(400).json({ error: "Codigo requerido" });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("id, nombre, codigo_acceso")
      .eq("codigo_acceso", codigo)
      .single();

    if (error || !usuario) {
      return res.status(404).json({ error: "Codigo incorrecto. Pedile ayuda a mama/papa." });
    }

    res.status(200).json({
      userId: usuario.id,
      nombre: usuario.nombre,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
