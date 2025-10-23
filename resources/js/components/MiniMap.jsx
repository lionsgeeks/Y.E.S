import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function MiniMap({ 
    lat, 
    lng, 
    title = "Location", 
    height = "300px",
    width = "100%",
    zoom = 10,
    editable = false,
    onLocationUpdate = null,
    previewLat = null,
    previewLng = null
}) {
    const mapRef = useRef(null)
    const containerRef = useRef(null)
    const markerRef = useRef(null)

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
        const marker = new mapboxgl.Marker({
            color: editable ? '#EF4444' : '#3B82F6', // Red if editable, blue if not
            scale: 1.2,
            draggable: editable
        })
        .setLngLat([lng, lat])
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<div class="p-2"><strong>${title}</strong><br/>Lat: ${lat.toFixed(6)}<br/>Lng: ${lng.toFixed(6)}${editable ? '<br/><small class="text-gray-500">Click map to preview new location</small>' : ''}</div>`)
        )
        .addTo(map)

        markerRef.current = marker

        // Handle map clicks for location preview (not immediate update)
        if (editable && onLocationUpdate) {
            const handleMapClick = (e) => {
                console.log('Map clicked, updating marker position')
                const newLat = e.lngLat.lat
                const newLng = e.lngLat.lng
                marker.setLngLat([newLng, newLat])
                onLocationUpdate(newLat, newLng)
            }

            const handleMarkerDrag = () => {
                const newLat = marker.getLngLat().lat
                const newLng = marker.getLngLat().lng
                onLocationUpdate(newLat, newLng)
            }

            map.on('click', handleMapClick)
            marker.on('dragend', handleMarkerDrag)

            // Store cleanup functions
            mapRef.current._clickHandler = handleMapClick
            mapRef.current._dragHandler = handleMarkerDrag
        }

        return () => {
            if (mapRef.current) {
                // Remove event listeners if they exist
                if (mapRef.current._clickHandler) {
                    mapRef.current.off('click', mapRef.current._clickHandler)
                }
                if (markerRef.current && mapRef.current._dragHandler) {
                    markerRef.current.off('dragend', mapRef.current._dragHandler)
                }
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [lat, lng, title, zoom, editable, onLocationUpdate])

    // Separate effect to handle only marker position updates without re-rendering the map
    useEffect(() => {
        if (markerRef.current && previewLat !== null && previewLng !== null) {
            console.log('Updating marker to preview position:', { previewLat, previewLng })
            markerRef.current.setLngLat([previewLng, previewLat])
            // Also update the popup content
            const popup = markerRef.current.getPopup()
            if (popup) {
                popup.setHTML(`<div class="p-2"><strong>${title}</strong><br/>Lat: ${previewLat.toFixed(6)}<br/>Lng: ${previewLng.toFixed(6)}${editable ? '<br/><small class="text-gray-500">Click map to preview new location</small>' : ''}</div>`)
            }
        }
    }, [previewLat, previewLng, title, editable])

    // Update marker position when preview coordinates change
    useEffect(() => {
        if (markerRef.current && previewLat !== null && previewLng !== null) {
            console.log('Updating marker to preview position:', { previewLat, previewLng })
            markerRef.current.setLngLat([previewLng, previewLat])
            // Also update the popup content
            const popup = markerRef.current.getPopup()
            if (popup) {
                popup.setHTML(`<div class="p-2"><strong>${title}</strong><br/>Lat: ${previewLat.toFixed(6)}<br/>Lng: ${previewLng.toFixed(6)}${editable ? '<br/><small class="text-gray-500">Click map to preview new location</small>' : ''}</div>`)
            }
        }
    }, [previewLat, previewLng, title, editable])

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
