import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import MapView from '@/components/MapView'
import MarkerList from '@/components/MarkerList'
import { useEffect, useMemo, useState } from 'react'
import { usePage } from '@inertiajs/react'

export default function MapsIndex() {
    const [markers, setMarkers] = useState([])
    const [query, setQuery] = useState('')
    const { props } = usePage()

    useEffect(() => {
        const grouped = props?.approved || {}
        const flat = Object.values(grouped).flat()
        const mks = flat
            .filter((e) => e?.showable?.lat && e?.showable?.lng)
            .map((e) => ({
                id: `${e.showable_type}-${e.showable.id}`,
                lat: e.showable.lat,
                lng: e.showable.lng,
                name:
                    e.showable_type === 'App\\Models\\Organization'
                        ? e.showable.name
                        : e.showable_type === 'App\\Models\\Publique'
                        ? e.showable.institution_name
                        : e.showable.nom,
                logo: (() => {
                    const raw = e.showable.logo || e.showable.logo_path
                    return raw ? `/storage/${String(raw).split('/').pop()}` : undefined
                })(),
            }))
        setMarkers(mks)
    }, [props?.approved])

    const filtered = useMemo(() => {
        if (!query) return markers
        return markers.filter((m) => m.name?.toLowerCase().includes(query.toLowerCase()))
    }, [markers, query])

    return (
        <div className="relative min-h-screen">
            <Navbar />
            <MapView
                accessToken="pk.eyJ1IjoiYm9qb2F5bWFuIiwiYSI6ImNtZ3RnaTI4MjAzcXoybnNoaDNkbDQ1cncifQ.zchikKt-8FjepLWp3AcZWg"
                styleUrl="mapbox://styles/bojoayman/cmgtvy1fz002201qx0bk4gutj"
                center={[20.9394, 6.6111]}
                zoom={2.5}
                markers={filtered.map((m) => ({ id: m.id, lat: m.lat, lng: m.lng, iconUrl: m.logo }))}
            />
            <div className="absolute top-16 left-2 z-20 w-[95%] md:w-[40%] flex gap-3">
                <MarkerList
                    items={filtered.map((m) => ({ id: m.id, name: m.name, lat: m.lat, lng: m.lng }))}
                    onSearch={setQuery}
                />
            </div>
            <Footer />
        </div>
    )
}


