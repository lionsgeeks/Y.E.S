import { Head, Link, usePage } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';

export default function AdminMapDetails() {
    const { props } = usePage();
    const item = props.item || {};
    const type = String(props.type || '').toLowerCase();

    return (
        <AppSidebarLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Maps', href: '/admin/maps' }, { title: 'Détails', href: '#' }]}>
            <Head title="Détails" />
            <div className="p-6">
                {type === 'organization' && (
                    <Table>
                        <Row q="Nom de l'organisation" v={item.name} />
                        <Row q="Année de création" v={item.creation_year} />
                        <Row q="Statut légal" v={item.legal_status} />
                        {item.legal_status === 'Autre' && <Row q="Autre statut légal" v={item.other_legal_status} />}
                        <Row q="Email principal" v={item.main_email} />
                        <Row q="Téléphone" v={item.phone} />
                        <Row q="Adresse postale" v={item.postal_address} />
                        <Row q="Site web" v={<A href={item.website} />} />
                        <Row q="Pays" v={item.country} />
                        <Row q="Régions" v={item.regions} />
                        <Row q="Facebook" v={<A href={item.facebook_url} />} />
                        <Row q="Twitter" v={<A href={item.twitter_url} />} />
                        <Row q="LinkedIn" v={<A href={item.linkedin_url} />} />
                        <Row q="Instagram" v={<A href={item.instagram_url} />} />
                        <Row q="Nom du contact" v={item.contact_name} />
                        <Row q="Fonction du contact" v={item.contact_function} />
                        <Row q="Email du contact" v={item.contact_email} />
                        <Row q="Zones d'intervention" v={item.intervention_areas} />
                        <Row q="Groupes cibles" v={item.target_groups} />
                        <Row q="Bénéficiaires annuels" v={item.annual_beneficiaries} />
                        <Row q="Titre du programme" v={item.program_title} />
                        <Row q="Description du programme" v={item.program_description} />
                        <Row q="Approche méthodologique" v={item.methodological_approach} />
                        <Row q="Résultats 1" v={item.result1} />
                        <Row q="Résultats 2" v={item.result2} />
                        <Row q="Résultats 3" v={item.result3} />
                        <Row q="Partenaires techniques" v={item.technical_partners} />
                        <Row q="Partenaires financiers" v={item.financial_partners} />
                    </Table>
                )}
                {type !== 'organization' && (
                    <pre className="bg-white p-6 rounded-xl border text-sm overflow-auto">{JSON.stringify(item, null, 2)}</pre>
                )}
            </div>
        </AppSidebarLayout>
    );
}

function Table({ children }) {
    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full border border-gray-200 table-auto text-sm">
                <tbody>
                    <tr className="border-b border-gray-300">
                        <th className="p-4 bg-alpha text-white w-1/3 border-r">Questions</th>
                        <th className="p-4 bg-alpha text-white">Réponse Type</th>
                    </tr>
                    {children}
                </tbody>
            </table>
        </div>
    );
}

function Row({ q, v }) {
    return (
        <tr className="border-b border-gray-300">
            <th className="text-left p-4 bg-[#e0ecff9d] text-black">{q}</th>
            <td className="p-4">{v ?? '—'}</td>
        </tr>
    );
}

function A({ href }) {
    if (!href) return '—';
    return (
        <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{href}</a>
    );
}


