import { Head, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import {
    ArrowLeft,
    Mail,
    MailOpen,
    Filter,
    BarChart3,
    Eye,
    EyeOff,
    Search,
    MoreVertical,
    Calendar,
    User,
    Phone,
    Clock,
    Trash2,
    Archive,
    Star,
    StarOff,
    ChevronDown,
    RefreshCw
} from 'lucide-react';

export default function MessagesIndex({ messages }) {
    const [selectedId, setSelectedId] = useState(messages[0]?.id ?? null);
    const [isDetailOpenMobile, setIsDetailOpenMobile] = useState(false);
    const [filter, setFilter] = useState('all'); // 'all', 'read', 'unread'
    const [showStats, setShowStats] = useState(false);
    const selected = messages.find(m => m.id === selectedId) || null;

    // Calculate statistics
    const totalMessages = messages.length;
    const readMessages = messages.filter(m => m.mark_as_read).length;
    const unreadMessages = totalMessages - readMessages;
    const readPercentage = totalMessages > 0 ? Math.round((readMessages / totalMessages) * 100) : 0;

    // Filter messages based on current filter
    const filteredMessages = messages.filter(msg => {
        if (filter === 'read') return msg.mark_as_read;
        if (filter === 'unread') return !msg.mark_as_read;
        return true;
    });

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
        if (selectedId == null && filteredMessages[0]) {
            setSelectedId(filteredMessages[0].id);
        }
        if (selectedId && !filteredMessages.find(m => m.id === selectedId)) {
            setSelectedId(filteredMessages[0]?.id ?? null);
        }
    }, [filteredMessages, selectedId]);

    const handleSelect = (id) => {
        setSelectedId(id);
        if (window.innerWidth < 768) {
            setIsDetailOpenMobile(true);
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Messages', href: '/admin/messages' }]}>
            <Head title="Messages" />

            {/* Professional Header Section */}
            <div className="px-6 py-6 bg-white border-b border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Header Info */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-[var(--alpha)] to-[var(--beta)] rounded-xl shadow-lg">
                                <Mail className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Message Center</h1>
                                <p className="text-sm text-gray-500">Manage and monitor all incoming messages</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => router.reload({ only: ['messages'] })}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Refresh
                        </Button>

                    </div>
                </div>

                {/* Professional Statistics Grid */}
                {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--alpha)]/5 to-[var(--beta)]/5"></div>
                        <CardContent className="relative p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Total Messages</p>
                                    <p className="text-3xl font-bold text-gray-900">{totalMessages}</p>
                                    <p className="text-xs text-gray-500 mt-1">All time messages</p>
                                </div>
                                <div className="p-3 bg-gradient-to-br from-[var(--alpha)] to-[var(--beta)] rounded-xl">
                                    <Mail className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50"></div>
                        <CardContent className="relative p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Read Messages</p>
                                    <p className="text-3xl font-bold text-emerald-700">{readMessages}</p>
                                    <p className="text-xs text-emerald-600 mt-1">{readPercentage}% of total</p>
                                </div>
                                <div className="p-3 bg-emerald-100 rounded-xl">
                                    <MailOpen className="h-6 w-6 text-emerald-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50"></div>
                        <CardContent className="relative p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Unread Messages</p>
                                    <p className="text-3xl font-bold text-amber-700">{unreadMessages}</p>
                                    <p className="text-xs text-amber-600 mt-1">Requires attention</p>
                                </div>
                                <div className="p-3 bg-amber-100 rounded-xl">
                                    <Mail className="h-6 w-6 text-amber-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div> */}

                {/* Professional Filter Tabs */}
                <div className="mt-8">
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${filter === 'all'
                                    ? 'bg-white text-[var(--alpha)] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            All Messages ({totalMessages})
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${filter === 'unread'
                                    ? 'bg-white text-amber-700 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            Unread ({unreadMessages})
                        </button>
                        <button
                            onClick={() => setFilter('read')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${filter === 'read'
                                    ? 'bg-white text-emerald-700 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            Read ({readMessages})
                        </button>
                    </div>
                </div>
            </div>

            {/* Professional Message Layout */}
            <div className="flex-1 flex bg-gray-50">
                {/* Message List Panel */}
                <div className={`w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col ${isDetailOpenMobile ? 'hidden md:flex' : 'flex'}`}>
                    {/* List Header */}
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">Messages</h3>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                                {filteredMessages.length}
                            </Badge>
                        </div>
                    </div>

                    {/* Message List */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredMessages.map((msg, index) => (
                            <div
                                key={msg.id}
                                onClick={() => handleSelect(msg.id)}
                                className={`group relative p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${selectedId === msg.id
                                        ? 'bg-[var(--alpha)]/5 border-l-4 border-l-[var(--alpha)]'
                                        : 'hover:border-l-4 hover:border-l-gray-300'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    {/* Avatar */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${msg.mark_as_read
                                            ? 'bg-gray-400'
                                            : 'bg-gradient-to-br from-[var(--alpha)] to-[var(--beta)]'
                                        }`}>
                                        {msg.fullname?.charAt(0)?.toUpperCase() || msg.email?.charAt(0)?.toUpperCase() || '?'}
                                    </div>

                                    {/* Message Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className={`text-sm font-medium truncate ${msg.mark_as_read ? 'text-gray-700' : 'text-gray-900'
                                                }`}>
                                                {msg.fullname || 'Unknown Sender'}
                                            </h4>
                                            {!msg.mark_as_read && (
                                                <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                                            )}
                                        </div>

                                        <p className="text-xs text-gray-500 mb-1 truncate">
                                            {msg.email}
                                        </p>

                                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                            {msg.message}
                                        </p>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                                <Clock className="h-3 w-3" />
                                                {new Date(msg.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>

                                            {!msg.mark_as_read && (
                                                <Badge variant="outline" className="text-xs px-2 py-0.5 border-amber-200 text-amber-700 bg-amber-50">
                                                    New
                                                </Badge>
                                            )}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        ))}

                        {filteredMessages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Mail className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
                                <p className="text-sm text-gray-500">
                                    {filter === 'all' && 'No messages have been received yet.'}
                                    {filter === 'read' && 'No read messages found.'}
                                    {filter === 'unread' && 'No unread messages found.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Message Detail Panel */}
                <div className={`flex-1 bg-white ${isDetailOpenMobile ? 'flex' : 'hidden md:flex'} flex-col`}>
                    {selected ? (
                        <>
                            {/* Professional Header */}
                            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4 flex-1 min-w-0">
                                            <button
                                                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 active:scale-95 transition-all duration-200"
                                                onClick={() => setIsDetailOpenMobile(false)}
                                                aria-label="Back"
                                            >
                                                <ArrowLeft className="w-5 h-5" />
                                            </button>

                                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg bg-gradient-to-br from-[var(--alpha)] to-[var(--beta)]">
                                                {selected.fullname?.charAt(0)?.toUpperCase() || selected.email?.charAt(0)?.toUpperCase() || '?'}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                                                        {selected.fullname || 'Unknown Sender'}
                                                    </h2>
                                                    {!selected.mark_as_read && (
                                                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                                                            <div className="w-2 h-2 bg-amber-500 rounded-full mr-1"></div>
                                                            Unread
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Mail className="h-4 w-4" />
                                                        <span className="truncate">{selected.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{new Date(selected.created_at).toLocaleDateString('en-US', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 ml-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className={`gap-2 ${selected.mark_as_read
                                                        ? 'border-amber-200 text-amber-700 hover:bg-amber-50'
                                                        : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                                                    }`}
                                                onClick={() => toggleRead(selected.id)}
                                            >
                                                {selected.mark_as_read ? (
                                                    <>
                                                        <EyeOff className="h-4 w-4" />
                                                        Mark Unread
                                                    </>
                                                ) : (
                                                    <>
                                                        <Eye className="h-4 w-4" />
                                                        Mark Read
                                                    </>
                                                )}
                                            </Button>





                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="gap-2 border-red-200 text-red-700 hover:bg-red-50"
                                                onClick={() => handleDelete(selected.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Message Content */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="p-6">
                                    {/* Contact Information */}
                                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <User className="h-4 w-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Full Name</p>
                                                    <p className="text-sm font-medium text-gray-900">{selected.fullname || 'Not provided'}</p>
                                                </div>
                                            </div>

                                            {selected.phone && (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                                        <Phone className="h-4 w-4 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Phone Number</p>
                                                        <p className="text-sm font-medium text-gray-900">{selected.phone}</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <Mail className="h-4 w-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Email Address</p>
                                                    <p className="text-sm font-medium text-gray-900">{selected.email}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <Clock className="h-4 w-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Received</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {new Date(selected.created_at).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message Body */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Message</h3>
                                        <div className="prose prose-sm max-w-none">
                                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                                <div className="whitespace-pre-wrap text-gray-900 leading-relaxed text-sm">
                                                    {selected.message}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mail className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a message</h3>
                                <p className="text-sm text-gray-500">Choose a message from the list to view its details</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppSidebarLayout>
    );
}


