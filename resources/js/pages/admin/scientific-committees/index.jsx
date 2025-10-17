import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, ExternalLink, Users, Upload, User } from 'lucide-react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';

export default function ScientificCommitteesIndex({ scientificCommittees }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        linkedin_url: '',
        photo_path: '',
        bio: '',
        order: 0,
        is_active: true,
    });
    const [photoFile, setPhotoFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value ?? '');
        });
        if (photoFile) {
            data.append('photo_path', photoFile);
        }

        if (editingMember) {
            data.append('_method', 'POST');
            router.post(`/admin/scientific-committees/${editingMember.id}`, data, {
                forceFormData: true,
                onSuccess: () => {
                    setIsEditOpen(false);
                    setEditingMember(null);
                    setFormData({ name: '', position: '', linkedin_url: '', photo_path: '', bio: '', order: 0, is_active: 1 });
                    setPhotoFile(null);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        } else {
            router.post('/admin/scientific-committees', data, {
                forceFormData: true,
                onSuccess: () => {
                    setIsCreateOpen(false);
                    setFormData({ name: '', position: '', linkedin_url: '', photo_path: '', bio: '', order: 0, is_active: 1 });
                    setPhotoFile(null);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        }
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            position: member.position || '',
            linkedin_url: member.linkedin_url || '',
            photo_path: member.photo_path || '',
            bio: member.bio || '',
            order: member.order,
            is_active: member.is_active,
        });
        setPhotoFile(null);
        setIsEditOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this committee member?')) {
            router.delete(`/admin/scientific-committees/${id}`);
        }
    };

    const handleToggleActive = (id, isActive) => {
        router.post(`/admin/scientific-committees/${id}`, {
            is_active: !isActive,
            _method: 'PUT',
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={[
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Scientific Committee', href: '/admin/scientific-committees' },
        ]}>
            <Head title="Scientific Committee Management" />

            <div className="py-10 relative">
                {/* Background Pattern to match Sponsors page */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/30 rounded-2xl -z-10"></div>
                <div
                    className="absolute inset-0 opacity-20 -z-10"
                    style={{
                        backgroundImage:
                            `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.3'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Scientific Committee</h1>
                            <p className="text-gray-500 text-sm">{scientificCommittees.length} members</p>
                        </div>
                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Member
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Add Committee Member</DialogTitle>
                                <DialogDescription>
                                    Add a new member to the scientific committee.
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
                                    <Label htmlFor="photo">Photo</Label>
                                    <Input
                                        id="photo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                                    />
                                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB. Stored under /storage/comittee-scientifique</p>
                                    {photoFile && (
                                        <div className="mt-2 text-xs text-gray-600">Selected: {photoFile.name}</div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="position">Position/Title</Label>
                                    <Input
                                        id="position"
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        placeholder="e.g., Professor, Director, etc."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                                    <Input
                                        id="linkedin_url"
                                        type="url"
                                        value={formData.linkedin_url}
                                        onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        placeholder="Brief biography"
                                        rows={4}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="order">Display Order</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                        placeholder="0"
                                    />
                                </div>
                            
                                <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} disabled={isSubmitting}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white" disabled={isSubmitting}>
                                        {isSubmitting ? 'Adding...' : 'Add Member'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-6">
                    {scientificCommittees.map((member) => (
                        <Card key={member.id} className="group hover:shadow-lg transition-all duration-200 border-0 bg-white/50 backdrop-blur-sm">
                            <CardContent className="p-4">
                                <div className="flex flex-col items-center space-y-3">
                                    {/* Avatar */}
                                    <div className="relative w-20 h-20 bg-white rounded-full shadow-sm border flex items-center justify-center overflow-hidden">
                                        {member.photo_path ? (
                                            <img
                                                src={`/storage/images/${member.photo_path}`}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-8 h-8 text-gray-400" />
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="text-center space-y-1">
                                        <h3 className="font-medium text-sm text-gray-900 truncate w-40" title={member.name}>
                                            {member.name}
                                        </h3>
                                        <div className="flex items-center justify-center gap-2">

                                            {member.position && (
                                                <span className="text-[11px] text-[#b09417] font-medium truncate max-w-[8rem]" title={member.position}>
                                                    {member.position}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500">Order: {member.order}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(member)}
                                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member.id)}
                                            className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </button>

                                        {member.linkedin_url && (
                                            <a
                                                href={member.linkedin_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                                                title="LinkedIn"
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

                {scientificCommittees.length === 0 && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No committee members yet</h3>
                            <p className="text-gray-600 mb-4">Get started by adding your first committee member.</p>
                            <Button
                                onClick={() => setIsCreateOpen(true)}
                                className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Member
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Edit Dialog */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Edit Committee Member</DialogTitle>
                            <DialogDescription>
                                Update committee member information.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Full Name</Label>
                                <Input
                                    id="edit-name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-photo">Photo</Label>
                                <Input
                                    id="edit-photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                                />
                                {formData.photo_path && (
                                    <div className="text-xs text-gray-600">Current: {formData.photo_path}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-position">Position/Title</Label>
                                <Input
                                    id="edit-position"
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    placeholder="e.g., Professor, Director, etc."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-linkedin_url">LinkedIn URL</Label>
                                <Input
                                    id="edit-linkedin_url"
                                    type="url"
                                    value={formData.linkedin_url}
                                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-bio">Bio</Label>
                                <Textarea
                                    id="edit-bio"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="Brief biography"
                                    rows={4}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-order">Display Order</Label>
                                <Input
                                    id="edit-order"
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    placeholder="0"
                                />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} disabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white" disabled={isSubmitting}>
                                    {isSubmitting ? 'Updating...' : 'Update Member'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppSidebarLayout>
    );
}
