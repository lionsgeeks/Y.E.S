import { Head, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function MessagesIndex({ messages }) {
    const [selectedId, setSelectedId] = useState(messages[0]?.id ?? null);
    const [isDetailOpenMobile, setIsDetailOpenMobile] = useState(false);
    const selected = messages.find(m => m.id === selectedId) || null;

    const toggleRead = (id) => {
        router.post(`/admin/messages/${id}`,
            { _method: 'POST' },
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Reload messages list only and keep selection
                    router.reload({ only: ['messages'], preserveScroll: true });
                },
            }
        );
    };

    const handleDelete = (id) => {
        if (confirm('Delete this message?')) {
            router.delete(`/admin/messages/${id}`);
        }
    };

    // When the list of messages changes (after toggle/delete), keep the selection valid
    useEffect(() => {
        if (selectedId == null && messages[0]) {
            setSelectedId(messages[0].id);
        }
        if (selectedId && !messages.find(m => m.id === selectedId)) {
            setSelectedId(messages[0]?.id ?? null);
        }
    }, [messages]);

    const handleSelect = (id) => {
        setSelectedId(id);
        if (window.innerWidth < 768) {
            setIsDetailOpenMobile(true);
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Messages', href: '/admin/messages' }]}>
            <Head title="Messages" />
            <div className="px-0 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4">
                <Card className={`md:col-span-1 overflow-hidden border-0 shadow-none rounded-none md:rounded-lg ${isDetailOpenMobile ? 'hidden md:block' : ''}` }>
                    <CardContent className="p-0">
                        <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-220px)] overflow-y-auto divide-y">
                            {messages.map(msg => (
                                <button
                                    key={msg.id}
                                    onClick={() => handleSelect(msg.id)}
                                    className={`w-full text-left px-4 py-3 transition-colors flex items-start justify-between ${selectedId === msg.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                >
                                    <div className="min-w-0">
                                        <div className={`text-sm truncate ${msg.mark_as_read ? 'font-normal text-gray-800' : 'font-semibold text-gray-900'}`}>
                                            {msg.email}
                                        </div>
                                        <div className="text-xs text-gray-500 truncate">{msg.fullname}</div>
                                        <div className="text-xs text-gray-400 mt-1 truncate max-w-[14rem] md:max-w-[10rem]">{msg.message}</div>
                                    </div>
                                    <div className="text-xs text-gray-500 ml-3 shrink-0">{new Date(msg.created_at).toLocaleDateString()}</div>
                                </button>
                            ))}
                            {messages.length === 0 && (
                                <div className="p-6 text-sm text-gray-500">No messages.</div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className={`md:col-span-2 border-0 shadow-none rounded-none md:rounded-lg ${isDetailOpenMobile ? '' : 'hidden md:block'}` }>
                    <CardContent className="p-0 md:p-0 h-[calc(100vh-140px)] md:h-[calc(100vh-220px)] overflow-y-auto">
                        {selected ? (
                            <div>
                                <div className="sticky top-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b">
                                    <div className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <button
                                                className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border bg-white shadow-sm hover:bg-gray-50 active:scale-95 transition"
                                                onClick={() => setIsDetailOpenMobile(false)}
                                                aria-label="Back"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                            </button>
                                            <div className="min-w-0">
                                                <div className="text-sm md:text-base font-semibold truncate">{selected.email}</div>
                                                <div className="text-[11px] md:text-xs text-gray-500">{new Date(selected.created_at).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <Button variant="outline" className="h-9 px-3" onClick={() => toggleRead(selected.id)}>
                                                {selected.mark_as_read ? 'Mark as unread' : 'Mark as read'}
                                            </Button>
                                            <Button variant="destructive" className="h-9 px-3" onClick={() => handleDelete(selected.id)}>Delete</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-4 md:px-6 md:py-6 space-y-4">
                                    <div className="text-sm text-gray-600">
                                        <div className="mb-2"><span className="font-medium">From:</span> {selected.fullname}</div>
                                        {selected.phone && (
                                            <div className="mb-2"><span className="font-medium">Phone:</span> {selected.phone}</div>
                                        )}
                                    </div>
                                    <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                                        {selected.message}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-sm text-gray-500">Select a message to view.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}


