// Displays short labels such as event categories.
function Badge({ children }) {
  return (
    <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-slate-900">
      {children}
    </span>
  );
}

export default Badge;