import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { Radio, Trash2, Megaphone } from "lucide-react";
import { db } from "../firebase/firebase";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import PageContainer from "../components/common/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import { sampleEvents } from "../data/sampleEvents";

function AdminDemo() {
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    message: "",
  });

  const [liveUpdateForm, setLiveUpdateForm] = useState({
    eventId: "science-expo",
    message: "",
  });

  const [announcements, setAnnouncements] = useState([]);
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const announcementsQuery = query(
      collection(db, "announcements"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(announcementsQuery, (snapshot) => {
      const items = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setAnnouncements(items);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const liveUpdatesQuery = query(
      collection(db, "liveUpdates"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(liveUpdatesQuery, (snapshot) => {
      const items = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setLiveUpdates(items);
    });

    return () => unsubscribe();
  }, []);

  function handleAnnouncementChange(event) {
    const { name, value } = event.target;
    setAnnouncementForm((current) => ({ ...current, [name]: value }));
  }

  function handleLiveUpdateChange(event) {
    const { name, value } = event.target;
    setLiveUpdateForm((current) => ({ ...current, [name]: value }));
  }

  async function publishAnnouncement(event) {
    event.preventDefault();

    if (!announcementForm.title.trim() || !announcementForm.message.trim()) {
      setStatusMessage("Please enter both announcement title and message.");
      return;
    }

    await addDoc(collection(db, "announcements"), {
      title: announcementForm.title,
      message: announcementForm.message,
      createdAt: serverTimestamp(),
    });

    setAnnouncementForm({ title: "", message: "" });
    setStatusMessage("Announcement published successfully.");
  }

  async function publishLiveUpdate(event) {
    event.preventDefault();

    if (!liveUpdateForm.eventId || !liveUpdateForm.message.trim()) {
      setStatusMessage("Please select an event and enter the update message.");
      return;
    }

    const selectedEvent = sampleEvents.find(
      (item) => item.id === liveUpdateForm.eventId
    );

    await addDoc(collection(db, "liveUpdates"), {
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      message: liveUpdateForm.message,
      createdAt: serverTimestamp(),
    });

    setLiveUpdateForm((current) => ({ ...current, message: "" }));
    setStatusMessage("Live update published successfully.");
  }

  async function deleteAnnouncement(id) {
    await deleteDoc(doc(db, "announcements", id));
    setStatusMessage("Announcement deleted successfully.");
  }

  async function deleteLiveUpdate(id) {
    await deleteDoc(doc(db, "liveUpdates", id));
    setStatusMessage("Live update deleted successfully.");
  }

  return (
    <PageContainer>
      <SectionTitle
        subtitle="Admin Dashboard"
        title="Manage announcements and live updates"
      />

      {statusMessage && (
        <p className="mb-6 rounded-xl bg-amber-100 px-4 py-3 text-sm font-semibold text-slate-900">
          {statusMessage}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Megaphone className="text-slate-900" />
            <h2 className="text-xl font-bold text-slate-900">
              Add Announcement
            </h2>
          </div>

          <form onSubmit={publishAnnouncement} className="mt-5 space-y-4">
            <input
              name="title"
              value={announcementForm.title}
              onChange={handleAnnouncementChange}
              placeholder="Announcement title"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-amber-200"
            />

            <textarea
              name="message"
              value={announcementForm.message}
              onChange={handleAnnouncementChange}
              placeholder="Announcement message"
              rows="4"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-amber-200"
            />

            <Button type="submit" variant="accent">
              Publish Announcement
            </Button>
          </form>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Radio className="text-slate-900" />
            <h2 className="text-xl font-bold text-slate-900">
              Add Live Update
            </h2>
          </div>

          <form onSubmit={publishLiveUpdate} className="mt-5 space-y-4">
            <select
              name="eventId"
              value={liveUpdateForm.eventId}
              onChange={handleLiveUpdateChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-amber-200"
            >
              {sampleEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              value={liveUpdateForm.message}
              onChange={handleLiveUpdateChange}
              placeholder="Live update message"
              rows="4"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-amber-200"
            />

            <Button type="submit" variant="primary">
              Publish Live Update
            </Button>
          </form>
        </Card>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900">
            Recent Announcements
          </h2>

          <div className="mt-5 space-y-3">
            {announcements.length === 0 ? (
              <p className="text-sm text-slate-500">No announcements yet.</p>
            ) : (
              announcements.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 p-4"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {item.message}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteAnnouncement(item.id)}
                    className="rounded-full bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    aria-label="Delete announcement"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900">
            Recent Live Updates
          </h2>

          <div className="mt-5 space-y-3">
            {liveUpdates.length === 0 ? (
              <p className="text-sm text-slate-500">No live updates yet.</p>
            ) : (
              liveUpdates.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 rounded-2xl bg-amber-50 p-4"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {item.eventTitle}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {item.message}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteLiveUpdate(item.id)}
                    className="rounded-full bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    aria-label="Delete live update"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}

export default AdminDemo;