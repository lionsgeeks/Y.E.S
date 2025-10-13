import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function MapView({ accessToken, styleUrl, center = [0, 0], zoom = 2, markers = [], onMapReady, onClick }) {
    const mapRef = useRef(null)
    const containerRef = useRef(null)
    const markerRefs = useRef([])
    // keep latest callbacks without re-creating the map
    const clickCbRef = useRef(onClick)
    const readyCbRef = useRef(onMapReady)

    useEffect(() => { clickCbRef.current = onClick }, [onClick])
    useEffect(() => { readyCbRef.current = onMapReady }, [onMapReady])

    useEffect(() => {
        mapboxgl.accessToken = accessToken
        if (!containerRef.current) return
        const map = new mapboxgl.Map({
            container: containerRef.current,
            style: styleUrl,
            center,
            zoom,
        })
        mapRef.current = map

        map.on('click', (e) => clickCbRef.current?.(e.lngLat))
        readyCbRef.current?.(map)

        return () => {
            markerRefs.current.forEach((m) => m.remove())
            markerRefs.current = []
            map.remove()
            mapRef.current = null
        }
    }, [accessToken, styleUrl, center[0], center[1], zoom])

    useEffect(() => {
        if (!mapRef.current) return
        markerRefs.current.forEach((m) => m.remove())
        markerRefs.current = []
        markers.forEach((m) => {
            const el = document.createElement('div')
            if (m.iconUrl) {
                const img = document.createElement('img')
                img.src = m.iconUrl
                img.style.width = '24px'
                img.style.height = '24px'
                img.style.borderRadius = '50%'
                img.style.border = '2px solid white'
                img.style.objectFit = 'cover'
                el.appendChild(img)
            }
            const marker = new mapboxgl.Marker(m.iconUrl ? el : undefined)
                .setLngLat([m.lng, m.lat])
                .addTo(mapRef.current)
            markerRefs.current.push(marker)
        })
    }, [markers])

    return <div ref={containerRef} className="fixed inset-0 h-screen w-screen" />
}


