import { Head, Link, usePage, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { useEffect, useMemo, useState } from 'react';

function PillButton({ active, children, onClick }) {
    const base = 'px-4 py-2 rounded-full transition-all shadow-sm text-sm';
    const act = 'bg-alpha text-white hover:bg-alpha/90 border border-transparent';
    const inact = 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200';
    return (
        <button onClick={onClick} className={`filter-btn ${base} ${active ? act : inact}`}>{children}</button>
    );
}

const typeMap = {
    'App\\Models\\Organization': { key: 'organization', label: 'Organisation', badge: 'Organisation', logo: (s)=>s?.logo },
    'App\\Models\\Bailleur': { key: 'bailleur', label: 'Bailleur', badge: 'Bailleur', logo: (s)=>s?.logo_path },
    'App\\Models\\Agence': { key: 'agence', label: 'Agence', badge: 'Agence', logo: (s)=>s?.logo },
    'App\\Models\\Entreprise': { key: 'entreprise', label: 'Entreprise', badge: 'Entreprise', logo: (s)=>s?.logo },
    'App\\Models\\Publique': { key: 'publique', label: 'Institution Publique', badge: 'Institution Publique', logo: (s)=>s?.logo_path },
    'App\\Models\\Academique': { key: 'academique', label: 'Institution Académique', badge: 'Institution Académique', logo: (s)=>s?.logo_path },
};

export default function AdminMapsIndex({ shows, search, type }) {
    const [filter, setFilter] = useState(type || 'all');
    const [query, setQuery] = useState(search || '');

    // Debounced server-side search across all pages
    useEffect(() => {
        const id = setTimeout(() => {
            router.visit('/admin/maps', {
                method: 'get',
                data: { search: query, type: filter === 'all' ? undefined : filter },
                preserveScroll: true,
                preserveState: true,
                replace: true,
            });
        }, 300);
        return () => clearTimeout(id);
    }, [query, filter]);

    const flat = useMemo(() => {
        const rows = [];
        (shows?.data || []).forEach(({ showable_type: model, showable }) => {
            if (!showable) return;
            const meta = typeMap[model];
            rows.push({ model, showable, meta });
        });
        return rows;
    }, [shows]);

    const filtered = flat; // server already filtered by type

    return (
        <AppSidebarLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Maps', href: '/admin/maps' }]}>
            <Head title="Maps" />
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Maps</h1>
                </div>

                <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex flex-wrap gap-2">
                            {[
                                {key:'all',label:'Tous'},
                                {key:'organization',label:'Organisations'},
                                {key:'bailleur',label:'Bailleurs'},
                                {key:'agence',label:'Agences'},
                                {key:'entreprise',label:'Entreprises'},
                                {key:'publique',label:'Institutions Publiques'},
                                {key:'academique',label:'Institutions Académiques'},
                            ].map(b => (
                                <PillButton key={b.key} active={filter===b.key} onClick={()=>setFilter(b.key)}>{b.label}</PillButton>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                aria-label="Rechercher"
                                name="search"
                                value={query}
                                onChange={e=>setQuery(e.target.value)}
                                type="text"
                                placeholder="Rechercher..."
                                className="pl-10 pr-3 h-10 w-64 rounded-full border border-gray-300 shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:border-[#b09417] focus:ring-2 focus:ring-[#b09417]/30"
                            />
                            <div className="pointer-events-none absolute left-3 top-2.5 text-gray-400">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {filtered.map((row, idx) => (
                        <Card key={idx} row={row} />
                    ))}
                </div>
                <div className="flex justify-end pt-2">
                    {shows?.links && (
                        <div className="flex items-center gap-2 text-sm">
                            {shows.links.map((l, i)=> (
                                <Link key={i} href={l.url || '#'} className={`px-3 py-1 rounded ${l.active ? 'bg-alpha text-white' : 'bg-white border'}`} dangerouslySetInnerHTML={{__html: l.label}} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppSidebarLayout>
    );
}

function Card({ row }) {
    const { model, showable, meta } = row;
    const badge = meta?.badge ?? '';
    const logo = meta?.logo?.(showable);
    const name = showable?.name || showable?.nom || showable?.institution_name || '';
    const country = showable?.country || showable?.pays || showable?.pays_origine || '';

    const approve = (showable?.shows?.[0]?.approve) ?? false;
    const id = showable?.id;
    const detailsType = meta?.key ?? 'organization';

    return (
        <div className="card bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 rounded-xl border border-gray-100">
            <div className="p-6">
                <div className="flex items-start mb-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 border border-gray-200 flex-shrink-0 bg-white">
                        {logo ? (
                            <img src={`/storage/${logo}`} alt={name} className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-full h-full bg-gray-100" />
                        )}
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
                        <p className="text-sm text-gray-500 truncate">{String(country).toString().replace(/[\[\]"]+/g,'')}</p>
                        <h2 className="bg-[#b09417] text-white px-3 py-0.5 rounded-full font-medium text-xs mt-1 inline-block">{badge}</h2>
                    </div>
                    <div className="ml-auto">
                        <Link href={`/admin/map/details/${detailsType}/${id}`} className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Détails
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


