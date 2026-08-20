import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { adminSignIn, adminSignOut, isAdminAuthenticated } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Pecho" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    setAuthed(isAdminAuthenticated());
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!authed) return <LoginForm onSuccess={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-brand-cream">
      <header className="border-b border-brand-roast/10 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-display text-xl">Pecho Admin</span>
            <nav className="flex gap-4 text-sm">
              <Link to="/admin" activeOptions={{ exact: true }} activeProps={{ className: "text-brand-toast" }} className="hover:text-brand-toast">Dashboard</Link>
              <Link to="/admin/orders" activeProps={{ className: "text-brand-toast" }} className="hover:text-brand-toast">Orders</Link>
              <Link to="/admin/analytics" activeProps={{ className: "text-brand-toast" }} className="hover:text-brand-toast">Analytics</Link>
            </nav>
          </div>
          <button
            onClick={() => { adminSignOut(); setAuthed(false); nav({ to: "/admin" }); }}
            className="text-sm text-brand-roast/60 hover:text-brand-roast"
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (adminSignIn(email, password)) onSuccess();
          else setError(true);
        }}
        className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-display font-medium">Admin Login</h1>
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-brand-roast/15 rounded-xl px-4 py-3 text-sm"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-brand-roast/15 rounded-xl px-4 py-3 text-sm"
        />
        {error && <p className="text-sm text-red-600">Invalid credentials</p>}
        <button className="w-full bg-brand-toast text-white py-3 rounded-full font-semibold">
          Sign in
        </button>
      </form>
    </div>
  );
}
