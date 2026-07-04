import { Link } from "react-router-dom";
import { appConfig } from "../config/appConfig";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={appConfig.logo}
              alt={`${appConfig.schoolName} logo`}
              className="h-12 w-12 rounded-full bg-white object-contain p-1"
            />

            <div>
              <h2 className="text-xl font-extrabold">{appConfig.appName}</h2>
              <p className="text-sm text-slate-300">{appConfig.schoolName}</p>
            </div>
          </div>

          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
            Stay in sync with every school moment through announcements,
            calendars, registrations, and live updates.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-amber-200">Quick Links</h3>

          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            <Link to="/" className="hover:text-amber-200">
              Home
            </Link>
            <Link to="/events" className="hover:text-amber-200">
              Events
            </Link>
            <Link to="/calendar" className="hover:text-amber-200">
              Calendar
            </Link>
            <Link to="/register" className="hover:text-amber-200">
              Register
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-amber-200">Project Note</h3>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            Developed as a web application project for school event management,
            digital registration, and real-time communication.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-400">
        © 2026 {appConfig.appName}. Built for the Web Development Competition.
      </div>
    </footer>
  );
}

export default Footer;