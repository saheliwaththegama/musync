import { CalendarDays, Megaphone, Ticket } from "lucide-react";
import Button from "../common/Button";
import { appConfig } from "../../config/appConfig";
import { sampleEvents } from "../../data/sampleEvents";

function Hero() {
  const nextEvent = sampleEvents[0];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-amber-200 px-4 py-2 text-sm font-semibold text-slate-900">
            {appConfig.tagline}
          </p>

          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Stay in sync with every school moment
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
            Musync brings announcements, event pages, calendars, registrations,
            and live highlights into one simple platform for the school
            community.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/events" variant="accent">
              Explore Events
            </Button>

            <Button to="/register" variant="outline">
              Register Now
            </Button>
          </div>
        </div>

        <div className="rounded-3xl bg-white/10 p-5 shadow-2xl ring-1 ring-white/20">
          <div className="rounded-2xl bg-white p-6 text-slate-900">
            <p className="text-sm font-bold text-amber-600">
              Next Featured Event
            </p>

            <h2 className="mt-3 text-2xl font-extrabold">
              {nextEvent.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {nextEvent.description}
            </p>

            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <p className="flex items-center gap-2">
                <CalendarDays size={18} />
                {nextEvent.date} at {nextEvent.time}
              </p>

              <p className="flex items-center gap-2">
                <Megaphone size={18} />
                Live highlights will appear during the event
              </p>

              <p className="flex items-center gap-2">
                <Ticket size={18} />
                Online registration available
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-amber-100 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Countdown will be activated in the event detail page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;