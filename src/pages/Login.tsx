import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-sm place-items-center p-6">
      <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h1 className="mb-4 text-2xl font-bold text-yellow-400">
          Final Bell — Sign in
        </h1>
        <button
          onClick={() => {
            localStorage.setItem("fb_session", "demo");
            nav("/app", { replace: true });
          }}
          className="w-full rounded-xl bg-yellow-400 px-4 py-2 font-semibold text-zinc-950 hover:opacity-90"
        >
          Continue (demo)
        </button>
        <p className="mt-3 text-sm text-zinc-400">
          Replace with Auth0/Cognito later.
        </p>
      </div>
    </main>
  );
}
