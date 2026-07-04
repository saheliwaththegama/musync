import {
  BookOpen,
  FlaskConical,
  HeartHandshake,
  Mic2,
  Trophy,
  Laptop,
} from "lucide-react";
import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

const categories = [
  { name: "Academic", icon: BookOpen },
  { name: "Exhibition", icon: FlaskConical },
  { name: "Sports", icon: Trophy },
  { name: "Cultural", icon: Mic2 },
  { name: "Technology", icon: Laptop },
  { name: "Service", icon: HeartHandshake },
];

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SectionTitle subtitle="Explore" title="Event Categories" />

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Card key={category.name} className="p-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-200">
                <Icon className="text-slate-900" />
              </div>

              <p className="mt-4 font-bold text-slate-900">
                {category.name}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default Categories;