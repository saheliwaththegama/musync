import { useEffect, useState } from "react";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { Megaphone } from "lucide-react";
import { db } from "../../firebase/firebase";
import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const announcementsQuery = query(
      collection(db, "announcements"),
      orderBy("createdAt", "desc"),
      limit(3)
    );

    const unsubscribe = onSnapshot(announcementsQuery, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAnnouncements(items);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SectionTitle subtitle="Latest Notices" title="Announcements" />

      {announcements.length === 0 ? (
        <Card className="p-6">
          <p className="text-sm text-slate-600">
            No announcements yet. Use the Admin Demo page to add one.
          </p>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          {announcements.map((item) => (
            <Card key={item.id} className="p-6">
              <Megaphone className="text-slate-900" />

              <h3 className="mt-4 font-bold text-slate-900">{item.title}</h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.message}
              </p>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

export default Announcements;