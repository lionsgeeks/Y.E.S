import React from "react";
import { Link } from "@inertiajs/react";

const MarkerCard = ({ details, onClose }) => {
    // Normalize values for display (arrays/JSON -> comma list, empties -> dash)
    const toArray = (val) => {
        if (Array.isArray(val)) return val;
        if (typeof val === 'string') {
            const s = val.trim();
            if (!s) return [];
            // try JSON array
            if ((s.startsWith('[') && s.endsWith(']'))) {
                try { const parsed = JSON.parse(s); if (Array.isArray(parsed)) return parsed; } catch {}
            }
            // CSV fallback
            if (s.includes(',')) return s.split(',').map((x) => x.trim()).filter(Boolean);
            return [s];
        }
        return [];
    };

    const fmt = (val) => {
        if (val === undefined || val === null) return '—'
        if (typeof val === 'boolean') return val ? 'Yes' : 'No'
        if (Array.isArray(val)) return val.filter(Boolean).join(', ')
        if (typeof val === 'string') {
            const s = val.trim()
            if (!s) return '—'
            // try parse JSON array
            if ((s.startsWith('[') && s.endsWith(']')) || (s.startsWith('{') && s.endsWith('}'))) {
                try {
                    const parsed = JSON.parse(s)
                    if (Array.isArray(parsed)) return parsed.filter(Boolean).join(', ')
                } catch {}
            }
            return s
        }
        return String(val)
    }

    const renderContent = () => {
        switch (details.showable_type) {
            case "App\\Models\\Organization":
                return (
                    <div className="flex flex-col sm:flex-row items-center bg-white/90  shadow-xl rounded-2xl p-6 gap-6 w-[92vw] sm:w-[780px] mx-auto mt-12 md:mt-0 relative">
                        <div className="w-[70%]">
                            <div className="w-80 h-52 rounded-md overflow-hidden flex items-center justify-center bg-white">
                                <img
                                    src={`/storage/${details.showable.logo}`}
                                    alt={`${details.showable.name} logo`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col w-full sm:w-2/3 justify-between gap-2 text-sm text-gray-800 px-1 break-words">
                            <p className="font-bold text-lg text-beta">{fmt(details.showable.name)}</p>
                            <p><span className="font-medium text-gray-500">Statut légal:</span> {fmt(details.showable.legal_status)}</p>
                            <p className="whitespace-normal"><span className="font-medium text-gray-500 ">Pays d'interventions :</span> {fmt(toArray(details.showable.intervention_areas || details.showable.regions || details.showable.country))}</p>
                            <p className="whitespace-normal"><span className="font-medium text-gray-500">Groupes Cibles :</span> {fmt(toArray(details.showable.target_groups))}</p>
                            <p className="whitespace-normal"><span className="font-medium text-gray-500">Bonnes Pratiques :</span> {fmt(details.showable.program_title || details.showable.methodological_approach || details.showable.program_description)}</p>
                            <div className="pt-2">
                                <Link href={`/map/details/organization/${details.showable.id}`} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#b09417] text-white hover:brightness-110 text-xs">More details</Link>
                            </div>
                        </div>
                    </div>
                );
            case "App\\Models\\Bailleur":
                return (
                    <div className="flex flex-col sm:flex-row items-center bg-white/90  shadow-xl rounded-2xl p-6 gap-6 w-[92vw] sm:w-[780px] mx-auto mt-12 md:mt-0 relative">
                        <div className="w-[70%]">
                            <img
                                src={`/storage/${details.showable.logo_path}`}
                                alt={`${details.showable.nom} logo_path`}
                                className="w-80 h-52 object-cover rounded-md"
                            />
                        </div>
                        <div className="flex flex-col w-full gap-2 text-sm text-gray-800 break-words">
                            <p className="font-bold text-lg text-beta">{details.showable.nom}</p>
                            <p><span className="font-medium text-gray-500">Email:</span> {details.showable.email_contact}</p>
                            <p><span className="font-medium text-gray-500">Type:</span> {details.showable.type_institution}</p>
                            <p><span className="font-medium text-gray-500">Pays:</span> {details.showable.pays_origine}</p>
                            <p className="truncate w-80"><span className="font-medium text-gray-500">couverture geographique: </span>{Array.isArray(details.showable.couverture_geographique) ? details.showable.couverture_geographique.join(", ") : details.showable.couverture_geographique || ""}</p>
                            <p className="truncate w-80"><span className="font-medium text-gray-500">Bonnes Pratiques :</span> {details.showable.priorites_thematiques}</p>

                            <div className="pt-2">
                                <Link href={`/map/details/bailleur/${details.showable.id}`} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#b09417] text-white hover:brightness-110 text-xs">More details</Link>
                            </div>
                        </div>
                    </div>
                );
            case "App\\Models\\Entreprise":
                return (
                    <div className="flex flex-col sm:flex-row items-center bg-white/90  shadow-xl rounded-2xl p-6 gap-6 w-[92vw] sm:w-[780px] mx-auto mt-12 md:mt-0 relative">
                        <div className="w-[70%]">
                            <img src={ `/storage/${details.showable.logo}`} alt={`${details.showable.nom} logo`} className="w-80 h-52 object-cover rounded-md" />
                        </div>
                        <div className="flex flex-col w-full gap-2 text-sm text-gray-800 break-words">
                            <p className="font-bold text-lg text-beta">{details.showable.nom}</p>
                            <p><span className="font-medium text-gray-500">Email:</span> {details.showable.email_contact}</p>
                            <p><span className="font-medium text-gray-500">Secteur :</span> {details.showable.secteur}</p>
                            <p><span className="font-medium text-gray-500">Taille de l'entreprise:</span> {details.showable.taille}</p>
                            <p><span className="font-medium text-gray-500">Site web:</span> <a href={details.showable.site_web} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.showable.website}</a></p>
                            <p><span className="font-medium text-gray-500">Pays:</span> {details.showable.pays_siege}</p>

                            <div className="pt-2">
                                <Link href={`/map/details/entreprise/${details.showable.id}`} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#b09417] text-white hover:brightness-110 text-xs">More details</Link>
                            </div>
                        </div>
                    </div>
                );
            case "App\\Models\\Agence":
                return (
                    <div className="flex flex-col sm:flex-row items-center bg-white/90  shadow-xl rounded-2xl p-6 gap-6 w-[92vw] sm:w-[780px] mx-auto mt-12 md:mt-0 relative">
                        <div className="w-[70%]">
                            <img src={`/storage/${details.showable.logo}`} alt={`${details.showable.nom} logo`} className="w-80 h-52 object-cover rounded-md" />
                        </div>
                        <div className="flex flex-col w-full gap-2 text-sm text-gray-800 break-words">
                            <p className="font-bold text-lg text-beta">{details.showable.nom}</p>
                            <p><span className="font-medium text-gray-500">Email:</span> {details.showable.email_institutionnel}</p>
                            <p><span className="font-medium text-gray-500">Type:</span> {details.showable.type_organisation}</p>

                            <div className="pt-2">
                                <Link href={`/map/details/agence/${details.showable.id}`} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#b09417] text-white hover:brightness-110 text-xs">More details</Link>
                            </div>
                        </div>
                    </div>
                );
            case "App\\Models\\Publique":
                return (
                    <div className="flex flex-col sm:flex-row items-center bg-white/90  shadow-xl rounded-2xl p-6 gap-6 w-[92vw] sm:w-[780px] mx-auto mt-12 md:mt-0 relative">
                        <div className="w-[70%]">
                            <img src={storageBaseUrl + `/storage/${details.showable.logo_path}`} alt={`${details.showable.institution_name} logo`} className="w-80 h-52 object-cover rounded-md" />
                        </div>
                        <div className="flex flex-col w-full gap-2 text-sm text-gray-800 break-words">
                            <p className="font-bold text-lg text-beta">{details.showable.institution_name}</p>
                            <p><span className="font-medium text-gray-500">Email:</span> {details.showable.email}</p>
                            <p><span className="font-medium text-gray-500">Type:</span> {details.showable.institution_type}</p>
                            <p><span className="font-medium text-gray-500">Pays:</span> {details.showable.country}</p>

                            <div className="pt-2">
                                <Link href={`/map/details/publique/${details.showable.id}`} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#b09417] text-white hover:brightness-110 text-xs">More details</Link>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div>Format non supporté</div>;
        }
    };

    return (
        <div className="fixed inset-0 md:flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="w-full md:w-auto px-4 md:px-0">
                <div className="relative">
                    <button onClick={onClose} className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center text-beta shadow hover:text-red-600 z-50">×</button>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default MarkerCard;



