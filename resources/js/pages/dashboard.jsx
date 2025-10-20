import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage, Link } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage();
    const stats = props.stats || {};
    const recent = props.recent || {};
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: 'Users', value: stats.users, href: '/admin/users' },
                        { label: 'Organizations', value: stats.organizations, href: '/admin/ngos' },
                        { label: 'Approved markers', value: stats.approved_markers, href: '/maps' },
                        { label: 'Pending markers', value: stats.pending_markers, href: '/maps' },
                        { label: 'Bailleurs', value: stats.bailleurs, href: '/admin/maps?type=bailleur' },
                        { label: 'Entreprises', value: stats.entreprises, href: '/admin/maps?type=entreprise' },
                        { label: 'Agences', value: stats.agences, href: '/admin/maps?type=agence' },
                        { label: 'Institutions Publiques', value: stats.publiques, href: '/admin/maps?type=publique' },
                    ].map((c, i) => (
                        <Link key={i} href={c.href || '#'} className="rounded-xl border bg-white p-4 shadow-sm hover:shadow transition">
                            <p className="text-xs text-gray-500">{c.label}</p>
                            <p className="mt-1 text-2xl font-semibold">{c.value ?? 0}</p>
                        </Link>
                    ))}
                </section>

                <section className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border bg-white">
                        <div className="flex items-center justify-between border-b p-4">
                            <h3 className="font-semibold">Recent Messages</h3>
                            <Link href="/admin/messages" className="text-sm text-blue-600">View all</Link>
                        </div>
                        <ul className="divide-y">
                            {(recent.messages || []).map((m) => (
                                <li key={m.id} className="flex items-center justify-between p-4 text-sm">
                                    <div>
                                        <p className="font-medium">{m.name}</p>
                                        <p className="text-gray-500">{m.email}</p>
                                    </div>
                                    <time className="text-gray-400">{new Date(m.created_at).toLocaleDateString()}</time>
                                </li>
                            ))}
                            {(!recent.messages || recent.messages.length === 0) && (
                                <div className="p-6 text-center text-gray-500">No messages yet.</div>
                            )}
                        </ul>
                    </div>
                    <div className="rounded-xl border bg-white">
                        <div className="flex items-center justify-between border-b p-4">
                            <h3 className="font-semibold">New Organizations</h3>
                            <Link href="/admin/ngos" className="text-sm text-blue-600">View all</Link>
                        </div>
                        <ul className="divide-y">
                            {(recent.organizations || []).map((o) => (
                                <li key={o.id} className="flex items-center justify-between p-4 text-sm">
                                    <p className="font-medium truncate max-w-[60%]">{o.name}</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500 truncate max-w-[120px]">{String(o.country || '').toString().replace(/[\[\]"]+/g,'')}</span>
                                        <time className="text-gray-400">{new Date(o.created_at).toLocaleDateString()}</time>
                                    </div>
                                </li>
                            ))}
                            {(!recent.organizations || recent.organizations.length === 0) && (
                                <div className="p-6 text-center text-gray-500">No organizations yet.</div>
                            )}
                        </ul>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                    {[{ title: 'Quick Action', content: 'Add Organization', href: '/admin/maps?type=organization' },
                      { title: 'Quick Action', content: 'Invite Participants', href: '/admin/participants' },
                      { title: 'Quick Action', content: 'Create Article', href: '/admin/articles' }].map((q, idx) => (
                        <Link key={idx} href={q.href} className="relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm hover:shadow transition">
                            <p className="text-xs text-gray-500">{q.title}</p>
                            <p className="mt-2 text-lg font-semibold">{q.content}</p>
                            <PlaceholderPattern className="pointer-events-none absolute inset-0 size-full stroke-neutral-900/10" />
                        </Link>
                    ))}
                </section>
            </div>
        </AppLayout>
    );
}
