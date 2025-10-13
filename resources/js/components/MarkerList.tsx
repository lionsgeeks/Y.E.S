type Item = {
    id: string | number
    name: string
    lat?: number
    lng?: number
}

type Props = {
    items: Item[]
    onSelect?: (item: Item) => void
    onSearch?: (query: string) => void
}

export default function MarkerList({ items, onSelect, onSearch }: Props) {
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



