import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { appConfig } from "../config/appConfig";
import { validateSignIn } from "../utils/authValidation";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateSignIn(form);
    setErrors(validationErrors);
    setFormError("");

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsSubmitting(true);

      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/");
    } catch (error) {
      setFormError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <Card className="p-6">
        <div className="text-center">
          <img
            src={appConfig.logo}
            alt={`${appConfig.schoolName} logo`}
            className="mx-auto h-16 w-16 object-contain"
          />

          <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to register for events and manage your activity.
          </p>
        </div>

        {formError && (
          <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {formError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-amber-200"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-amber-200"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <Button type="submit" variant="accent">
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          New to Musync?{" "}
          <Link to="/signup" className="font-semibold text-slate-900">
            Create account
          </Link>
        </p>
      </Card>
    </main>
  );
}

export default Login;