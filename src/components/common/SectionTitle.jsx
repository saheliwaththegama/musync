// Keeps page headings consistent throughout the app.
function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-8">
      <p className="font-semibold text-amber-600">{subtitle}</p>

      <h2 className="mt-2 text-3xl font-bold text-slate-900">
        {title}
      </h2>

      <div className="mt-3 h-1 w-20 rounded-full bg-amber-200" />
    </div>
  );
}

export default SectionTitle;