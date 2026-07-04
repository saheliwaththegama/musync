// A reusable card used across the application.
function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;