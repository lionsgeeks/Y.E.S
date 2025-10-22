import { Head, Link, usePage } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import MiniMap from '@/components/MiniMap';

export default function AdminMapDetails() {
    const { props } = usePage();
    const item = props.item || {};
    const type = String(props.type || '').toLowerCase();

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
                {(item.lat && item.lng) && (
                    <div className="max-w-7xl mx-auto mb-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Localisation</h3>
                            <MiniMap 
                                lat={parseFloat(item.lat)} 
                                lng={parseFloat(item.lng)} 
                                title={item.name || item.nom || item.institution_name || 'Location'}
                                height="400px"
                                width="100%"
                                zoom={8}
                            />
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