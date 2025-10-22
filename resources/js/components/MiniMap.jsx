import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function MiniMap({ 
    lat, 
    lng, 
    title = "Location", 
    height = "300px",
    width = "100%",
    zoom = 10 
}) {
    const mapRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        if (!lat || !lng) return

        mapboxgl.accessToken = "pk.eyJ1IjoiaGFtemFvZmsiLCJhIjoiY2x3MnN0cmRrMHJoYTJpb2N2OGQ2eTNnOSJ9.aLy9CQtGLr0A3rlH3x2TRg"
        
        if (!containerRef.current) return

        const map = new mapboxgl.Map({
            container: containerRef.current,
            style: "mapbox://styles/hamzaofk/cmal8x5y8014m01qo11gd0w40",
            center: [lng, lat],
            zoom: zoom,
            interactive: true,
            attributionControl: false
        })

        mapRef.current = map

        // Add a marker for the location
        new mapboxgl.Marker({
            color: '#3B82F6', // Blue color
            scale: 1.2
        })
        .setLngLat([lng, lat])
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<div class="p-2"><strong>${title}</strong><br/>Lat: ${lat.toFixed(6)}<br/>Lng: ${lng.toFixed(6)}</div>`)
        )
        .addTo(map)

        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [lat, lng, title, zoom])

    if (!lat || !lng) {
        return (
            <div 
                className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg"
                style={{ height, width }}
            >
                <div className="text-gray-500 text-sm">
                    No location data available
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            <div 
                ref={containerRef} 
                className="rounded-lg border border-gray-300 overflow-hidden"
                style={{ height, width }}
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow-sm text-xs text-gray-600">
                {title}
            </div>
        </div>
    )
}
