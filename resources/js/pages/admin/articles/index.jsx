import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const breadcrumbs = [
    { title: 'Articles', href: '/admin/articles' },
];

const Articles = ({ articles }) => {
    const [deleteId, setDeleteId] = useState(null); // store ID of article to delete
    const [openDelete, setOpenDelete] = useState(false);
    const selectedLanguage = 'en';

    // 🧹 delete function
    const deleteArticle = (id) => {
        router.delete('/admin/article/destroy/' + id , {
            preserveScroll: true,
            onSuccess: () => {
                setOpenDelete(false);
                setDeleteId(null);
            },
            onError: () => alert('Failed to delete article.'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Articles" />

            <div className="px-5 py-8 flex flex-col gap-10">
                {/* Header Section */}
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

                {/* Articles Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <Card
                            key={article.id}
                            className="hover:shadow-lg cursor-pointer transition-shadow rounded-lg overflow-hidden border border-gray-200 bg-white"
                            onClick={() => router.visit(`/admin/article/edit/${article.id}`)}
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
                                    className="bg-red-500 hover:bg-red-500/90 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDeleteId(article.id);
                                        setOpenDelete(true);
                                    }}
                                >
                                    <Trash2 color="#fff" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* 🧱 Delete Confirmation Dialog */}
            <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. It will permanently delete the selected article.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenDelete(false)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => deleteArticle(deleteId)}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
};

export default Articles;
