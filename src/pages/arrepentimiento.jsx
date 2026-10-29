import { useState } from "react";
import PaginaLegal from "@/components/PaginaLegal";

export default function ArrepentimientoPage() {
  const [form, setForm] = useState({
    nombre_adulto: "",
    email: "",
    fecha_compra: "",
    pago_id: "",
    mensaje: "",
  });
  const [estado, setEstado] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const actualizar = (campo) => (event) => {
    setForm((prev) => ({ ...prev, [campo]: event.target.value }));
  };

  const enviar = async (event) => {
    event.preventDefault();
    setEnviando(true);
    setError("");
    setEstado("");
    try {
      const res = await fetch("/api/arrepentimiento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo enviar la solicitud.");
      setEstado("Recibimos la solicitud. La persona responsable tiene que responder por el mismo medio.");
      setForm({ nombre_adulto: "", email: "", fecha_compra: "", pago_id: "", mensaje: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <PaginaLegal
      title="Botón de Arrepentimiento"
      description="Revocá la compra de Ingreso Monse dentro de los 10 días, según la Resolución 424/2020."
      path="/arrepentimiento"
    >
      <p>
        Conforme a la Ley 24.240 y la Resolución 424/2020 de la Secretaría de Comercio Interior, la persona consumidora
        puede revocar la aceptación de esta contratación hecha a distancia dentro de los diez (10) días corridos
        desde la contratación o el acceso al servicio, lo que ocurra después.
      </p>
      <p>
        El botón es para la persona adulta que pagó el Acceso Completo. No hace falta explicar un motivo ni pagar un cargo extra
        por usarlo. Este borrador no reemplaza el criterio de un abogado sobre plazos, reembolsos y excepciones.
      </p>
      <form className="legal-form" onSubmit={enviar}>
        <label>
          Nombre de la persona adulta que contrató
          <input value={form.nombre_adulto} onChange={actualizar("nombre_adulto")} required maxLength={80} />
        </label>
        <label>
          Email de contacto
          <input type="email" value={form.email} onChange={actualizar("email")} required maxLength={120} />
        </label>
        <label>
          Fecha aproximada de la compra
          <input type="date" value={form.fecha_compra} onChange={actualizar("fecha_compra")} />
        </label>
        <label>
          Número de pago de Mercado Pago, si lo tenés
          <input value={form.pago_id} onChange={actualizar("pago_id")} maxLength={40} />
        </label>
        <label>
          Mensaje
          <textarea value={form.mensaje} onChange={actualizar("mensaje")} maxLength={2000} rows={4} />
        </label>
        <button type="submit" className="primary" disabled={enviando}>
          {enviando ? "Enviando..." : "Botón de Arrepentimiento"}
        </button>
      </form>
      {estado && <p role="status">{estado}</p>}
      {error && <p role="alert">{error}</p>}
    </PaginaLegal>
  );
}
