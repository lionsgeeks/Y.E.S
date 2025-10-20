import { Head, Link } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';

const Row = ({ label, value }) => {
    const isUploadPath = typeof value === 'string' && /^uploads\//.test(value);
    const filename = isUploadPath ? value.split('/').pop() : null;
    return (
        <div className="grid grid-cols-3 gap-4 py-2 border-b last:border-none">
            <div className="text-gray-500 text-sm col-span-1">{label}</div>
            <div className="col-span-2 break-words">
                {isUploadPath ? (
                    <a className="text-blue-600 hover:underline" href={`/storage/${value}`} target="_blank" rel="noreferrer">{filename}</a>
                ) : (
                    value ?? '-'
                )}
            </div>
        </div>
    );
};

export default function NgoShow({ formulaire }) {
    return (
        <AppSidebarLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'NGOs', href: '/admin/ngos' }, { title: formulaire.name_organization || 'Details', href: '#' }]}>
            <Head title={`NGO - ${formulaire.name_organization || 'Details'}`} />
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">{formulaire.name_organization || 'NGO Details'}</h1>
                    <Link href="/admin/ngos" className="text-sm text-blue-600 hover:underline">Back to list</Link>
                </div>

                <div className="bg-white rounded-lg border p-6 grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-lg font-medium mb-2">Organization</h2>
                        <div className="divide-y">
                            <Row label="Organization" value={formulaire.name_organization} />
                            <Row label="Years of existence" value={formulaire.years_existence} />
                            <Row label="Country of registration" value={formulaire.country_registration} />
                            <Row label="Employees" value={formulaire.num_employees} />
                            <Row label="Volunteers" value={formulaire.num_volunteers} />
                            <Row label="Beneficiaries" value={formulaire.beneficiaries} />
                            <Row label="Countries of intervention" value={formulaire.country_intervention} />
                            <Row label="Areas of intervention" value={formulaire.area_intervention} />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium mb-2">Contacts</h2>
                        <div className="divide-y">
                            <Row label="Representative" value={`${formulaire.name_representative || ''}${formulaire.position_representative ? ' - ' + formulaire.position_representative : ''}`} />
                            <Row label="Representative Phone" value={formulaire.phone_representative} />
                            <Row label="Representative Email" value={formulaire.email_representative} />
                            <Row label="Representative LinkedIn" value={formulaire.linkedin_representative} />
                            <Row label="Tenderer" value={`${formulaire.name_tenderer || ''}${formulaire.position_tenderer ? ' - ' + formulaire.position_tenderer : ''}`} />
                            <Row label="Tenderer Phone" value={formulaire.phone_tenderer} />
                            <Row label="Tenderer Email" value={formulaire.email_tenderer} />
                            <Row label="Tenderer LinkedIn" value={formulaire.linkedin_tenderer} />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h2 className="text-lg font-medium mb-2">Project</h2>
                        <div className="divide-y">
                            <Row label="Project description" value={formulaire.project_description} />
                            <Row label="Funding requirements" value={formulaire.funding_requirements} />
                            <Row label="Approached funders" value={formulaire.approached_funders} />
                            <Row label="NEET project example" value={formulaire.neet_project_example} />
                            <Row label="Project reach" value={formulaire.project_reach} />
                            <Row label="Project impact" value={formulaire.project_impact} />
                            <Row label="Project duration" value={formulaire.project_duration} />
                            <Row label="Project area" value={formulaire.project_area} />
                            <Row label="Project evaluation" value={formulaire.project_evaluation} />
                            <Row label="Other projects" value={formulaire.other_projects} />
                            <Row label="Sources of funding" value={formulaire.sources_funding} />
                            <Row label="Themes of intervention" value={formulaire.themes_intervention || formulaire.intervention_themes} />
                            <Row label="Partners" value={formulaire.partners} />
                            <Row label="Project financing" value={formulaire.project_financing} />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h2 className="text-lg font-medium mb-2">Uploaded files</h2>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <FileLink label="Legal statutes" path={formulaire.legal_statutes} />
                            <FileLink label="Internal regulations" path={formulaire.internal_regulations} />
                            <FileLink label="Presentation" path={formulaire.presentation} />
                            <FileLink label="Project description file" path={formulaire.project_description} />
                            <FileLink label="Funding requirements file" path={formulaire.funding_requirements} />
                            <FileLink label="Project evaluation" path={formulaire.project_evaluation} />
                            <FileLink label="Other projects" path={formulaire.other_projects} />
                        </div>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}

const FileLink = ({ label, path }) => {
    if (!path) return (
        <div className="text-gray-500">{label}: —</div>
    );
    const filename = String(path).split('/').pop();
    return (
        <div>
            {label}: <a className="text-blue-600 hover:underline" href={`/storage/${path}`} target="_blank" rel="noreferrer">{filename}</a>
        </div>
    );
};



