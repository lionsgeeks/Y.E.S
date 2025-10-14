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
    const [activeLang, setActiveLang] = useState('en');
    const [titleEn, setTitleEn] = useState('');
    const [titleAr, setTitleAr] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [descriptionAr, setDescriptionAr] = useState('');
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
        // manual validation for both languages
        const clientErrors = {};
        if (!titleEn?.trim()) clientErrors.title_en = 'English title is required';
        if (!titleAr?.trim()) clientErrors.title_ar = 'Arabic title is required';
        if (!descriptionEn?.trim()) clientErrors.description_en = 'English description is required';
        if (!descriptionAr?.trim()) clientErrors.description_ar = 'Arabic description is required';
        if (!image) clientErrors.image = 'Image is required';
        if (Object.keys(clientErrors).length) {
            setErrors(clientErrors);
            setSubmitting(false);
            return;
        }
        formData.append('title_en', titleEn);
        formData.append('title_ar', titleAr);
        formData.append('description_en', descriptionEn);
        formData.append('description_ar', descriptionAr);
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
                <div className="max-w-4xl mx-auto bg-white text-black border border-gray-200 rounded-lg shadow p-6">
                <h1 className="text-2xl font-semibold mb-6">Create An Article:</h1>

                {/* Language Toggle */}
                <div className="w-full bg-gray-100 rounded border border-gray-200 mb-4">
                    <div className="grid grid-cols-2">
                        <button type="button" onClick={() => setActiveLang('en')} className={`py-2 font-semibold ${activeLang === 'en' ? 'bg-white text-black rounded-l' : 'text-gray-600'}`}>English</button>
                        <button type="button" onClick={() => setActiveLang('ar')} className={`py-2 font-semibold ${activeLang === 'ar' ? 'bg-white text-black rounded-r' : 'text-gray-600'}`}>العربية</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl" encType="multipart/form-data">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-alpha mb-2">Featured Image</label>
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
                    {/* Title Fields (toggle) */}
                    {activeLang === 'en' ? (
                        <div>
                            <label className="block text-sm font-medium text-alpha mb-2">Article Title (English)</label>
                            <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder="Enter English title" className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-0" />
                            {errors.title_en && (<p className="text-red-600 text-sm mt-1">{errors.title_en}</p>)}
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-alpha mb-2">عنوان المقال (العربية)</label>
                            <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} placeholder="أدخل العنوان بالعربية" className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-0" />
                            {errors.title_ar && (<p className="text-red-600 text-sm mt-1">{errors.title_ar}</p>)}
                        </div>
                    )}

                    {/* Description Editor (toggle) */}
                    {activeLang === 'en' ? (
                        <div>
                            <label className="block text-sm font-medium text-alpha mb-2">Article Description (English)</label>
                            <TiptapEditor key="desc-en" value={descriptionEn} onChange={setDescriptionEn} />
                            {errors.description_en && (<p className="text-red-600 text-sm mt-1">{errors.description_en}</p>)}
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-alpha mb-2">وصف المقال (العربية)</label>
                            <TiptapEditor key="desc-ar" value={descriptionAr} onChange={setDescriptionAr} />
                            {errors.description_ar && (<p className="text-red-600 text-sm mt-1">{errors.description_ar}</p>)}
                        </div>
                    )}

                    {/* Tags Input */}
                    <div>
                        <label className="block text-sm font-medium text-alpha mb-2">Tags</label>
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
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`bg-alpha hover:bg-beta text-white font-medium px-6 py-2.5 rounded ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? 'Saving...' : 'Save Article'}
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </AppSidebarLayout>
    );
};

export default CreateArticle;
