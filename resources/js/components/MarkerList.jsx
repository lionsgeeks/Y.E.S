export default function MarkerList({ items, onSelect, onSearch }) {
    return (
        <div className="space-y-2">
            <input
                className="w-full rounded border px-3 py-2"
                placeholder="Search..."
                onChange={(e) => onSearch?.(e.target.value)}
            />
            <ul className="divide-y rounded border">
                {items.map((it) => (
                    <li key={it.id} className="flex items-center justify-between px-3 py-2">
                        <span className="truncate">{it.name}</span>
                        <button className="text-blue-600 underline" onClick={() => onSelect?.(it)}>
                            View
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}


