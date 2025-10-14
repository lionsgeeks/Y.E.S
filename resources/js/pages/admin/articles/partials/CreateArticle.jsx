import React from 'react';
import { Head } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';

const CreateArticle = () => {
    const breadcrumbs = [
        { title: 'Create Article', href: '/articles/create' },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Article" />
            <div className='px-5 py-8'>
            </div>
            
        </AppSidebarLayout>
    );
};

export default CreateArticle;
