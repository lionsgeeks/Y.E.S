import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, ExternalLink, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';

type Sponsor = { id: number; name: string; type: string; website_url?: string | null; description?: string | object; created_at: string };

export default function SponsorsIndex({ sponsors }: { sponsors: Sponsor[] }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingSponsor, setEditingSponsor] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        type: 'sponsor',
        website_url: '',
        description: '',
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(sponsors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSponsors = useMemo(() => sponsors.slice(startIndex, endIndex), [sponsors, startIndex, endIndex]);

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSponsor) {
            router.post(`/admin/sponsors/${editingSponsor.id}`, {
                ...formData,
                _method: 'PUT',
            });
        } else {
            router.post('/admin/sponsors', formData);
        }
        setIsCreateOpen(false);
        setIsEditOpen(false);
        setEditingSponsor(null);
        setFormData({ name: '', type: 'sponsor', website_url: '', description: '' });
    };

    const handleEdit = (sponsor) => {
        setEditingSponsor(sponsor);
        setFormData({
            name: sponsor.name,
            type: sponsor.type,
            website_url: sponsor.website_url || '',
            description: typeof sponsor.description === 'string' ? sponsor.description : JSON.stringify(sponsor.description || {}),
        });
        setIsEditOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this sponsor?')) {
            router.delete(`/admin/sponsors/${id}`);
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'organizer':
                return 'bg-[#2e539d] text-white';
            case 'sponsor':
                return 'bg-[#b09417] text-white';
            case 'technical_partner':
                return 'bg-[#f8a205] text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={[
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Sponsors', href: '/admin/sponsors' },
        ]}>
            <Head title="Sponsors Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Sponsors Management</h1>
                        <p className="text-gray-600 mt-2">Manage sponsors, organizers, and technical partners</p>
                    </div>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-[#2e539d] to-[#b09417] hover:from-[#1e3d7a] hover:to-[#8a6f0f] text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Sponsor
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Sponsor</DialogTitle>
                                <DialogDescription>
                                    Create a new sponsor, organizer, or technical partner.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter sponsor name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type</Label>
                                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sponsor">Sponsor</SelectItem>
                                            <SelectItem value="organizer">Organizer</SelectItem>
                                            <SelectItem value="technical_partner">Technical Partner</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website_url">Website URL</Label>
                                    <Input
                                        id="website_url"
                                        type="url"
                                        value={formData.website_url}
                                        onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                        placeholder="https://example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Enter description"
                                        rows={3}
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-gradient-to-r from-[#2e539d] to-[#b09417] hover:from-[#1e3d7a] hover:to-[#8a6f0f] text-white">
                                        Create Sponsor
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {currentSponsors.map((sponsor) => (
                        <Card key={sponsor.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Building2 className="w-5 h-5 text-[#2e539d]" />
                                        <CardTitle className="text-lg">{sponsor.name}</CardTitle>
                                    </div>
                                    <Badge className={getTypeColor(sponsor.type)}>
                                        {sponsor.type.replace('_', ' ')}
                                    </Badge>
                                </div>
                                <CardDescription>
                                    Created {new Date(sponsor.created_at).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {sponsor.website_url && (
                                        <div className="flex items-center space-x-2">
                                            <ExternalLink className="w-4 h-4 text-gray-500" />
                                            <a
                                                href={sponsor.website_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#2e539d] hover:text-[#b09417] text-sm truncate"
                                            >
                                                {sponsor.website_url}
                                            </a>
                                        </div>
                                    )}
                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(sponsor)}
                                            className="flex-1"
                                        >
                                            <Edit className="w-4 h-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(sponsor.id)}
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

                {sponsors.length === 0 && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No sponsors yet</h3>
                            <p className="text-gray-600 mb-4">Get started by adding your first sponsor.</p>
                            <Button
                                onClick={() => setIsCreateOpen(true)}
                                className="bg-gradient-to-r from-[#2e539d] to-[#b09417] hover:from-[#1e3d7a] hover:to-[#8a6f0f] text-white"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Sponsor
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {sponsors.length > 0 && totalPages > 1 && (
                    <div className="flex items-center justify-between pt-8">
                        <div className="text-sm text-gray-600">
                            Showing {startIndex + 1} to {Math.min(endIndex, sponsors.length)} of {sponsors.length} sponsors
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center"
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Previous
                            </Button>
                            <span className="text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="flex items-center"
                            >
                                Next
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                )}

                {/* Edit Dialog */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Sponsor</DialogTitle>
                            <DialogDescription>
                                Update sponsor information.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Name</Label>
                                <Input
                                    id="edit-name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter sponsor name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-type">Type</Label>
                                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sponsor">Sponsor</SelectItem>
                                        <SelectItem value="organizer">Organizer</SelectItem>
                                        <SelectItem value="technical_partner">Technical Partner</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-website_url">Website URL</Label>
                                <Input
                                    id="edit-website_url"
                                    type="url"
                                    value={formData.website_url}
                                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                    placeholder="https://example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                    id="edit-description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Enter description"
                                    rows={3}
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-gradient-to-r from-[#2e539d] to-[#b09417] hover:from-[#1e3d7a] hover:to-[#8a6f0f] text-white">
                                    Update Sponsor
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppSidebarLayout>
    );
}
