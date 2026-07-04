import { useEffect, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import Button from "../common/Button";
import { appConfig } from "../../config/appConfig";
import { sampleEvents } from "../../data/sampleEvents";

function Hero() {
  const heroEvents = sampleEvents.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeEvent = heroEvents[activeIndex];

  useEffect(() => {
    // Rotate the main event every few seconds to keep the homepage lively.
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroEvents.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroEvents.length]);

  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-amber-200 px-4 py-2 text-sm font-semibold text-slate-900">
            {appConfig.tagline}
          </p>

          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Stay in sync with every school moment
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Musync brings school events, announcements, registrations,
            calendars, and live updates into one simple platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/events" variant="accent">
              Explore Events
            </Button>

            <Button to="/calendar" variant="outline">
              View Calendar
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white/10 p-3 shadow-2xl ring-1 ring-white/20">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={activeEvent.image}
              alt={activeEvent.title}
              className="h-[420px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-bold text-slate-900">
                {activeEvent.category}
              </span>

              <h2 className="mt-4 text-3xl font-extrabold">
                {activeEvent.title}
              </h2>

              <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-200">
                {activeEvent.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-200">
                <p className="flex items-center gap-2">
                  <CalendarDays size={17} />
                  {activeEvent.date} at {activeEvent.time}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin size={17} />
                  {activeEvent.venue}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <Button to={`/events/${activeEvent.id}`} variant="accent">
                  Explore Event
                </Button>

                <div className="flex gap-2">
                  {heroEvents.map((event, index) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`h-2.5 rounded-full transition ${
                        index === activeIndex
                          ? "w-8 bg-amber-200"
                          : "w-2.5 bg-white/50"
                      }`}
                      aria-label={`Show ${event.title}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;