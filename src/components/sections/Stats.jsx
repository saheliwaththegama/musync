import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { CalendarDays, Megaphone, Ticket, Radio } from "lucide-react";
import { db } from "../../firebase/firebase";
import Card from "../common/Card";
import { sampleEvents } from "../../data/sampleEvents";

function Stats() {
  const [counts, setCounts] = useState({
    registrations: 0,
    announcements: 0,
    liveUpdates: 0,
  });

  useEffect(() => {
    const unsubscribeRegistrations = onSnapshot(
      collection(db, "registrations"),
      (snapshot) => {
        setCounts((current) => ({
          ...current,
          registrations: snapshot.size,
        }));
      }
    );

    const unsubscribeAnnouncements = onSnapshot(
      collection(db, "announcements"),
      (snapshot) => {
        setCounts((current) => ({
          ...current,
          announcements: snapshot.size,
        }));
      }
    );

    const unsubscribeLiveUpdates = onSnapshot(
      collection(db, "liveUpdates"),
      (snapshot) => {
        setCounts((current) => ({
          ...current,
          liveUpdates: snapshot.size,
        }));
      }
    );

    return () => {
      unsubscribeRegistrations();
      unsubscribeAnnouncements();
      unsubscribeLiveUpdates();
    };
  }, []);

  const stats = [
    {
      label: "Upcoming Events",
      value: sampleEvents.length,
      icon: CalendarDays,
    },
    {
      label: "Registrations",
      value: counts.registrations,
      icon: Ticket,
    },
    {
      label: "Announcements",
      value: counts.announcements,
      icon: Megaphone,
    },
    {
      label: "Live Updates",
      value: counts.liveUpdates,
      icon: Radio,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-5 md:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.label} className="p-6">
              <Icon className="text-slate-900" size={28} />

              <p className="mt-5 text-3xl font-extrabold text-slate-900">
                {item.value}
              </p>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {item.label}
              </p>

              <div className="mt-4 h-1 w-12 rounded-full bg-amber-200" />
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default Stats;