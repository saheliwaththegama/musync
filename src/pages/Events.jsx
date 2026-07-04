import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import EventCard from "../components/EventCard";
import PageContainer from "../components/common/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import { eventCategories, sampleEvents } from "../data/sampleEvents";

function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents = useMemo(() => {
    return sampleEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <PageContainer>
      <SectionTitle
        subtitle="Discover Events"
        title="Find the next school moment"
      />

      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by event, venue, or category"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-full border border-slate-300 py-3 pl-12 pr-4 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-amber-200"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {eventCategories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "bg-amber-100 text-slate-800 hover:bg-amber-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mb-5 text-sm font-medium text-slate-500">
        Showing {filteredEvents.length} event
        {filteredEvents.length !== 1 ? "s" : ""}
      </p>

      {filteredEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h3 className="text-xl font-bold text-slate-900">No events found</h3>
          <p className="mt-2 text-slate-500">
            Try another search word or choose a different category.
          </p>
        </div>
      )}
    </PageContainer>
  );
}

export default Events;