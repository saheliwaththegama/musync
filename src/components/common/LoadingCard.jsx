import Card from "./Card";

// A simple loading card used while Firebase data is being fetched.
function LoadingCard({ message = "Loading..." }) {
  return (
    <Card className="p-8 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

      <p className="mt-4 text-sm font-semibold text-slate-600">
        {message}
      </p>
    </Card>
  );
}

export default LoadingCard;