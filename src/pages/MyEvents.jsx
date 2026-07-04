import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Ticket,
} from "lucide-react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import useAuth from "../hooks/useAuth";
import Card from "../components/common/Card";
import PageContainer from "../components/common/PageContainer";
import SectionTitle from "../components/common/SectionTitle";

function MyEvents() {
  const { currentUser } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    // Listen only to registrations created by the logged-in student.
    const registrationsQuery = query(
      collection(db, "registrations"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(registrationsQuery, (snapshot) => {
      const registrationList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRegistrations(registrationList);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <PageContainer>
      <SectionTitle subtitle="My Events" title="Your registered events" />

      {isLoading ? (
        <Card className="p-8 text-center">
          <p className="font-semibold text-slate-600">
            Loading your registrations...
          </p>
        </Card>
      ) : registrations.length === 0 ? (
        <Card className="p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-200">
            <Ticket className="text-slate-900" />
          </div>

          <h2 className="mt-5 text-2xl font-extrabold text-slate-900">
            No registrations yet
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Once you register for an event, your booking details will appear
            here.
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {registrations.map((registration) => (
            <Card key={registration.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {registration.status}
                  </p>

                  <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
                    {registration.eventTitle}
                  </h2>
                </div>

                <CheckCircle2 className="text-emerald-600" />
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <CalendarDays size={17} />
                  {registration.eventDate}
                </p>

                <p className="flex items-center gap-2">
                  <Clock size={17} />
                  Registered successfully
                </p>

                <p className="flex items-center gap-2">
                  <MapPin size={17} />
                  {registration.eventVenue}
                </p>

                <p className="flex items-center gap-2">
                  <Ticket size={17} />
                  Ticket ID: {registration.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default MyEvents;