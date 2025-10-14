import React, { useEffect, useMemo, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import TiptapEditor from './TiptapEditor';
import { X } from 'lucide-react';

const EditArticle = ({ article }) => {
    const breadcrumbs = [
        { title: 'Edit Article', href: '/articles/edit/'+article.id },
    ];

    const [title, setTitle] = useState(article?.title?.en || '');
    const [description, setDescription] = useState(article?.description?.en || '');
    const initialTags = useMemo(() => {
        const t = article?.tags?.en;
        if (Array.isArray(t)) return t;
        if (typeof t === 'string') return t.split(',').map(s => s.trim()).filter(Boolean);
        return [];
    }, [article]);
    const [tags, setTags] = useState(initialTags);
    const [tagInput, setTagInput] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(article?.image || '');
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (image) {
            const url = URL.createObjectURL(image);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [image]);

    const commitTag = (raw) => {
        const value = raw.trim();
        if (value !== '' && !tags.includes(value)) setTags([...tags, value]);
    };
    const handleAddTag = (e) => {
        e.preventDefault();
        commitTag(tagInput);
        setTagInput('');
    };
    const handleRemoveTag = (t) => setTags(tags.filter(x => x !== t));

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setSubmitting(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        tags.forEach((tag, index) => formData.append(`tags[${index}]`, tag));
        if (image) formData.append('image', image);

        router.post(`/admin/article/update/${article.id}`, formData, {
            forceFormData: true,
            onError: (errs) => setErrors(errs || {}),
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Article" />
            <div className='px-5 py-8'>
                <h1 className="text-3xl font-bold mb-6 text-alpha">Edit Article</h1>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl" encType="multipart/form-data">
                    <div>
                        <label className="block text-sm font-medium text-alpha mb-2">Featured Image</label>
                        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="block w-full text-sm text-gray-700 border border-gray-300 rounded p-2" />
                        {errors.image && (<p className="text-red-600 text-sm mt-1">{errors.image}</p>)}
                        {preview && (
                            <div className="mt-3">
                                <img src={preview} alt="Preview" className="h-40 w-auto rounded border object-cover" />
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-alpha mb-2">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter article title" className="w-full rounded border border-gray-300 p-2 focus:border-beta focus:ring-0" required />
                        {errors.title && (<p className="text-red-600 text-sm mt-1">{errors.title}</p>)}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-alpha mb-2">Description</label>
                        <TiptapEditor value={description} onChange={setDescription} />
                        {errors.description && (<p className="text-red-600 text-sm mt-1">{errors.description}</p>)}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-alpha mb-2">Tags</label>
                        <div className="flex flex-wrap items-center gap-2 border border-gray-300 p-2 rounded">
                            {tags.map((tag, index) => (
                                <div key={index} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    <span>{tag}</span>
                                    <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveTag(tag)} />
                                </div>
                            ))}
                            <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); commitTag(tagInput); setTagInput(''); }
                                else if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) { setTags(tags.slice(0, -1)); }
                            }} placeholder="Add a tag and press Enter" className="flex-1 border-none focus:ring-0 text-sm" />
                            <button type="button" onClick={handleAddTag} className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200">Add</button>
                        </div>
                        {errors.tags && (<p className="text-red-600 text-sm mt-1">{errors.tags}</p>)}
                    </div>
                    <div>
                        <button type="submit" disabled={submitting} className={`bg-alpha hover:bg-beta text-white font-medium px-5 py-2 rounded ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}>
                            {submitting ? 'Saving...' : 'Update Article'}
                        </button>
                    </div>
                </form>
            </div>
        </AppSidebarLayout>
    );
};

export default EditArticle;
