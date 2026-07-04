import { Link } from "react-router-dom";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Badge from "./common/Badge";
import Card from "./common/Card";

function EventCard({ event }) {
  return (
    <Card className="overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <Badge>{event.category}</Badge>

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
          className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-950"
        >
          View Details
        </Link>
      </div>
    </Card>
  );
}

export default EventCard;