export default function Topbar({ title }) {
  return (
    <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6">

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <div className="flex gap-4">

        <input
          placeholder="Search..."
          className="bg-zinc-900 px-4 py-2 rounded"
        />

      </div>

    </header>
  );
}
