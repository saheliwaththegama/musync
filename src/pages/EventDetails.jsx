import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, Clock, MapPin, Sparkles, Radio, } from "lucide-react";
import { collection, onSnapshot, orderBy, query, where, } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import PageContainer from "../components/common/PageContainer";
import Countdown from "../components/Countdown";
import { sampleEvents } from "../data/sampleEvents";

function EventDetails() {
  const { eventId } = useParams();
  const event = sampleEvents.find((item) => item.id === eventId);

  const [liveUpdates, setLiveUpdates] = useState([]);

  useEffect(() => {
    if (!event) return;

    // Keep this event's live updates fresh while the page is open.
    const updatesQuery = query(
      collection(db, "liveUpdates"),
      where("eventId", "==", event.id),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(updatesQuery, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLiveUpdates(items);
    });

    return () => unsubscribe();
  }, [event]);

  if (!event) {
    return (
      <PageContainer>
        <Card className="p-10 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Event not found
          </h1>

          <p className="mt-3 text-slate-600">
            The event you are looking for may have been removed.
          </p>

          <div className="mt-6">
            <Button to="/events" variant="accent">
              Back to Events
            </Button>
          </div>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Link
        to="/events"
        className="mb-6 inline-flex text-sm font-semibold text-slate-600 hover:text-slate-950"
      >
        ← Back to Events
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="h-80 w-full object-cover"
          />

          <div className="p-6">
            <Badge>{event.category}</Badge>

            <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
              {event.title}
            </h1>

            <p className="mt-4 leading-8 text-slate-600">
              {event.longDescription}
            </p>

            <div className="mt-6 grid gap-4 text-sm text-slate-600 md:grid-cols-3">
              <p className="flex items-center gap-2">
                <CalendarDays size={18} />
                {event.date}
              </p>

              <p className="flex items-center gap-2">
                <Clock size={18} />
                {event.time}
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={18} />
                {event.venue}
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Event Countdown
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Time remaining until this event begins.
            </p>

            <div className="mt-5">
              <Countdown date={event.date} />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Event Highlights
            </h2>

            <div className="mt-4 space-y-3">
              {event.highlights.map((highlight) => (
                <p
                  key={highlight}
                  className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600"
                >
                  <Sparkles size={17} className="mt-0.5 text-amber-500" />
                  {highlight}
                </p>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2">
              <Radio className="text-amber-500" size={20} />
              <h2 className="text-xl font-bold text-slate-900">
                Live Updates
              </h2>
            </div>

            {liveUpdates.length === 0 ? (
              <p className="mt-4 text-sm leading-6 text-slate-600">
                No live updates yet. Updates will appear here during the event.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {liveUpdates.map((update) => (
                  <p
                    key={update.id}
                    className="rounded-2xl bg-amber-50 p-3 text-sm leading-6 text-slate-700"
                  >
                    {update.message}
                  </p>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Reserve Your Place
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Register online and keep your event participation details in one
              place.
            </p>

            <div className="mt-5">
              <Button to="/register" variant="accent">
                Register for Event
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

export default EventDetails;