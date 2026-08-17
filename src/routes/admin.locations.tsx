import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createLocationId,
  isLocationStorageEphemeral,
  listLocations,
  resetLocations,
  saveLocations,
  type StoreLocation,
} from "@/lib/locations";

export const Route = createFileRoute("/admin/locations")({
  component: LocationsAdmin,
});

const EMPTY: StoreLocation = { id: "", name: "", address: "", lat: 0, lng: 0, note: "" };

function LocationsAdmin() {
  const [items, setItems] = useState<StoreLocation[]>([]);
  const [draft, setDraft] = useState<StoreLocation>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    listLocations().then(setItems);
  }, []);

  const persist = async (next: StoreLocation[]) => {
    setItems(next);
    await saveLocations(next);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim() || Number.isNaN(draft.lat) || Number.isNaN(draft.lng)) {
      toast.error("Name and valid coordinates are required");
      return;
    }
    if (editingId) {
      await persist(items.map((i) => (i.id === editingId ? { ...draft, id: editingId } : i)));
      toast.success("Location updated");
    } else {
      await persist([...items, { ...draft, id: createLocationId() }]);
      toast.success("Location added");
    }
    setDraft(EMPTY);
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-medium">Store locations</h1>
        <p className="text-sm text-brand-roast/60 mt-2">
          These markers appear on the public map. Customers can only view them.
          {isLocationStorageEphemeral() && (
            <>
              {" "}
              <strong className="text-brand-roast">
                Changes are stored on this device only until a database is connected.
              </strong>
            </>
          )}
        </p>
      </div>

      <form onSubmit={submit} className="bg-white rounded-2xl p-6 ring-1 ring-black/5 grid gap-4 sm:grid-cols-2">
        <Field label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
        <Field label="Address" value={draft.address} onChange={(v) => setDraft({ ...draft, address: v })} />
        <Field
          label="Latitude"
          value={String(draft.lat)}
          onChange={(v) => setDraft({ ...draft, lat: Number(v) })}
        />
        <Field
          label="Longitude"
          value={String(draft.lng)}
          onChange={(v) => setDraft({ ...draft, lng: Number(v) })}
        />
        <div className="sm:col-span-2">
          <Field label="Note (optional)" value={draft.note ?? ""} onChange={(v) => setDraft({ ...draft, note: v })} />
        </div>
        <div className="sm:col-span-2 flex gap-3">
          <button className="bg-brand-toast text-white px-6 py-3 rounded-full font-semibold text-sm">
            {editingId ? "Save changes" : "Add location"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setDraft(EMPTY);
                setEditingId(null);
              }}
              className="px-6 py-3 rounded-full text-sm font-semibold border border-brand-roast/20"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {items.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl p-5 ring-1 ring-black/5 flex flex-wrap gap-4 items-center justify-between"
          >
            <div className="min-w-0">
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-brand-roast/60">{s.address}</p>
              <p className="text-xs text-brand-roast/40 mt-1">
                {s.lat}, {s.lng}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => {
                  setDraft(s);
                  setEditingId(s.id);
                }}
                className="text-sm px-4 py-2 rounded-full border border-brand-roast/20"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  await persist(items.filter((i) => i.id !== s.id));
                  toast.success("Location removed");
                }}
                className="text-sm px-4 py-2 rounded-full border border-red-300 text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={async () => {
          await resetLocations();
          setItems(await listLocations());
          toast.success("Reset to defaults");
        }}
        className="text-sm text-brand-roast/60 underline"
      >
        Reset to coded defaults
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-brand-roast/50 mb-1">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-brand-roast/15 rounded-xl px-4 py-2.5 text-sm"
      />
    </label>
  );
}
