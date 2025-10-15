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
import { Plus, Edit, Trash2, ExternalLink, Building2, Upload, X, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export default function SponsorsIndex({ sponsors }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [editingSponsor, setEditingSponsor] = useState(null);
    const [selectedSponsor, setSelectedSponsor] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        type: 'sponsor',
        website_url: '',
        description: '',
        image: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [filters, setFilters] = useState({
        type: 'all',
        search: '',
    });

    const itemsPerPage = 10;

    const filteredSponsors = sponsors.filter(sponsor => {
        const matchesType = filters.type === 'all' || sponsor.type === filters.type;
        const matchesSearch = sponsor.name.toLowerCase().includes(filters.search.toLowerCase());
        return matchesType && matchesSearch;
    });

    const totalPages = Math.ceil(filteredSponsors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSponsors = useMemo(() => filteredSponsors.slice(startIndex, endIndex), [filteredSponsors, startIndex, endIndex]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('type', formData.type);
        submitData.append('website_url', formData.website_url);
        submitData.append('description', formData.description);
        if (formData.image) {
            submitData.append('image', formData.image);
        }

        if (editingSponsor) {
            submitData.append('_method', 'PUT');
            router.post(`/admin/sponsors/${editingSponsor.id}`, submitData);
        } else {
            router.post('/admin/sponsors', submitData);
        }
        setIsCreateOpen(false);
        setIsEditOpen(false);
        setEditingSponsor(null);
        setFormData({ name: '', type: 'sponsor', website_url: '', description: '', image: null });
        setPreviewImage(null);
    };

    const handleEdit = (sponsor) => {
        setEditingSponsor(sponsor);
        setFormData({
            name: sponsor.name,
            type: sponsor.type,
            website_url: sponsor.website_url || '',
            description: typeof sponsor.description === 'string' ? sponsor.description : JSON.stringify(sponsor.description || {}),
            image: null,
        });
        setPreviewImage(sponsor.path ? `/storage/images/${sponsor.path}` : null);
        setIsEditOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this sponsor?')) {
            router.delete(`/admin/sponsors/${id}`);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onload = (e) => setPreviewImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData({ ...formData, image: null });
        setPreviewImage(null);
    };

    const handleShowDetails = (sponsor) => {
        setSelectedSponsor(sponsor);
        setIsDetailsOpen(true);
    };

    // Get description in current language (defaulting to English)
    const getDescription = (description, language = 'en') => {
        if (typeof description === 'string') {
            try {
                const parsed = JSON.parse(description);
                return parsed[language] || parsed.en || description;
            } catch {
                return description;
            }
        }
        if (typeof description === 'object' && description !== null) {
            return description[language] || description.en || '';
        }
        return '';
    };

    const getTypeColor = (type) => {
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

            <div className="py-10  relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/30 rounded-2xl -z-10"></div>
                <div className="absolute inset-0 opacity-20 -z-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.3'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Sponsors</h1>
                            <p className="text-gray-500 text-sm">{filteredSponsors.length} of {sponsors.length} sponsors</p>
                        </div>
                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white">
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
                                    <div className="space-y-2">
                                        <Label htmlFor="image">Sponsor Logo</Label>
                                        <div className="space-y-2">
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2e539d] file:text-white hover:file:bg-[#1e3d7a]"
                                            />
                                            {previewImage && (
                                                <div className="relative inline-block">
                                                    <img
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="w-32 h-32 object-contain border rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <Input
                                placeholder="Search sponsors..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="w-full"
                            />
                        </div>
                        <div className="w-full sm:w-48">
                            <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="sponsor">Sponsors</SelectItem>
                                    <SelectItem value="organizer">Organizers</SelectItem>
                                    <SelectItem value="technical_partner">Technical Partners</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-6">
                    {currentSponsors.map((sponsor) => (
                        <Card key={sponsor.id} className="group hover:shadow-lg transition-all duration-200 border-0 bg-white/50 backdrop-blur-sm">
                            <CardContent className="p-4">
                                <div className="flex flex-col items-center space-y-3">
                                    {/* Logo - Clickable for details */}
                                    <div
                                        className="relative w-20 h-20 bg-white rounded-lg shadow-sm border flex items-center justify-center overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                                        onClick={() => handleShowDetails(sponsor)}
                                        title="Click to view details"
                                    >
                                        {sponsor.path ? (
                                            <img
                                                src={`/storage/images/${sponsor.path}`}
                                                alt={sponsor.name}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        ) : (
                                            <Building2 className="w-8 h-8 text-gray-400" />
                                        )}
                                    </div>

                                    {/* Sponsor Info */}
                                    <div className="text-center space-y-1">
                                        <h3 className="font-medium text-sm text-gray-900 truncate w-full" title={sponsor.name}>
                                            {sponsor.name}
                                        </h3>
                                        <Badge className={`text-xs ${getTypeColor(sponsor.type)}`}>
                                            {sponsor.type.replace('_', ' ')}
                                        </Badge>
                                    </div>

                                    {/* Action Buttons - Always Visible */}
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(sponsor)}
                                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(sponsor.id)}
                                            className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </button>
                                        {sponsor.website_url && (
                                            <a
                                                href={sponsor.website_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                                                title="Visit website"
                                            >
                                                <ExternalLink className="w-4 h-4 text-blue-600" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredSponsors.length === 0 && sponsors.length > 0 && (
                    <div className="p-6">
                        <Card className="text-center py-16 border-0 bg-white/30 backdrop-blur-sm">
                            <CardContent>
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No sponsors found</h3>
                                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
                                <Button
                                    onClick={() => setFilters({ type: 'all', search: '' })}
                                    variant="outline"
                                >
                                    Clear Filters
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {sponsors.length === 0 && (
                    <div className="p-6">
                        <Card className="text-center py-16 border-0 bg-white/30 backdrop-blur-sm">
                            <CardContent>
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No sponsors yet</h3>
                                <p className="text-gray-600 mb-6">Get started by adding your first sponsor.</p>
                                <Button
                                    onClick={() => setIsCreateOpen(true)}
                                    className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white rounded-full px-6"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Sponsor
                                </Button>
                            </CardContent>
                        </Card>
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
                            <div className="space-y-2">
                                <Label htmlFor="edit-image">Sponsor Logo</Label>
                                <div className="space-y-2">
                                    <Input
                                        id="edit-image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2e539d] file:text-white hover:file:bg-[#1e3d7a]"
                                    />
                                    {previewImage && (
                                        <div className="relative inline-block">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="w-32 h-32 object-contain border rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Update
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Details Modal */}
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Sponsor Details</DialogTitle>
                            <DialogDescription>
                                View detailed information about this sponsor.
                            </DialogDescription>
                        </DialogHeader>
                        {selectedSponsor && (
                            <div className="space-y-6">
                                {/* Logo and Basic Info */}
                                <div className="flex items-start space-x-4">
                                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {selectedSponsor.path ? (
                                            <img
                                                src={`/assets/images/sponsors/${selectedSponsor.path}`}
                                                alt={selectedSponsor.name}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        ) : (
                                            <Building2 className="w-12 h-12 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedSponsor.name}</h3>
                                        <Badge className={`text-sm ${getTypeColor(selectedSponsor.type)}`}>
                                            {selectedSponsor.type.replace('_', ' ')}
                                        </Badge>
                                        {selectedSponsor.website_url && (
                                            <div className="mt-2">
                                                <a
                                                    href={selectedSponsor.website_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#2e539d] hover:text-[#b09417] text-sm flex items-center space-x-1"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    <span>Visit Website</span>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                {selectedSponsor.description && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-gray-700 leading-relaxed">
                                                {getDescription(selectedSponsor.description)}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Additional Info */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-500">Created:</span>
                                        <p className="text-gray-900">
                                            {new Date(selectedSponsor.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-500">Last Updated:</span>
                                        <p className="text-gray-900">
                                            {new Date(selectedSponsor.updated_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end space-x-2 pt-4 border-t">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setIsDetailsOpen(false);
                                            handleEdit(selectedSponsor);
                                        }}
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            setIsDetailsOpen(false);
                                            handleDelete(selectedSponsor.id);
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
            {filteredSponsors.length > 0 && totalPages > 1 && (
                <div className="flex justify-center pt-8 pb-6">
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
        </AppSidebarLayout>
    );
}



