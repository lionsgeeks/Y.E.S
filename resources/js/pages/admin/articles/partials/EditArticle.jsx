import React, { useEffect, useMemo, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import TiptapEditor from './TiptapEditor';
import { X } from 'lucide-react';

const EditArticle = ({ article }) => {
    const breadcrumbs = [
        { title: 'Edit Article', href: '/articles/edit/'+article.id },
    ];

    const [activeLang, setActiveLang] = useState('en');
    const [titleEn, setTitleEn] = useState(article?.title?.en || '');
    const [titleAr, setTitleAr] = useState(article?.title?.ar || '');
    const [descriptionEn, setDescriptionEn] = useState(article?.description?.en || '');
    const [descriptionAr, setDescriptionAr] = useState(article?.description?.ar || '');
    const initialTags = useMemo(() => {
        const t = article?.tags?.en;
        if (Array.isArray(t)) return t;
        if (typeof t === 'string') return t.split(',').map(s => s.trim()).filter(Boolean);
        return [];
    }, [article]);
    const [tags, setTags] = useState(initialTags);
    const [tagInput, setTagInput] = useState('');
    const [image, setImage] = useState(null);
    const initialPreview = useMemo(() => {
        const value = article?.image;
        if (!value) return '';
        return /^https?:\/\//i.test(value) ? value : `/storage/${String(value).replace(/^\/?storage\//, '')}`;
    }, [article]);
    const [preview, setPreview] = useState(initialPreview);
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
        if (titleEn) formData.append('title_en', titleEn);
        if (titleAr) formData.append('title_ar', titleAr);
        if (descriptionEn) formData.append('description_en', descriptionEn);
        if (descriptionAr) formData.append('description_ar', descriptionAr);
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
                <div className="max-w-4xl mx-auto bg-white text-black border border-gray-200 rounded-lg shadow p-6">
                <h1 className="text-2xl font-semibold mb-6">Create An Article:</h1>
                {/* Language Toggle */}
                <div className="w-full bg-gray-100 rounded border border-gray-200 mb-4">
                    <div className="grid grid-cols-2">
                        <button type="button" onClick={() => setActiveLang('en')} className={`py-2 font-semibold ${activeLang === 'en' ? 'bg-white text-alpha rounded-l' : 'text-gray-600'}`}>English</button>
                        <button type="button" onClick={() => setActiveLang('ar')} className={`py-2 font-semibold ${activeLang === 'ar' ? 'bg-white text-alpha rounded-r' : 'text-gray-600'}`}>العربية</button>
                    </div>
                </div>

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
                    {activeLang === 'en' ? (
                        <div>
                            <label className="block text-sm font-medium text-alpha mb-2">Article Title (English)</label>
                            <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder="Enter English title" className="w-full rounded border border-gray-300 p-2 focus:border-beta focus:ring-0" />
                            {errors.title_en && (<p className="text-red-600 text-sm mt-1">{errors.title_en}</p>)}
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-alpha mb-2">عنوان المقال (العربية)</label>
                            <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} placeholder="أدخل العنوان بالعربية" className="w-full rounded border border-gray-300 p-2 focus:border-beta focus:ring-0" />
                            {errors.title_ar && (<p className="text-red-600 text-sm mt-1">{errors.title_ar}</p>)}
                        </div>
                    )}
                    {activeLang === 'en' ? (
                        <div>
                            <label className="block text-sm font-medium text-alpha mb-2">Article Description (English)</label>
                            <TiptapEditor key={`desc-en-${article.id}`} value={descriptionEn} onChange={setDescriptionEn} />
                            {errors.description_en && (<p className="text-red-600 text-sm mt-1">{errors.description_en}</p>)}
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-alpha mb-2">وصف المقال (العربية)</label>
                            <TiptapEditor key={`desc-ar-${article.id}`} value={descriptionAr} onChange={setDescriptionAr} />
                            {errors.description_ar && (<p className="text-red-600 text-sm mt-1">{errors.description_ar}</p>)}
                        </div>
                    )}
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
                    <div className="flex justify-center">
                        <button type="submit" disabled={submitting} className={`bg-alpha hover:bg-beta text-white font-medium px-6 py-2.5 rounded ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}>
                            {submitting ? 'Saving...' : 'Update Article'}
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </AppSidebarLayout>
    );
};

export default EditArticle;
