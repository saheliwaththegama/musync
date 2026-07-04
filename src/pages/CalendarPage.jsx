import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useNavigate } from "react-router-dom";
import Card from "../components/common/Card";
import PageContainer from "../components/common/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import { sampleEvents } from "../data/sampleEvents";

function CalendarPage() {
  const navigate = useNavigate();

  const calendarEvents = sampleEvents.map((event) => ({
    id: event.id,
    title: event.title,
    date: event.date,
    extendedProps: {
      category: event.category,
      venue: event.venue,
    },
  }));

  function handleEventClick(info) {
    navigate(`/events/${info.event.id}`);
  }

  return (
    <PageContainer>
      <SectionTitle
        subtitle="Event Calendar"
        title="Plan around upcoming school events"
      />

      <Card className="p-5">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          eventClick={handleEventClick}
          height="auto"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth",
          }}
        />
      </Card>

      <p className="mt-5 text-sm text-slate-500">
        Click an event on the calendar to view full details.
      </p>
    </PageContainer>
  );
}

export default CalendarPage;