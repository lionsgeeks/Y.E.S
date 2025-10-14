import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import MapView from '@/components/MapView'
import MarkerList from '@/components/MarkerList'
import { useEffect, useMemo, useState } from 'react'

export default function MapsIndex() {
    const [markers, setMarkers] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        fetch('/api/approved')
            .then((r) => r.json())
            .then((data) => {
                const mks = Array.isArray(data)
                    ? data.map((e) => ({
                          id: e.id,
                          lat: e.lat,
                          lng: e.lng,
                          name: e.name,
                          logo: e.logo ? `/storage/${e.logo}` : undefined,
                      }))
                    : []
                setMarkers(mks)
            })
            .catch(() => {})
    }, [])

    const filtered = useMemo(() => {
        if (!query) return markers
        return markers.filter((m) => m.name?.toLowerCase().includes(query.toLowerCase()))
    }, [markers, query])

    return (
        <div className="relative min-h-screen">
            <Navbar />
            <MapView
                accessToken="pk.eyJ1IjoiaGFtemFvZmsiLCJhIjoiY2x3MnN0cmRrMHJoYTJpb2N2OGQ2eTNnOSJ9.aLy9CQtGLr0A3rlH3x2TRg"
                styleUrl="mapbox://styles/hamzaofk/cmal8x5y8014m01qo11gd0w40"
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


