import { Link } from "react-router-dom";
import { CalendarDays, Clock, MapPin, Star } from "lucide-react";
import Badge from "./common/Badge";
import Card from "./common/Card";

function EventCard({ event }) {
  return (
    <Card className="group overflow-hidden">
      <div className="overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge>{event.category}</Badge>

          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            <Star size={13} className="text-amber-500" />
            Featured
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold text-slate-900">
          {event.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {event.description}
        </p>

        <div className="mt-4 space-y-2 text-sm text-slate-500">
          <p className="flex items-center gap-2">
            <CalendarDays size={16} />
            {event.date}
          </p>

          <p className="flex items-center gap-2">
            <Clock size={16} />
            {event.time}
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={16} />
            {event.venue}
          </p>
        </div>

        <Link
          to={`/events/${event.id}`}
          className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-amber-300 hover:text-slate-900"
        >
          Explore Event →
        </Link>
      </div>
    </Card>
  );
}

export default EventCard;