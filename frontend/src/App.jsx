import { useState } from "react";

const QueryInput = ({ label, url, color }) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: input }),
    });
    setResult(await res.json());
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col gap-3">
      <h2 className={`text-sm font-semibold uppercase tracking-wide ${color}`}>
        {label}
      </h2>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Type a query..."
          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={submit}
          disabled={loading}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg disabled:opacity-50"
        >
          {loading ? "..." : "Go"}
        </button>
      </div>

      {result && (
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden text-sm">
          <div
            className={`px-3 py-2 font-medium border-b border-slate-100 ${result.success ? "bg-emerald-50 text-emerald-800" : result.error ? "bg-red-50 text-red-800" : "bg-yellow-50 text-yellow-800"}`}
          >
            {result.success
              ? `${result.user?.name}${result.rowCount > 1 ? ` (${result.rowCount} rows)` : ""}`
              : result.error
                ? result.error
                : "No user found"}
          </div>

          {result.allUsers && (
            <div className="px-3 py-2 space-y-1 border-b border-slate-100 bg-orange-50">
              {result.allUsers.map((u) => (
                <div key={u.id} className="font-mono text-xs text-slate-700">
                  #{u.id} {u.name} &lt;{u.email}&gt;{u.admin ? " [admin]" : ""}
                </div>
              ))}
            </div>
          )}

          {result.executedSQL && (
            <pre className="px-3 py-2 bg-slate-900 text-emerald-300 text-xs font-mono whitespace-pre-wrap break-all">
              {result.executedSQL}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center pt-16 px-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          SQL Injection Demo
        </h1>
        <div className="flex gap-6">
          <QueryInput
            label="Safe (Prisma)"
            url="http://localhost:3001/api/login"
            color="text-emerald-600"
          />
          <QueryInput
            label="Unsafe (raw SQL)"
            url="http://localhost:3001/api/login?mode=vulnerable"
            color="text-red-600"
          />
        </div>
      </div>
    </div>
  );
}
