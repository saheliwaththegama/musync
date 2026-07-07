import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { appConfig } from "../config/appConfig";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { currentUser, userProfile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await signOut(auth);
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "border-b-2 border-amber-300 pb-1 text-slate-950"
      : "pb-1 text-slate-700 hover:border-b-2 hover:border-amber-200 hover:text-slate-950";

  const mobileLinkStyle =
    "block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-amber-100";

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur">
      <div className="h-1 bg-amber-200" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={appConfig.logo}
            alt={`${appConfig.schoolName} logo`}
            className="h-11 w-11 rounded-full object-contain md:h-12 md:w-12"
          />

          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 md:text-xl">
              {appConfig.appName}
            </h1>
            <p className="text-xs font-medium text-slate-500">
              {appConfig.schoolName}
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/events" className={navLinkStyle}>Events</NavLink>
          <NavLink to="/calendar" className={navLinkStyle}>Calendar</NavLink>

          {currentUser && (
            <>
              <NavLink to="/register" className={navLinkStyle}>Register</NavLink>
              <NavLink to="/my-events" className={navLinkStyle}>My Events</NavLink>
            </>
          )}

          {userProfile?.role === "admin" && (
            <NavLink to="/admin" className={navLinkStyle}>
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

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="rounded-xl bg-slate-100 p-2 text-slate-900 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="space-y-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className={mobileLinkStyle}>Home</Link>
            <Link to="/events" onClick={() => setMenuOpen(false)} className={mobileLinkStyle}>Events</Link>
            <Link to="/calendar" onClick={() => setMenuOpen(false)} className={mobileLinkStyle}>Calendar</Link>

            {currentUser && (
              <>
                <Link to="/register" onClick={() => setMenuOpen(false)} className={mobileLinkStyle}>Register</Link>
                <Link to="/my-events" onClick={() => setMenuOpen(false)} className={mobileLinkStyle}>My Events</Link>
              </>
            )}

            {userProfile?.role === "admin" && (
              <Link to="/admin" onClick={() => setMenuOpen(false)} className={mobileLinkStyle}>
                Admin Dashboard
              </Link>
            )}

            {currentUser ? (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 w-full rounded-xl bg-slate-900 px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Logout
              </button>
            ) : (
              <div className="grid gap-2 pt-2">
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-amber-200 px-4 py-3 text-center text-sm font-semibold text-slate-900"
                >
                  Sign Up
                </Link>

                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;