import EventCard from "../EventCard";
import Button from "../common/Button";
import SectionTitle from "../common/SectionTitle";
import { sampleEvents } from "../../data/sampleEvents";

function UpcomingEvents() {
  const eventsToShow = sampleEvents.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-4 md:flex md:items-end md:justify-between">
        <SectionTitle
          subtitle="Upcoming Events"
          title="What is happening next?"
        />

        <Button to="/events" variant="outline">
          View All Events
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {eventsToShow.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}

export default UpcomingEvents;