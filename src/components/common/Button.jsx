import { Link } from "react-router-dom";

// Reusable button for links and actions.
function Button({
  children,
  to,
  variant = "primary",
  type = "button",
  onClick,
}) {
  const baseStyle =
    "inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition";

  const styles = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-950",

    accent:
      "bg-amber-200 text-slate-900 hover:bg-amber-300",

    outline:
      "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
  };

  if (to) {
    return (
      <Link to={to} className={`${baseStyle} ${styles[variant]}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;