import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { appConfig } from "../config/appConfig";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { currentUser, userProfile } = useAuth();

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "border-b-2 border-amber-300 pb-1 text-slate-950"
      : "pb-1 text-slate-700 hover:border-b-2 hover:border-amber-200 hover:text-slate-950";

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur">
      <div className="h-1 bg-amber-200" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={appConfig.logo}
            alt={`${appConfig.schoolName} logo`}
            className="h-12 w-12 rounded-full object-contain"
          />

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              {appConfig.appName}
            </h1>
            <p className="text-xs font-medium text-slate-500">
              {appConfig.schoolName}
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/events" className={navLinkStyle}>
            Events
          </NavLink>

          <NavLink to="/calendar" className={navLinkStyle}>
            Calendar
          </NavLink>

          {currentUser && (
            <>
              <NavLink to="/register" className={navLinkStyle}>
                Register
              </NavLink>

              <NavLink to="/my-events" className={navLinkStyle}>
                My Events
              </NavLink>
            </>
          )}

          {userProfile?.role === "admin" && (
            <NavLink to="/admin-demo" className={navLinkStyle}>
              Admin Dashboard
            </NavLink>
          )}

          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600">
                Hi, {currentUser.displayName || "Student"}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-950"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/signup"
                className="rounded-full bg-amber-200 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-950"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;