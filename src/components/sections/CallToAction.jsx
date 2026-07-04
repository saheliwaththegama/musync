import Button from "../common/Button";

function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-3xl bg-slate-900 px-6 py-12 text-center text-white">
        <p className="font-semibold text-amber-200">Ready to join?</p>

        <h2 className="mt-3 text-3xl font-extrabold">
          Register for your next school event today
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Keep track of upcoming events, reserve your place, and stay updated
          with every important school moment.
        </p>

        <div className="mt-8">
          <Button to="/register" variant="accent">
            Start Registration
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;