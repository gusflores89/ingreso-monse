export default function Monse({ mensaje }) {
  return (
    <div className="monse">
      <div className="monse-avatar" aria-hidden="true">
        <span className="monse-eye left" />
        <span className="monse-eye right" />
        <span className="monse-beak" />
      </div>
      {mensaje && <p className="monse-message">{mensaje}</p>}
    </div>
  );
}
