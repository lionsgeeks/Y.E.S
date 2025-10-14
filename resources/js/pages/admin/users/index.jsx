import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Plus, Edit, Trash2, Mail, User, Shield, Calendar } from 'lucide-react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';

export default function UsersIndex({ users }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/admin/users', formData, {
            onSuccess: () => {
                setIsCreateOpen(false);
                setFormData({ name: '', email: '' });
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/admin/users/${id}`);
        }
    };

    const handleResendPassword = (id) => {
        if (confirm('Send a new password to this user via email?')) {
            router.post(`/admin/users/${id}/resend-password`);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={[
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'User Management', href: '/admin/users' },
        ]}>
            <Head title="User Management" />

            <div className="space-y-6 py-15">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                        <p className="text-gray-600 mt-2">Manage system users and administrators</p>
                    </div>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Add User
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New User</DialogTitle>
                                <DialogDescription>
                                    Create a new user account. A password will be generated and sent via email.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Enter email address"
                                        required
                                    />
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <div className="flex items-start space-x-2">
                                        <Mail className="w-4 h-4 text-blue-600 mt-0.5" />
                                        <div className="text-sm text-blue-800">
                                            <p className="font-medium">Password will be generated automatically</p>
                                            <p className="text-blue-600">The user will receive login credentials via email.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white">
                                        Create User
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {users.slice(startIndex, endIndex).map((user) => (
                        <Card key={user.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <User className="w-5 h-5 text-[#2e539d]" />
                                        <CardTitle className="text-lg">{user.name}</CardTitle>
                                    </div>
                                    <Badge variant={user.email_verified_at ? "default" : "secondary"}>
                                        {user.email_verified_at ? 'Verified' : 'Pending'}
                                    </Badge>
                                </div>
                                <CardDescription>
                                    <div className="flex items-center space-x-1 text-sm">
                                        <Mail className="w-3 h-3" />
                                        <span>{user.email}</span>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleResendPassword(user.id)}
                                            className="flex-1"
                                        >
                                            <Mail className="w-4 h-4 mr-1" />
                                            Resend Password
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(user.id)}
                                            className="flex-1"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {users.length === 0 && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No users yet</h3>
                            <p className="text-gray-600 mb-4">Get started by adding your first user.</p>
                            <Button
                                onClick={() => setIsCreateOpen(true)}
                                className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add User
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {users.length > 0 && totalPages > 1 && (
                    <div className="flex justify-center pt-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={() => goToPage(currentPage - 1)}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => goToPage(page)}
                                            isActive={currentPage === page}
                                            className="cursor-pointer"
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={() => goToPage(currentPage + 1)}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </AppSidebarLayout>
    );
}



