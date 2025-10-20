import { Head } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { useMemo, useState } from 'react';

export default function ParticipantsIndex({ participants }) {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        if (!query) return participants;
        const q = query.toLowerCase();
        return participants.filter(p =>
            (p.name || '').toLowerCase().includes(q) ||
            (p.mail || '').toLowerCase().includes(q) ||
            (p.organisation || '').toLowerCase().includes(q) ||
            (p.country || '').toLowerCase().includes(q)
        );
    }, [query, participants]);

    return (
        <AppSidebarLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Participants', href: '/admin/participants' }]}> 
            <Head title="Participants" />

            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Name, Email, Organization or Country"
                        className="w-full max-w-lg border rounded px-3 py-2"
                    />
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                {/* <th className="px-4 py-3 text-left">Logo</th> */}
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Organization</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Country</th>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-left">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((p) => {
                                const logo = typeof p.logo === 'string' ? p.logo : '';
                                const isExternal = logo.startsWith('http://') || logo.startsWith('https://');
                                const fileName = logo ? logo.split('/').pop() : '';
                                const logoUrl = logo ? (isExternal ? logo : `/storage/${fileName}`) : '';
                                return (
                                    <tr key={p.id} className="border-t">
                                        {/* <td className="px-4 py-3">
                                            {logoUrl ? (
                                                <img
                                                    src={logoUrl}
                                                    alt={p.name || 'Logo'}
                                                    className="h-10 w-10 rounded object-cover border"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded bg-gray-100 border flex items-center justify-center text-xs text-gray-500">
                                                    N/A
                                                </div>
                                            )}
                                        </td> */}
                                        <td className="px-4 py-3">{p.name || '-'}</td>
                                        <td className="px-4 py-3">{p.organisation || '-'}</td>
                                        <td className="px-4 py-3">{p.mail || '-'}</td>
                                        <td className="px-4 py-3">{p.country || '-'}</td>
                                        <td className="px-4 py-3">{p.category || '-'}</td>
                                        <td className="px-4 py-3">{p.created_at ? new Date(p.created_at).toLocaleDateString() : '-'}</td>
                                    </tr>
                                );
                            })}
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


