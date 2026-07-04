import { CalendarDays, Megaphone, Ticket, Users } from "lucide-react";
import Card from "../common/Card";

const stats = [
  { label: "Upcoming Events", value: "18", icon: CalendarDays },
  { label: "Registrations", value: "740", icon: Ticket },
  { label: "Announcements", value: "12", icon: Megaphone },
  { label: "Participants", value: "1.2k", icon: Users },
];

function Stats() {
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