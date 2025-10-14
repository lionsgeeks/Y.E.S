import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import TiptapEditor from './TiptapEditor';
import { X } from 'lucide-react'; // For tag delete icon

const CreateArticle = () => {
    const breadcrumbs = [
        { title: 'Articles', href: '/articles' },
        { title: 'Create Article', href: '/articles/create' },
    ];

    // Local states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [image, setImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Handle adding a tag
    const commitTag = (raw) => {
        const value = raw.trim();
        if (value !== '' && !tags.includes(value)) {
            setTags([...tags, value]);
        }
    };
    const handleAddTag = (e) => {
        e.preventDefault();
        commitTag(tagInput);
        setTagInput('');
    };

    // Remove a tag
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setSubmitting(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        tags.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag);
        });
        if (image) {
            formData.append('image', image);
        }

        router.post('/admin/article/store', formData, {
            forceFormData: true,
            onError: (errs) => {
                setErrors(errs || {});
            },
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Article" />

            <div className="px-5 py-8">
                <h1 className="text-3xl font-bold mb-6">Create New Article</h1>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl" encType="multipart/form-data">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="block w-full text-sm text-gray-700 border border-gray-300 rounded p-2"
                        />
                        {errors.image && (
                            <p className="text-red-600 text-sm mt-1">{errors.image}</p>
                        )}
                        {image && (
                            <div className="mt-3">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    className="h-40 w-auto rounded border object-cover"
                                />
                            </div>
                        )}
                    </div>
                    {/* Title Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter article title"
                            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-0"
                            required
                        />
                        {errors.title && (
                            <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                        )}
                    </div>

                    {/* Description Editor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <TiptapEditor value={description} onChange={setDescription} />
                        {errors.description && (
                            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    {/* Tags Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                        <div className="flex flex-wrap items-center gap-2 border border-gray-300 p-2 rounded">
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded"
                                >
                                    <span>{tag}</span>
                                    <X
                                        size={14}
                                        className="cursor-pointer hover:text-red-500"
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                </div>
                            ))}
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ',') {
                                        e.preventDefault();
                                        commitTag(tagInput);
                                        setTagInput('');
                                    } else if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
                                        setTags(tags.slice(0, -1));
                                    }
                                }}
                                placeholder="Add a tag and press Enter"
                                className="flex-1 border-none focus:ring-0 text-sm"
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
                            >
                                Add
                            </button>
                        </div>
                        {errors.tags && (
                            <p className="text-red-600 text-sm mt-1">{errors.tags}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`bg-[#2e539d] hover:bg-[#1e3d7a] text-white font-medium px-5 py-2 rounded ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? 'Saving...' : 'Save Article'}
                        </button>
                    </div>
                </form>
            </div>
        </AppSidebarLayout>
    );
};

export default CreateArticle;
