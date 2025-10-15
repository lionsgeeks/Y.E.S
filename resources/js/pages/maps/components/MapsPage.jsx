import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useForm } from "@inertiajs/react";
import Drawer from "@components/Drawer";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
// removed search UI per request
import FloatingActions from "../components/FloatingActions";
import MarkerCard from "../components/MarkerCard";
import RegistrationModal from "../components/RegistrationModal";
import OrgTypeSelectorModal from "../components/OrgTypeSelectorModal";
import { OscFormModal, BailleurFormModal, EntrepriseFormModal, AgenceFormModal, PubliqueFormModal, AcademiqueFormModal } from "../components/forms";
import TransText from "@components/TransText";
import data from "../../../../json/data.json";
import indicatif from "../../../../json/indicatif.json";

export default function MapsPage() {
    const [openCardIndex, setOpenCardIndex] = useState("");
    const [markersData, setMarkersData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedForm, setSelectedForm] = useState("");
    const [showOrgModal, setShowOrgModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [newPosition, setNewPosition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedPhoneCode, setSelectedPhoneCode] = useState("");
    const [errors, setErrors] = useState({});
    const [successOpen, setSuccessOpen] = useState(false);
    const mapRef = useRef();
    const mapContainerRef = useRef();
    const initial_position = [20.9394, 6.6111];
    const initial_zoom = 2.5;
    const [position, setPosition] = useState(initial_position);
    const [zoom, setZoom] = useState(initial_zoom);
    const [openDrawer, setOpenDrawer] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("");
    const markersRef = useRef([]);
    const [filtredData, setFiltredData] = useState([]);
    const [orgForm, setOrgForm] = useState({});
    const [bailleurForm, setBailleurForm] = useState({});
    const [entrepriseForm, setEntrepriseForm] = useState({});
    const [agenceForm, setAgenceForm] = useState({});
    const [publiqueForm, setPubliqueForm] = useState({});
    const [academiqueForm, setAcademiqueForm] = useState({});
    const [extraColumns, setExtraColumns] = useState([]);
    const [regForm, setRegForm] = useState({ name: "", email: "", code: "" });
    const storageBaseUrl = '';
    const regUseForm = useForm({ name: "", email: "", code: "" });
    const storeUseForm = useForm({ type: "", payload: {}, lat: null, lng: null });

    // set CSRF header for axios
    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    }, []);

    useEffect(() => {
        handleFilter(selectedCategory, "");
    }, [markersData, selectedCategory]);

    const handleFilter = (category, search) => {
        let filtered = [];
        if (!category) {
            filtered = Object.values(markersData).flat();
        } else {
            const key = category.includes("\\") ? category.split("\\").pop() : category;
            filtered = markersData[key] || [];
        }
        // no text search currently
        setFiltredData(filtered);
    };

    const goToMarker = (markerData) => {
        if (mapRef.current && markerData.lat && markerData?.lng) {
            mapRef.current.flyTo({ center: [markerData?.lng, markerData.lat], zoom: 7, essential: true });
        }
    };

    const handleGetLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    if (mapRef.current) {
                        mapRef.current.flyTo({ center: [longitude, latitude], zoom: 15, essential: true });
                        new mapboxgl.Marker({ color: "red" }).setLngLat([longitude, latitude]).addTo(mapRef.current);
                    }
                },
                () => setError("Impossible d'obtenir votre position")
            );
        } else {
            setError("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    };

    useEffect(() => {
        const initial = window?.__inertiaProps__?.initialPage?.props?.approved;
        if (initial && Object.keys(initial).length > 0) {
            setMarkersData(initial);
            return;
        }
        // Fallback: fetch from API that returns a flat array [{id,type,lat,lng,name,logo}]
        fetch('/approved')
            .then((r) => r.json())
            .then((arr) => {
                if (!Array.isArray(arr)) return;
                const grouped = arr.reduce((acc, item) => {
                    const type = item.type || '';
                    if (!acc[type]) acc[type] = [];
                    acc[type].push({
                        showable_type: type,
                        showable: item.showable || {
                            id: item.id,
                            name: item.name,
                            institution_name: item.name,
                            nom: item.name,
                            logo: item.logo,
                            logo_path: item.logo,
                            lat: item.lat,
                            lng: item.lng,
                        },
                    });
                    return acc;
                }, {});
                setMarkersData(grouped);
            })
            .catch(() => {})
    }, []);

    const handleSubmit = async (e, type, payload) => {
        e && e.preventDefault && e.preventDefault();
        if (storeUseForm.processing) return; // prevent double submit
        if (!newPosition?.lat || !newPosition?.lng) return;
        storeUseForm.setData({ type, payload, lat: newPosition.lat, lng: newPosition.lng });
        setLoading(true);
        storeUseForm.post('/maps', {
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => {
                // Reset all form inputs after successful submit
                setOrgForm({});
                setBailleurForm({});
                setEntrepriseForm({});
                setAgenceForm({});
                setPubliqueForm({});
                setAcademiqueForm({});
                storeUseForm.reset();
                setSelectedForm("");
                setNewPosition(null);
                // Close all modals and show the success overlay on top
                setShowModal(false);
                setShowOrgModal(false);
                setOpenCardIndex(null);
                setStep(1);
                setSuccessOpen(true);
            },
            onError: () => setError('Failed to save'),
            onFinish: () => setLoading(false),
        });
    };
    // Load schema for selected type to render extra optional fields
    const loadSchema = async (type) => {
        try {
            const r = await fetch(`/maps/schema/${type}`)
            const j = await r.json()
            const cols = Array.isArray(j.columns) ? j.columns : []
            setExtraColumns(cols)
        } catch {}
    }

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoiaGFtemFvZmsiLCJhIjoiY2x3MnN0cmRrMHJoYTJpb2N2OGQ2eTNnOSJ9.aLy9CQtGLr0A3rlH3x2TRg";
        mapRef.current = new mapboxgl.Map({
            style: "mapbox://styles/hamzaofk/cmal8x5y8014m01qo11gd0w40",
            container: mapContainerRef.current,
            center: position,
            zoom: zoom,
        });
        mapRef.current.on("move", () => {
            const mapCenter = mapRef.current?.getCenter();
            const mapZoom = mapRef.current?.getZoom();
            setPosition([mapCenter?.lng, mapCenter.lat]);
            setZoom(mapZoom);
        });
        mapRef.current.on("click", (e) => {
            const lat = e.lngLat.lat; const lng = e.lngLat?.lng;
            setNewPosition({ lat, lng }); setStep(1); setShowModal(true);
        });
        return () => { mapRef.current && mapRef.current.remove(); };
    }, []);

    useEffect(() => {
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];
        if (!mapRef.current) return;
        filtredData?.forEach((marker) => {
            if (marker.showable?.lat && marker.showable?.lng) {
                const el = document.createElement("div"); el.className = "custom-marker";
                const img = document.createElement("img");
                const logoPath = marker.showable.logo || marker.showable.logo_path;
                img.src = logoPath ? `${storageBaseUrl}/storage/${logoPath}` : "/default_logo.png";
                img.style.width = "25px"; img.style.height = "25px"; img.style.borderRadius = "50%";
                img.style.border = "2px solid white"; img.style.objectFit = "cover"; el.appendChild(img);
                const mapMarker = new mapboxgl.Marker(el).setLngLat([marker.showable?.lng, marker.showable.lat]).addTo(mapRef.current);
                markersRef.current.push(mapMarker);
                const uniqueKey = `${marker.showable_type}-${marker.showable?.id}`;
                el.addEventListener("click", (e) => { e.stopPropagation(); setShowModal(false); setOpenCardIndex(uniqueKey); });
            }
        });
        return () => { markersRef.current.forEach((m) => m.remove()); markersRef.current = []; };
    }, [filtredData]);

    return (
        <>
            <Navbar />
            {openDrawer && (<Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />)}
            <div className="w-full h-screen bg-white" id="map-container" ref={mapContainerRef}></div>
            <FloatingActions onHelp={() => setOpenDrawer(true)} onLocate={handleGetLocation} />
            <div>
                <div className="hidden" ref={mapRef} style={{ width: "100%", height: "500px" }} />
                {Object.entries(markersData)?.map(([category, markersArray]) =>
                    markersArray?.map((element) => {
                        const uniqueKey = `${element.showable_type}-${element.showable?.id}`;
                        const isOpen = openCardIndex === uniqueKey;
                        return (
                            <div key={uniqueKey}>
                                {isOpen && (<MarkerCard details={element} onClose={() => setOpenCardIndex(null)} storageBaseUrl={storageBaseUrl} />)}
                            </div>
                        );
                    })
                )}
            </div>
            <div className="tip" />
            <RegistrationModal
                open={showModal && step < 3}
                step={step}
                setStep={setStep}
                onClose={() => setShowModal(false)}
                error={error}
                loading={loading || regUseForm.processing}
                form={regForm}
                setForm={setRegForm}
                onRegister={async ({ name, email }) => {
                    if (regUseForm.processing) return; // debounce
                    if (!name || !email) return;
                    setError("");
                    regUseForm.setData({ ...regUseForm.data, name: (name||'').trim(), email: (email||'').trim().toLowerCase() });
                    setLoading(true);
                    regUseForm.post('/maps/register', {
                        preserveScroll: true,
                        preserveState: true,
                        onSuccess: () => { setError(''); setStep(2); },
                        onError: () => setError('Failed to send code'),
                        onFinish: () => setLoading(false),
                    });
                }}
                onVerify={async ({ email, code }) => {
                    if (regUseForm.processing) return; // debounce
                    if (!email || !code) return;
                    setError("");
                    regUseForm.setData({ ...regUseForm.data, email: (email||'').trim().toLowerCase(), code: (code||'').trim() });
                    setLoading(true);
                    regUseForm.post('/maps/verify', {
                        preserveScroll: true,
                        preserveState: true,
                        onSuccess: () => { setError(''); setStep(3); setRegForm((p)=>({ ...p, code: '' })); },
                        onError: () => setError('Invalid or expired code'),
                        onFinish: () => setLoading(false),
                    });
                }}
            />
            {successOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
                    <div className="bg-white rounded-lg p-6 w-[min(90vw,480px)] text-center">
                        <h3 className="text-xl font-semibold mb-2 text-green-700">Saved successfully</h3>
                        <p className="text-gray-600 mb-4">Your submission has been received.</p>
                        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => { setSuccessOpen(false); setShowOrgModal(false); setShowModal(false); setOpenCardIndex(null); setStep(1); }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
            <OrgTypeSelectorModal open={step === 3 && !showOrgModal} onClose={()=>setStep(1)} onSelect={(val)=>{ if (val) { setSelectedForm(val); setShowOrgModal(true); loadSchema(val==='osc'?'organizations':val); } }} />
            <OscFormModal open={showOrgModal && selectedForm==='osc'} formData={orgForm} setFormData={setOrgForm} onSubmit={(e)=>handleSubmit(e,'organizations',orgForm)} onClose={()=>setShowOrgModal(false)} loading={loading} extraColumns={extraColumns} />
            <BailleurFormModal open={showOrgModal && selectedForm==='bailleurs'} formData={bailleurForm} setFormData={setBailleurForm} onSubmit={(e)=>handleSubmit(e,'bailleurs',bailleurForm)} onClose={()=>setShowOrgModal(false)} loading={loading} />
            <EntrepriseFormModal open={showOrgModal && selectedForm==='entreprises'} formData={entrepriseForm} setFormData={setEntrepriseForm} onSubmit={(e)=>handleSubmit(e,'entreprises',entrepriseForm)} onClose={()=>setShowOrgModal(false)} loading={loading} />
            <AgenceFormModal open={showOrgModal && selectedForm==='agences'} formData={agenceForm} setFormData={setAgenceForm} onSubmit={(e)=>handleSubmit(e,'agences',agenceForm)} onClose={()=>setShowOrgModal(false)} loading={loading} />
            <PubliqueFormModal open={showOrgModal && selectedForm==='publiques'} formData={publiqueForm} setFormData={setPubliqueForm} onSubmit={(e)=>handleSubmit(e,'publiques',publiqueForm)} onClose={()=>setShowOrgModal(false)} loading={loading} />
            <AcademiqueFormModal open={showOrgModal && selectedForm==='academiques'} formData={academiqueForm} setFormData={setAcademiqueForm} onSubmit={(e)=>handleSubmit(e,'academiques',academiqueForm)} onClose={()=>setShowOrgModal(false)} loading={loading} />
            <Footer />
        </>
    );
}


