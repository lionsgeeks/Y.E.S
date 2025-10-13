import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
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
    const [regForm, setRegForm] = useState({ name: "", email: "", code: "" });
    const url = "https://management.youthempowermentsummit.africa";

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
        axios.post(url + "/api/approved").then(r => setMarkersData(r.data)).catch(() => {});
    }, []);

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
                img.src = logoPath ? url + `/storage/${logoPath}` : "/default_logo.png";
                img.style.width = "25px"; img.style.height = "25px"; img.style.borderRadius = "50%";
                img.style.border = "2px solid white"; img.style.objectFit = "cover"; el.appendChild(img);
                const mapMarker = new mapboxgl.Marker(el).setLngLat([marker.showable?.lng, marker.showable.lat]).addTo(mapRef.current);
                markersRef.current.push(mapMarker);
                const uniqueKey = `${marker.showable_type}-${marker.showable?.id}`;
                el.addEventListener("click", (e) => { e.stopPropagation(); setShowModal(false); setOpenCardIndex(uniqueKey); });
            }
        });
        return () => { markersRef.current.forEach((m) => m.remove()); markersRef.current = []; };
    }, [filtredData, url]);

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
                                {isOpen && (<MarkerCard details={element} onClose={() => setOpenCardIndex(null)} storageBaseUrl={url} />)}
                            </div>
                        );
                    })
                )}
            </div>
            <div className="tip" />
            <RegistrationModal open={showModal && step < 3} step={step} setStep={setStep} onClose={() => setShowModal(false)} error={error} loading={loading} form={regForm} setForm={setRegForm} />
            <OrgTypeSelectorModal open={step === 3 && !showOrgModal} onClose={()=>setStep(1)} onSelect={(val)=>{ if (val) { setSelectedForm(val); setShowOrgModal(true); } }} />
            <OscFormModal open={showOrgModal && selectedForm==='osc'} formData={orgForm} setFormData={setOrgForm} onSubmit={(e)=>{e.preventDefault();}} onClose={()=>setShowOrgModal(false)} loading={loading} />
            <BailleurFormModal open={showOrgModal && selectedForm==='bailleurs'} formData={bailleurForm} setFormData={setBailleurForm} onSubmit={(e)=>{e.preventDefault();}} onClose={()=>setShowOrgModal(false)} loading={loading} />
            <EntrepriseFormModal open={showOrgModal && selectedForm==='entreprises'} formData={entrepriseForm} setFormData={setEntrepriseForm} onSubmit={(e)=>{e.preventDefault();}} onClose={()=>setShowOrgModal(false)} loading={loading} />
            <AgenceFormModal open={showOrgModal && selectedForm==='agences'} formData={agenceForm} setFormData={setAgenceForm} onSubmit={(e)=>{e.preventDefault();}} onClose={()=>setShowOrgModal(false)} loading={loading} />
            <PubliqueFormModal open={showOrgModal && selectedForm==='publiques'} formData={publiqueForm} setFormData={setPubliqueForm} onSubmit={(e)=>{e.preventDefault();}} onClose={()=>setShowOrgModal(false)} loading={loading} />
            <AcademiqueFormModal open={showOrgModal && selectedForm==='academiques'} formData={academiqueForm} setFormData={setAcademiqueForm} onSubmit={(e)=>{e.preventDefault();}} onClose={()=>setShowOrgModal(false)} loading={loading} />
            <Footer />
        </>
    );
}


