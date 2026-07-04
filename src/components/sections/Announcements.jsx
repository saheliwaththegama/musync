import { Megaphone } from "lucide-react";
import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

const announcements = [
  "Science Expo registration closes on Friday.",
  "Sports Meet house practice schedule has been updated.",
  "Debate finalists should report to the auditorium by 1.30 PM.",
];

function Announcements() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SectionTitle subtitle="Latest Notices" title="Announcements" />

      <div className="grid gap-5 md:grid-cols-3">
        {announcements.map((message) => (
          <Card key={message} className="p-6">
            <Megaphone className="text-slate-900" />

            <p className="mt-4 text-sm leading-6 text-slate-600">
              {message}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Announcements;