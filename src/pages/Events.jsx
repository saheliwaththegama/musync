import { useMemo, useState } from "react";
import { Search, XCircle } from "lucide-react";
import EventCard from "../components/EventCard";
import PageContainer from "../components/common/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import { eventCategories, sampleEvents } from "../data/sampleEvents";

function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents = useMemo(() => {
    const searchValue = searchTerm.toLowerCase().trim();

    return sampleEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchValue) ||
        event.venue.toLowerCase().includes(searchValue) ||
        event.category.toLowerCase().includes(searchValue);

      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
  }

  return (
    <PageContainer>
      <SectionTitle
        subtitle="Discover Events"
        title="Find the next school moment"
      />

      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search events by title, venue, or category"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-full border border-slate-300 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-amber-200"
            />
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <XCircle size={17} />
            Clear
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
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

      <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <p className="text-sm font-semibold text-slate-600">
          Showing{" "}
          <span className="text-slate-900">{filteredEvents.length}</span>{" "}
          event{filteredEvents.length !== 1 ? "s" : ""}
        </p>

        {(searchTerm || selectedCategory !== "All") && (
          <p className="text-sm text-slate-500">
            Filter: {selectedCategory}
            {searchTerm ? ` • "${searchTerm}"` : ""}
          </p>
        )}
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <Search className="text-slate-900" />
          </div>

          <h3 className="mt-5 text-2xl font-extrabold text-slate-900">
            No matching events found
          </h3>

          <p className="mx-auto mt-3 max-w-md text-slate-500">
            Try another keyword or choose a different event category.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-950"
          >
            Clear Search
          </button>
        </div>
      )}
    </PageContainer>
  );
}

export default Events;