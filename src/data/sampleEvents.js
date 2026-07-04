import scienceExpoImage from "../assets/images/events/science-expo.jpg";
import sportsMeetImage from "../assets/images/events/sports-meet.jpg";
import debateImage from "../assets/images/events/debate.jpg";
import culturalImage from "../assets/images/events/cultural.jpg";
import ictShowcaseImage from "../assets/images/events/ict-showcase.jpg";
import communityServiceImage from "../assets/images/events/community-service.jpg";
export const sampleEvents = [
  {
    id: "science-expo",
    title: "Science & Innovation Expo",
    category: "Exhibition",
    date: "2026-08-12",
    time: "9.00 AM",
    venue: "School Premises",
    description:
      "Explore creative science and technology projects presented by talented students.",
    longDescription:
      "The Science & Innovation Expo gives students a chance to present creative experiments, digital prototypes, engineering ideas, and research-based projects. Visitors can explore demonstrations, speak with student innovators, and vote for their favourite project.",
    image:scienceExpoImage,
    highlights: [
      "Student innovation booths",
      "Live science demonstrations",
      "Best project selection",
    ],
  },
  {
    id: "sports-meet",
    title: "Annual Sports Meet",
    category: "Sports",
    date: "2026-08-20",
    time: "8.30 AM",
    venue: "Sugathadasa Stadium",
    description:
      "Celebrate teamwork, determination, and school spirit through exciting competitions.",
    longDescription:
      "The Annual Sports Meet brings students, teachers, parents, and houses together for a full day of athletic events. The event includes track races, field events, relays, march past, and house performances.",
    image:sportsMeetImage,
    highlights: ["Track and field events", "House march past", "Awards ceremony"],
  },
  {
    id: "debate-finals",
    title: "Inter-House Debate Championship",
    category: "Academic",
    date: "2026-09-05",
    time: "2.00 PM",
    venue: "Higgins Hall",
    description:
      "Witness inspiring debates where students present ideas with confidence.",
    longDescription:
      "The Inter-House Debate Championship encourages critical thinking, confident speaking, teamwork, and respectful argument. Finalists will present prepared and impromptu arguments before a judging panel.",
    image:debateImage,
    highlights: ["Final debate round", "Best speaker award", "Judges' feedback"],
  },
  {
    id: "cultural-festival",
    title: "Music & Cultural Festival",
    category: "Cultural",
    date: "2026-09-18",
    time: "5.30 PM",
    venue: "Peter De Abrew Memorial Auditorium",
    description:
      "Calling everyone who has passion for therter to enjoy music, dance, drama, and artistic performances from talented students.",
    longDescription:
      "The Music & Cultural Festival celebrates creativity through artistic expressions. It gives students a platform to perform and share cultural talent with the school community.",
    image:culturalImage,
    highlights: ["Music performances", "Dance items", "Drama showcase"],
  },
  {
    id: "ict-showcase",
    title: "ICT Project Showcase",
    category: "Technology",
    date: "2026-10-02",
    time: "10.00 AM",
    venue: "ICT Lab",
    description:
      "Discover innovative software, robotics, and digital solutions developed by students.",
    longDescription:
      "The ICT Project Showcase presents student-built websites, mobile app ideas, robotics prototypes, and digital solutions. It encourages creativity, problem solving, and practical technology skills.",
    image:ictShowcaseImage,
    highlights: ["Web apps", "Robotics demos", "Student software projects"],
  },
  {
    id: "community-service",
    title: "Community Service Day",
    category: "Service",
    date: "2026-10-15",
    time: "8.00 AM",
    venue: "Peter De Abrew Memorial Auditorium",
    description:
      "Join meaningful activities that promote awareness, and responsibility.",
    longDescription:
      "Community Service Day encourages students to take part in meaningful activities that support the school and wider community. The programme includes environmental care, donation drives, and awareness activities.",
    image:communityServiceImage,
    highlights: [ "Donation collection", "Awareness activities"],
  },
];

export const eventCategories = [
  "All",
  "Academic",
  "Exhibition",
  "Sports",
  "Cultural",
  "Technology",
  "Service",
];