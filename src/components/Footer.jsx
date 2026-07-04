import { appConfig } from "../config/appConfig";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500">
        <p>
          {appConfig.appname} Musync &copy; 2026. Built for {appConfig.schoolName} event
          communication, registrations, and live updates.
        </p>
      </div>
    </footer>
  );
}

export default Footer;