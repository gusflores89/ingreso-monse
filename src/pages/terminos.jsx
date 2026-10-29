import Link from "next/link";
import PaginaLegal from "@/components/PaginaLegal";

export default function TerminosPage() {
  return (
    <PaginaLegal
      title="Términos y Condiciones"
      description="Condiciones de uso de Ingreso Monse, preparación particular para el ingreso al Colegio Nacional de Monserrat."
      path="/terminos"
    >
      <p>Última actualización del borrador: 29 de octubre de 2026.</p>
      <p>
        Ingreso Monse es un servicio particular de práctica de Matemática y Lengua para el ingreso al Colegio Nacional de Monserrat.
        No está afiliado, asociado, autorizado ni respaldado por el Colegio Nacional de Monserrat ni por la Universidad Nacional de Córdoba.
      </p>
      <h2>Quién contrata</h2>
      <p>
        La cuenta la crea una persona adulta responsable. El estudiante es menor de edad y usa la plataforma con esa autorización.
        La persona adulta es quien contrata, paga y puede pedir la baja o el arrepentimiento.
      </p>
      <h2>Qué incluye</h2>
      <p>
        La muestra gratuita incluye una selección de temas. El Acceso Completo es un pago único que habilita el currículo publicado,
        el panel familiar y simulacros cronometrados de práctica por materia. Esos simulacros usan ejercicios de la plataforma:
        no son el examen oficial ni una copia de las pruebas del colegio.
      </p>
      <h2>Precio</h2>
      <p>
        El precio vigente es el que muestra la pantalla de pago en el momento de la compra, en pesos argentinos, pago único.
        El cobro lo procesa Mercado Pago. No hay una promoción permanente ni un precio tachado.
      </p>
      <h2>Uso aceptable</h2>
      <p>
        La cuenta es personal. No está permitido compartir el código para revender el acceso, intentar vulnerar la plataforma
        ni cargar datos de otra persona sin autorización de quien ejerce la responsabilidad parental.
      </p>
      <h2>Disponibilidad</h2>
      <p>
        El servicio se ofrece tal como está publicado. Puede haber interrupciones por mantenimiento, fallas de proveedores
        o cambios pedagógicos. Completar temas o simulacros no garantiza la admisión al colegio.
      </p>
      <h2>Arrepentimiento</h2>
      <p>
        La persona que contrató puede revocar la aceptación dentro del plazo de la Ley 24.240 y la Resolución 424/2020,
        desde el <Link href="/arrepentimiento">Botón de Arrepentimiento</Link>.
      </p>
      <h2>Privacidad</h2>
      <p>
        El tratamiento de datos se describe en la <Link href="/privacidad">Política de Privacidad</Link>.
      </p>
    </PaginaLegal>
  );
}
