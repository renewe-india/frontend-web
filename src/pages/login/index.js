"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import ErrorDisplay from "@/components/ErrorDisplay";
import { SignIn } from "@phosphor-icons/react";

const Login = () => {
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const submitForm = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    await login({
      username,
      password,
      setErrors,
      setStatus,
    });
  };

  return (
    <>
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold">Login</div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <form onSubmit={submitForm} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="username"
                className="pt-0 label label-text font-semibold"
              >
                <span>
                  Username
                  <span className="text-error">*</span>
                </span>
              </label>
              <div className="flex-1 relative">
                <input
                  id="username"
                  placeholder=""
                  className="input input-primary w-full peer"
                  type="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="pt-0 label label-text font-semibold"
              >
                <span>
                  Password
                  <span className="text-error">*</span>
                </span>
              </label>
              <div className="flex-1 relative">
                <input
                  id="password"
                  placeholder=""
                  className="input input-primary w-full peer"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn normal-case btn-primary"
              disabled={isSubmitting}
            >
              <SignIn size={24} />

              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
          <ErrorDisplay errors={errors} />
          <div className="mt-5 text-center font-semibold">
            Can&apos;t Sign In?
          </div>
          <div className="mt-2 flex items-center justify-between">
            <Link href="/onboarding" className="btn normal-case btn-outline">
              Register
            </Link>
            <Link
              href="/forgot-password"
              className="btn normal-case btn-outline"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
