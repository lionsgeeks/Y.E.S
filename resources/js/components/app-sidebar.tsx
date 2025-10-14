import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Building2, Users, UserCheck, Clipboard } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Sponsors',
        href: '/admin/sponsors',
        icon: Building2,
    },
    {
        title: 'Scientific Committee',
        href: '/admin/scientific-committees',
        icon: UserCheck,
    },
    {
        title: 'User Management',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Articles',
        href: '/admin/articles',
        icon: Clipboard,
    },
];

// Footer links to external repos/docs removed per design

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="gap-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="p-0 hover:bg-transparent active:bg-transparent focus-visible:ring-0">
                            <Link href={dashboard()} prefetch className="w-full">
                                <img
                                    src="/assets/images/yeslogo.png"
                                    alt="YES Logo"
                                    className="h-10 rounded-md object-contain"
                                />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                
            </SidebarFooter>
        </Sidebar>
    );
}
