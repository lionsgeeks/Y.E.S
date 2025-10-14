import React from 'react';
import { Head } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';

const EditArticle = ({ article }) => {
    const breadcrumbs = [
        { title: 'Edit Article', href: '/articles/edit/'+article.id },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Article" />
            <div className='px-5 py-8'>
                {article.id}
            </div>

        </AppSidebarLayout>
    );
};

export default EditArticle;
