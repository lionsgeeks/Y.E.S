import { Head, Link, usePage, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import MiniMap from '@/components/MiniMap';
import { useState, useEffect } from 'react';

export default function AdminMapDetails() {
    const { props } = usePage();
    const item = props.item || {};
    const type = String(props.type || '').toLowerCase();
    
    const [isEditingLocation, setIsEditingLocation] = useState(false);
    const [savedLocation, setSavedLocation] = useState({
        lat: parseFloat(item.lat) || null,
        lng: parseFloat(item.lng) || null
    });
    const [previewLocation, setPreviewLocation] = useState({
        lat: parseFloat(item.lat) || null,
        lng: parseFloat(item.lng) || null
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Handle success messages from backend
    useEffect(() => {
        if (props.flash?.success) {
            setSuccessMessage(props.flash.success);
            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    }, [props.flash?.success]);

    const handleLocationUpdate = (newLat, newLng) => {
        setPreviewLocation({ lat: newLat, lng: newLng });
    };

    const saveLocation = async () => {
        if (!previewLocation.lat || !previewLocation.lng) return;
        
        setIsUpdating(true);
        setSuccessMessage(''); // Clear any previous messages
        
        router.post(`/admin/map/details/${type}/${item.id}/update-location`, {
            lat: previewLocation.lat,
            lng: previewLocation.lng
        }, {
            preserveScroll: true,
            onSuccess: () => {
                // Update saved location with preview location
                setSavedLocation({ lat: previewLocation.lat, lng: previewLocation.lng });
                setIsEditingLocation(false);
                setIsUpdating(false);
            },
            onError: (errors) => {
                console.error('Error updating location:', errors);
                setIsUpdating(false);
            },
            onFinish: () => {
                setIsUpdating(false);
            }
        });
    };

    const cancelLocationEdit = () => {
        setPreviewLocation({
            lat: savedLocation.lat,
            lng: savedLocation.lng
        });
        setIsEditingLocation(false);
    };

    // Helper function to check if a value should be displayed
    const shouldShow = (value) => {
        if (value === null || value === undefined || value === '') return false;
        if (Array.isArray(value) && value.length === 0) return false;
        if (typeof value === 'string' && value.trim() === '') return false;
        return true;
    };

    // Helper function to check if value is an array (or JSON array string)
    const isArrayValue = (value) => {
        if (Array.isArray(value)) {
            return value;
        }
        if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
            try {
                const parsed = JSON.parse(value);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            } catch (e) {
                // If parsing fails, return false
            }
        }
        return false;
    };

    // Helper function to render array as scrollable list
    const renderArrayAsList = (array) => {
        return (
            <div className="max-h-32 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                {array.map((item, index) => (
                    <div key={index} className="py-1 px-2 text-sm border-b border-gray-100 last:border-b-0">
                        {item}
                    </div>
                ))}
            </div>
        );
    };

    // Helper function to render a table row only if value exists
    const renderRow = (label, value, isLink = false) => {
        if (!shouldShow(value)) return null;
        
        const arrayValue = isArrayValue(value);
        
        return (
            <tr className="border-b border-gray-300">
                <th className="text-left p-4 bg-[#e0ecff9d] text-black align-top w-1/3">{label}</th>
                <td className="p-4">
                    {arrayValue ? (
                        renderArrayAsList(arrayValue)
                    ) : isLink ? (
                        <a href={value} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                            {value}
                        </a>
                    ) : (
                        <span className="whitespace-pre-wrap break-words">{value}</span>
                    )}
                </td>
            </tr>
        );
    };

    return (
        <AppSidebarLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Maps', href: '/admin/maps' }, { title: 'Détails', href: '#' }]}>
            <Head title="Détails" />
            <div className="p-6">
                {/* Mini Map Section */}
                {(savedLocation.lat && savedLocation.lng) && (
                    <div className="max-w-7xl mx-auto mb-6">
                        <div className="bg-white rounded-lg shadow-md p-6 relative">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Localisation</h3>
                                <div className="flex gap-2">
                                    {!isEditingLocation ? (
                                        <button
                                            onClick={() => setIsEditingLocation(true)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                        >
                                            Modifier la localisation
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={saveLocation}
                                                disabled={isUpdating}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm disabled:opacity-50"
                                            >
                                                {isUpdating ? 'Sauvegarde...' : 'Sauvegarder'}
                                            </button>
                                            <button
                                                onClick={cancelLocationEdit}
                                                disabled={isUpdating}
                                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm disabled:opacity-50"
                                            >
                                                Annuler
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            {isUpdating && (
                                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                        <span className="text-blue-600 font-medium">Mise à jour de la localisation...</span>
                                    </div>
                                </div>
                            )}
                            <MiniMap 
                                lat={savedLocation.lat} 
                                lng={savedLocation.lng} 
                                title={item.name || item.nom || item.institution_name || 'Location'}
                                height="400px"
                                width="100%"
                                zoom={8}
                                editable={isEditingLocation && !isUpdating}
                                onLocationUpdate={handleLocationUpdate}
                                previewLat={isEditingLocation ? previewLocation.lat : null}
                                previewLng={isEditingLocation ? previewLocation.lng : null}
                            />
                            {successMessage && (
                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-sm text-green-800">
                                        <strong>✓ Succès:</strong> {successMessage}
                                    </p>
                                </div>
                            )}
                            {isEditingLocation && (
                                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        <strong>Mode édition activé:</strong> Cliquez sur la carte ou glissez le marqueur pour prévisualiser la nouvelle localisation. Cliquez "Sauvegarder" pour confirmer les changements.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {type === 'organization' && (
                    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200 table-auto text-sm">
                                <tbody>
                                    <tr className="border-b border-gray-300">
                                        <th className="p-4 bg-alpha text-white w-1/3 border-r">Questions</th>
                                        <th className="p-4 bg-alpha text-white">Réponse</th>
                                    </tr>
                                    {renderRow("Nom de l'organisation", item.name)}
                                    {renderRow("Année de création", item.creation_year)}
                                    {renderRow("Statut légal", item.legal_status)}
                                    {item.legal_status === 'Autre' && renderRow("Autre statut légal", item.other_legal_status)}
                                    {renderRow("Email principal", item.main_email)}
                                    {renderRow("Téléphone", item.phone)}
                                    {renderRow("Adresse postale", item.postal_address)}
                                    {renderRow("Site web", item.website, true)}
                                    {renderRow("Pays", item.country)}
                                    {renderRow("Régions", item.regions)}
                                    {renderRow("Facebook", item.facebook_url, true)}
                                    {renderRow("Twitter", item.twitter_url, true)}
                                    {renderRow("LinkedIn", item.linkedin_url, true)}
                                    {renderRow("Instagram", item.instagram_url, true)}
                                    {renderRow("Nom du contact", item.contact_name)}
                                    {renderRow("Fonction du contact", item.contact_function)}
                                    {renderRow("Email du contact", item.contact_email)}
                                    {renderRow("Zones d'intervention", item.intervention_areas)}
                                    {renderRow("Groupes cibles", item.target_groups)}
                                    {renderRow("Bénéficiaires annuels", item.annual_beneficiaries)}
                                    {renderRow("Titre du programme", item.program_title)}
                                    {renderRow("Description du programme", item.program_description)}
                                    {renderRow("Approche méthodologique", item.methodological_approach)}
                                    {renderRow("Résultats 1", item.result1)}
                                    {renderRow("Résultats 2", item.result2)}
                                    {renderRow("Résultats 3", item.result3)}
                                    {renderRow("Partenaires techniques", item.technical_partners)}
                                    {renderRow("Partenaires financiers", item.financial_partners)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {type !== 'organization' && (
                    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
                        <div className="overflow-x-auto">
                            <pre className="text-sm overflow-auto">{JSON.stringify(item, null, 2)}</pre>
                        </div>
                    </div>
                )}
            </div>
        </AppSidebarLayout>
    );
}