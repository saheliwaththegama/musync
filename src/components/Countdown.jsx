import { useEffect, useState } from "react";

function getTimeLeft(targetDate) {
  const eventTime = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const difference = eventTime - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function Countdown({ date }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(date));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(date));
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl bg-amber-100 p-4 text-center">
          <p className="text-2xl font-extrabold text-slate-900">
            {String(item.value).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Countdown;