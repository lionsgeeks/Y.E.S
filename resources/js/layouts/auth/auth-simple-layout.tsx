import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#FDFDFC] via-white to-[#f8f9fa] p-6 md:p-10">
            <div className="w-full max-w-md">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-6">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-3 font-medium group"
                        >
                            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--alpha)] to-[var(--beta)] shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                <AppLogoIcon className="size-10 fill-current text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-3 text-center">
                            <h1 className="text-2xl font-semibold text-[var(--alpha)]">{title}</h1>
                            <p className="text-center text-sm text-gray-600 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
