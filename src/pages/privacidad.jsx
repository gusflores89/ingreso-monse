import Link from "next/link";
import PaginaLegal from "@/components/PaginaLegal";

export default function PrivacidadPage() {
  return (
    <PaginaLegal
      title="Política de Privacidad"
      description="Cómo Ingreso Monse trata los datos de estudiantes menores y de sus familias, según la Ley 25.326."
      path="/privacidad"
    >
      <p>Última actualización del borrador: 29 de octubre de 2026. Ley 25.326 de Protección de Datos Personales.</p>
      <h2>Datos de menores</h2>
      <p>
        El servicio está pensado para niñas y niños que se preparan para un ingreso escolar. La cuenta solo puede crearla
        una persona adulta responsable, que declara ese carácter al registrarse. No pedimos que el estudiante contrate ni pague.
      </p>
      <p>Podemos tratar, según lo que cargue la familia:</p>
      <ul>
        <li>Nombre, edad, grado y fecha de nacimiento del estudiante.</li>
        <li>Email y contraseña familiar de la persona adulta.</li>
        <li>Respuestas, avances, escritos de práctica y configuración del tutor.</li>
        <li>Datos del pago que Mercado Pago nos confirma (estado e identificador), no la tarjeta.</li>
      </ul>
      <h2>Para qué se usan</h2>
      <p>
        Para crear la cuenta, mostrar la práctica, guardar el progreso, avisar a la familia y cobrar el Acceso Completo.
        No vendemos datos. No usamos el nombre del estudiante para publicidad.
      </p>
      <h2>Consentimiento</h2>
      <p>
        La base es el consentimiento de la persona adulta responsable y la ejecución del servicio que esa persona pidió.
        Puede retirar el consentimiento y pedir la supresión escribiendo al contacto indicado abajo.
      </p>
      <h2>Derechos de la Ley 25.326</h2>
      <p>La persona titular, o quien ejerce la responsabilidad parental, puede pedir de forma gratuita:</p>
      <ul>
        <li>Acceso a los datos.</li>
        <li>Rectificación o actualización si son inexactos.</li>
        <li>Supresión cuando corresponda.</li>
        <li>Información sobre cesiones.</li>
      </ul>
      <p>
        La Agencia de Acceso a la Información Pública (AAIP) es el órgano de control. Sitio: argentina.gob.ar/aaip.
        La inscripción de la base de datos ante la AAIP figura como pendiente en este borrador.
      </p>
      <h2>Quiénes intervienen</h2>
      <p>Para prestar el servicio podemos usar proveedores que tratan datos por nuestra cuenta:</p>
      <ul>
        <li>Vercel, para publicar el sitio.</li>
        <li>Supabase, para guardar la cuenta y el progreso.</li>
        <li>Mercado Pago, para cobrar.</li>
        <li>Resend, para enviar emails a la familia.</li>
        <li>El proveedor de IA que genera explicaciones de práctica, sin usar esos textos para publicidad.</li>
      </ul>
      <h2>Analítica opcional</h2>
      <p>
        Si el responsable configura Meta Pixel o Microsoft Clarity, el sitio puede registrar páginas visitadas y eventos de
        registro, inicio de pago y compra confirmada. Esos módulos no se cargan si las variables no están definidas.
        No se envía a Meta el nombre, el email ni otros datos identificatorios del estudiante. La publicidad no está dirigida al niño.
      </p>
      <h2>Conservación</h2>
      <p>
        Conservamos la cuenta mientras la familia la use y el tiempo necesario para obligaciones legales de facturación.
        Se puede pedir la baja al contacto del responsable.
      </p>
      <p>
        El derecho de arrepentimiento de la compra está en el <Link href="/arrepentimiento">Botón de Arrepentimiento</Link>.
      </p>
    </PaginaLegal>
  );
}
