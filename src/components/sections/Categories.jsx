import { Link } from "react-router-dom";
import { BookOpen, FlaskConical, Trophy, Music, Laptop, HeartHandshake } from "lucide-react";

const categories = [
  { name: "Academic", icon: BookOpen },
  { name: "Exhibition", icon: FlaskConical },
  { name: "Sports", icon: Trophy },
  { name: "Cultural", icon: Music },
  { name: "Technology", icon: Laptop },
  { name: "Service", icon: HeartHandshake },
];

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-sm font-bold text-orange-500">Explore</p>

      <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
        Event Categories
      </h2>

      <div className="mt-3 h-1 w-16 rounded-full bg-amber-200" />

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.name}
              to={`/events?category=${category.name}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-md"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-200 text-slate-900 transition group-hover:bg-slate-900 group-hover:text-white">
                <Icon size={22} />
              </div>

              <p className="mt-4 text-sm font-bold text-slate-900">
                {category.name}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Categories;