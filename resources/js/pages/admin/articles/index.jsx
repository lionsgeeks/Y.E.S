import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs = [
    { title: 'Articles', href: '/admin/articles' },
];

const Articles = ({ articles }) => {
    const selectedLanguage = 'en';


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Articles" />

            <div className='px-5 py-8 flex flex-col gap-10'>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Article Management</h1>
                        <p className="text-gray-600 mt-2">{articles.length} Articles</p>
                    </div>
                    <Link href={'/admin/article/create'}>
                        <Button className="bg-[#2e539d] hover:bg-[#1e3d7a] text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Article
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <Link key={article.id} href={'/admin/article/edit/' + article.id}>
                            <Card
                                className="hover:shadow-lg cursor-pointer transition-shadow rounded-lg overflow-hidden border border-gray-200 bg-white"
                            >
                                {/* Image */}
                                {article.image && (
                                    <img
                                        src={article.image}
                                        alt={article.title.en}
                                        className="w-full h-28 sm:h-32 md:h-36 object-cover"
                                    />
                                )}

                                {/* Header */}
                                <CardHeader className="px-4 py-2">
                                    <CardTitle className="text-md sm:text-lg font-semibold truncate">
                                        {article.title.en}
                                    </CardTitle>
                                    <CardDescription className="text-sm text-gray-500 mt-1 line-clamp-3">
                                        <div
                                            dangerouslySetInnerHTML={{ __html: article.description.en }}
                                            className="text-sm text-gray-600"
                                        />
                                    </CardDescription>
                                </CardHeader>

                                {/* Footer */}
                                <CardContent className="px-4 flex justify-between items-center text-xs sm:text-sm text-gray-500">
                                    <span>Created: {new Date(article.created_at).toLocaleDateString()}</span>
                                    <Button
                                        className="bg-red-500 hover:bg-red-500/90"
                                        onClick={(e) => {
                                            e.stopPropagation(); // prevent opening edit dialog
                                        }}
                                    >
                                        <Trash2 color="#fff" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Articles;
