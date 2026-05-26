import { requireMethod } from "@/lib/http";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { TRIAL_DEFAULT_TOPIC } from "@/lib/planes";
import { hashFamilyPassword } from "@/lib/access";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;

  const {
    nombre,
    email,
    fecha_examen = "2027-12-01",
    nivel_inicial,
    estilo_aprendizaje = "visual_ejemplos",
    rasgos_especiales = {},
    edad,
    grado,
    fecha_nacimiento,
    password_familiar,
  } = req.body || {};

  const validationError = validateSetupInput({ nombre, email, fecha_examen, edad, fecha_nacimiento, estilo_aprendizaje, password_familiar });
  if (validationError) return res.status(400).json({ error: validationError });

  try {
    const supabase = getSupabaseAdmin();
    const codigo_acceso = await generarCodigoUnico(supabase, nombre);
    const perfilNivel = nivel_inicial || nivelInicialDesdeCapa(calcularCapaInicial(Number(edad), grado, rasgos_especiales));

    const usuario = assertSupabaseOk(
      await supabase
        .from("usuarios")
        .upsert(
          {
            nombre: String(nombre).trim(),
            email: email || null,
            fecha_examen,
            nivel_inicial: perfilNivel,
            estilo_aprendizaje,
            rasgos_especiales: {
              ...rasgos_especiales,
              plan: "trial",
              access_password_hash: hashFamilyPassword(password_familiar),
            },
            edad: edad ? Number(edad) : null,
            grado: grado || null,
            fecha_nacimiento: fecha_nacimiento || null,
            codigo_acceso,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "email" }
        )
        .select()
        .single(),
      "No se pudo guardar el perfil"
    );
    const plan = {
      proximo_tema: TRIAL_DEFAULT_TOPIC,
      proxima_capa: calcularCapaInicial(Number(edad), grado, rasgos_especiales),
      modo_recomendado: "NORMAL",
      razon: "Cuenta gratuita creada. Empieza con una muestra guiada del metodo.",
    };

    res.status(200).json({ usuario, plan, cuenta: { plan: "trial", estado: "activa" } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

function validateSetupInput({ nombre, email, fecha_examen, edad, fecha_nacimiento, estilo_aprendizaje, password_familiar }) {
  const cleanNombre = String(nombre || "").trim();
  if (cleanNombre.length < 2 || cleanNombre.length > 50) return "Nombre requerido";

  const cleanPassword = String(password_familiar || "").trim();
  if (cleanPassword.length < 6 || cleanPassword.length > 40) {
    return "La contrasena familiar debe tener entre 6 y 40 caracteres";
  }

  const edadNumber = Number(edad);
  if (!Number.isFinite(edadNumber) || edadNumber < 8 || edadNumber > 12) {
    return "La edad debe estar entre 8 y 12 anos";
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return "Email invalido";
  }

  const exam = new Date(`${fecha_examen}T12:00:00`);
  if (Number.isNaN(exam.getTime()) || exam.getTime() <= Date.now()) {
    return "La fecha de examen debe ser futura";
  }

  if (fecha_nacimiento) {
    const birth = new Date(`${fecha_nacimiento}T12:00:00`);
    if (Number.isNaN(birth.getTime())) return "Fecha de nacimiento invalida";
  }

  if (!["visual_ejemplos", "paso_a_paso", "practica_directa"].includes(estilo_aprendizaje)) {
    return "Preferencia de explicacion invalida";
  }

  return null;
}

function calcularCapaInicial(edad, grado, rasgos) {
  let capa = 1;
  if (edad >= 11 && grado === "6to") capa = 3;
  else if (edad >= 10) capa = 2;
  if (rasgos?.dislexia) capa = Math.max(1, capa - 1);
  return capa;
}

function nivelInicialDesdeCapa(capa) {
  if (capa >= 3) return "bien_preparado";
  if (capa === 2) return "algo_sabe";
  return "recien_empieza";
}

async function generarCodigoUnico(supabase, nombre) {
  for (let intento = 0; intento < 8; intento += 1) {
    const codigo = generarCodigo(nombre);
    const { data } = await supabase.from("usuarios").select("id").eq("codigo_acceso", codigo).maybeSingle();
    if (!data) return codigo;
  }

  return `${generarBaseCodigo(nombre)}${Date.now().toString().slice(-4)}`;
}

function generarCodigo(nombre) {
  const numero = Math.floor(Math.random() * 99) + 1;
  return `${generarBaseCodigo(nombre)}${numero}`;
}

function generarBaseCodigo(nombre) {
  return String(nombre || "ALUMN")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 5)
    .padEnd(5, "X");
}
