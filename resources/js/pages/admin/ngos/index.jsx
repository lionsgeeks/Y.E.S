import { Head, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function NgosIndex({ formulaires }) {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        if (!query) return formulaires;
        const q = query.toLowerCase();
        return formulaires.filter(f =>
            (f.name_organization || '').toLowerCase().includes(q) ||
            (f.name_representative || '').toLowerCase().includes(q) ||
            (f.email_representative || '').toLowerCase().includes(q) ||
            (f.country_registration || '').toLowerCase().includes(q)
        );
    }, [query, formulaires]);

    const toggleInvite = (id) => {
        router.post(`/admin/ngos/${id}/toggle-invite`, {}, { preserveScroll: true });
    };
    const toggleInviteApp = (id) => {
        router.post(`/admin/ngos/${id}/toggle-invite-app`, {}, { preserveScroll: true });
    };

    return (
        <AppSidebarLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'NGOs', href: '/admin/ngos' }]}>
            <Head title="NGOs" />

            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Organization, Name, Email or Country"
                        className="w-full max-w-lg border rounded px-3 py-2"
                    />
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left">Organization</th>
                                <th className="px-4 py-3 text-left">Representative</th>
                                <th className="px-4 py-3 text-left">Country</th>
                                <th className="px-4 py-3 text-left">Apply Date</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                                <th className="px-4 py-3 text-left">Invite To Yes Mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((f) => (
                                <tr key={f.id} className="border-t">
                                    <td className="px-4 py-3">
                                        <a className="text-blue-600 hover:underline" href={`/admin/ngos/${f.id}`}>{f.name_organization || '-'}</a>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{f.name_representative || '-'}</div>
                                        <div className="text-gray-500 text-xs">{f.email_representative || ''}</div>
                                    </td>
                                    <td className="px-4 py-3">{f.country_registration || '-'}</td>
                                    <td className="px-4 py-3">{new Date(f.created_at).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center rounded bg-gray-100 px-3 py-1 text-gray-700">
                                            {f.is_invited ? 'Invited' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Button onClick={() => toggleInvite(f.id)} variant="outline">
                                                {f.is_invited ? 'Uninvite' : 'Invite'}
                                            </Button>
                                            <Button onClick={() => toggleInviteApp(f.id)}>
                                                {f.is_invited_app ? 'Invited' : 'Invite'}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>No results</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppSidebarLayout>
    );
}


