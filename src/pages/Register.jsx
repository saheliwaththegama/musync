import { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CheckCircle2, Ticket } from "lucide-react";
import { db } from "../firebase/firebase";
import useAuth from "../hooks/useAuth";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import PageContainer from "../components/common/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import { sampleEvents } from "../data/sampleEvents";
import { validateRegistration } from "../utils/registrationValidation";
import { generateTicketId } from "../utils/ticketGenerator";

function Register() {
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    fullName: currentUser?.displayName || "",
    email: currentUser?.email || "",
    phone: "",
    grade: "",
    eventId: "",
  });

  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateRegistration(form);
    setErrors(validationErrors);
    setFormMessage("");
    setSuccessData(null);

    if (Object.keys(validationErrors).length > 0) return;

    const selectedEvent = sampleEvents.find((item) => item.id === form.eventId);

    if (!selectedEvent) {
      setFormMessage("Please select a valid event.");
      return;
    }

    const ticketId = generateTicketId();

    try {
      setIsSubmitting(true);

      // Save one confirmed booking for the logged-in student.
      await addDoc(collection(db, "registrations"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        grade: form.grade,
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        eventDate: selectedEvent.date,
        eventVenue: selectedEvent.venue,
        ticketId,
        status: "confirmed",
        createdAt: serverTimestamp(),
      });

      setSuccessData({
        ticketId,
        eventTitle: selectedEvent.title,
        eventDate: selectedEvent.date,
        eventVenue: selectedEvent.venue,
      });

      setForm((current) => ({
        ...current,
        phone: "",
        grade: "",
        eventId: "",
      }));
    } catch (error) {
      console.error("Registration failed:", error);
      setFormMessage("Registration could not be saved. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageContainer>
      <SectionTitle
        subtitle="Online Registration"
        title="Reserve your place for an event"
      />

      {successData && (
        <Card className="mb-8 border-emerald-200 bg-emerald-50 p-6">
          <div className="text-center">
            <CheckCircle2 className="mx-auto text-emerald-600" size={42} />

            <h2 className="mt-4 text-2xl font-extrabold text-emerald-700">
              Registration Successful
            </h2>

            <p className="mt-3 text-sm text-slate-600">
              Your event place has been reserved successfully.
            </p>

            <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-lg font-bold text-slate-900">
                {successData.eventTitle}
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Date: {successData.eventDate}
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Venue: {successData.eventVenue}
              </p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Ticket ID
              </p>

              <p className="mt-2 rounded-xl bg-amber-100 px-4 py-3 font-mono text-lg font-extrabold text-slate-900">
                {successData.ticketId}
              </p>
            </div>

            <div className="mt-6">
              <Button to="/my-events" variant="primary">
                View My Events
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-200">
            <Ticket className="text-slate-900" />
          </div>

          <h2 className="mt-5 text-2xl font-extrabold text-slate-900">
            Simple event registration
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Students can register online for school events using their Musync
            account. Each successful registration creates a digital ticket ID.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Logged in as</p>
            <p className="mt-1">{currentUser?.email}</p>
          </div>

          <Link
            to="/my-events"
            className="mt-5 inline-flex text-sm font-semibold text-slate-900 hover:text-amber-600"
          >
            View my registered events →
          </Link>
        </Card>

        <Card className="p-6">
          {formMessage && (
            <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {formMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-amber-200"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-amber-200"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="0771234567"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-amber-200"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Grade
              </label>
              <input
                name="grade"
                type="number"
                value={form.grade}
                onChange={handleChange}
                placeholder="6 - 13"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-amber-200"
              />
              {errors.grade && (
                <p className="mt-1 text-sm text-red-600">{errors.grade}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Select Event
              </label>
              <select
                name="eventId"
                value={form.eventId}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-amber-200"
              >
                <option value="">Choose an event</option>
                {sampleEvents.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
              {errors.eventId && (
                <p className="mt-1 text-sm text-red-600">{errors.eventId}</p>
              )}
            </div>

            <Button type="submit" variant="accent">
              {isSubmitting ? "Saving..." : "Reserve My Place"}
            </Button>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
}

export default Register;