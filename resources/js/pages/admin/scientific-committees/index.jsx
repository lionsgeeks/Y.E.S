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
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        linkedin_url: '',
        bio: '',
        order: 0,
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingMember) {
            router.post(`/admin/scientific-committees/${editingMember.id}`, {
                ...formData,
                _method: 'PUT',
            });
        } else {
            router.post('/admin/scientific-committees', formData);
        }
        setIsCreateOpen(false);
        setIsEditOpen(false);
        setEditingMember(null);
        setFormData({ name: '', position: '', linkedin_url: '', bio: '', order: 0, is_active: true });
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            position: member.position || '',
            linkedin_url: member.linkedin_url || '',
            bio: member.bio || '',
            order: member.order,
            is_active: member.is_active,
        });
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

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Scientific Committee</h1>
                        <p className="text-gray-600 mt-2">Manage scientific committee members</p>
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
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={formData.is_active}
                                        onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white">
                                        Add Member
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {scientificCommittees.map((member) => (
                        <Card key={member.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <User className="w-5 h-5 text-[#2e539d]" />
                                        <CardTitle className="text-lg">{member.name}</CardTitle>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant={member.is_active ? "default" : "secondary"}>
                                            {member.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                        <Switch
                                            checked={member.is_active}
                                            onCheckedChange={() => handleToggleActive(member.id, member.is_active)}
                                            size="sm"
                                        />
                                    </div>
                                </div>
                                <CardDescription>
                                    {member.position && (
                                        <div className="text-sm font-medium text-[#b09417] mb-1">
                                            {member.position}
                                        </div>
                                    )}
                                    Order: {member.order}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {member.linkedin_url && (
                                        <div className="flex items-center space-x-2">
                                            <ExternalLink className="w-4 h-4 text-gray-500" />
                                            <a
                                                href={member.linkedin_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#2e539d] hover:text-[#b09417] text-sm truncate"
                                            >
                                                LinkedIn Profile
                                            </a>
                                        </div>
                                    )}
                                    {member.bio && (
                                        <p className="text-sm text-gray-600 line-clamp-3">
                                            {member.bio}
                                        </p>
                                    )}
                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(member)}
                                            className="flex-1"
                                        >
                                            <Edit className="w-4 h-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(member.id)}
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
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="edit-is_active"
                                    checked={formData.is_active}
                                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                                />
                                <Label htmlFor="edit-is_active">Active</Label>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white">
                                    Update Member
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppSidebarLayout>
    );
}
