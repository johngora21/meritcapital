"use client";
import React from 'react';
import { Sidebar, type SidebarGroup } from '@/components';
import {
  LayoutDashboard,
  Rocket,
  CircleDollarSign,
  BriefcaseBusiness,
  BookOpen,
  Trophy,
  MessageSquare,
  Bell,
  Landmark,
  FolderPlus,
} from 'lucide-react';
import { FaUserTie, FaSignOutAlt } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';

type CurrentUser = { id: number; email: string; full_name: string; role: 'admin'|'mentor'|'investor'|'entrepreneur' } | null;

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = React.useState<CurrentUser>(null);
  const API_BASE = '';
  const isAuthPage = pathname === '/authentication/login' || pathname?.startsWith('/authentication');

  React.useEffect(() => {
    if (isAuthPage) return; // avoid fetching when on auth pages
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/auth/me`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data?.data || null);
        } else {
          setUser(null);
          if (pathname && pathname !== '/authentication/login') router.replace('/authentication/login');
        }
      } catch {
        setUser(null);
        if (pathname && pathname !== '/authentication/login') router.replace('/authentication/login');
      }
    };
    load();
  }, [pathname, router, isAuthPage, API_BASE]);

  const items: SidebarGroup[] = React.useMemo(() => {
    const base = [
      { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
      { id: 'projects', label: 'Projects', href: '/projects', icon: <FolderPlus size={20} /> },
      { id: 'crat', label: 'CRAT Tool', href: '/crat', icon: <BriefcaseBusiness size={20} /> },
      { id: 'funding', label: 'Opportunities', href: '/opportunities', icon: <CircleDollarSign size={20} /> },
      { id: 'entrepreneurs', label: 'Startups', href: '/entrepreneurs', icon: <Rocket size={20} /> },
      { id: 'resources', label: 'Resources', href: '/resources', icon: <BookOpen size={20} /> },
      { id: 'success', label: 'Success Stories', href: '/success-stories', icon: <Trophy size={20} /> },
    ];
    const role = user?.role;
    if (role === 'admin') {
      base.splice(5, 0, { id: 'mentors', label: 'Mentors', href: '/mentors', icon: <FaUserTie size={20} /> });
      base.splice(6, 0, { id: 'investors', label: 'Investors', href: '/investors', icon: <Landmark size={20} /> });
      base.splice(7, 0, { id: 'investments', label: 'Investments', href: '/investments', icon: <CircleDollarSign size={20} /> });
      base.splice(8, 0, { id: 'reviews', label: 'Project Reviews', href: '/reviews', icon: <BriefcaseBusiness size={20} /> });
      base.splice(9, 0, { id: 'admin-system', label: 'Admin System', href: '/admin', icon: <Landmark size={20} /> });
    } else if (role === 'mentor') {
      base.splice(5, 0, { id: 'mentors', label: 'Mentors', href: '/mentors', icon: <FaUserTie size={20} /> });
      base.splice(6, 0, { id: 'reviews', label: 'Project Reviews', href: '/reviews', icon: <BriefcaseBusiness size={20} /> });
    } else if (role === 'investor') {
      base.splice(5, 0, { id: 'investors', label: 'Investors', href: '/investors', icon: <Landmark size={20} /> });
      base.splice(6, 0, { id: 'investments', label: 'Investments', href: '/investments', icon: <CircleDollarSign size={20} /> });
    }
    return [{ id: 'main', items: base }];
  }, [user]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <Sidebar
      productName="merit capital"
      logo={<div className="mc-logo">MC</div>}
      items={items}
      initialCollapsed={false}
      onNavigate={(href) => { if (href !== pathname) router.push(href); }}
      currentPath={pathname || ''}
      footerCta={{ label: 'Logout', icon: <FaSignOutAlt size={18} />, onClick: async () => { try { await fetch(`${API_BASE}/api/v1/auth/logout`, { method: 'POST', credentials: 'include' }); } catch {} finally { router.replace('/authentication/login'); } } }}
      header={{
        actions: (
          <>
            <button className="mc-icon-btn" aria-label="Chats" onClick={() => router.push('/chats')}>
              <MessageSquare size={18} />
            </button>
            <button className="mc-icon-btn" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <div className="mc-userchip">
              <div className="mc-userinfo">
                <span className="mc-username">{user?.full_name || 'Guest'}</span>
                <span className="mc-role">{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}</span>
              </div>
              <span className="mc-avatar">EC</span>
            </div>
          </>
        )
      }}
    >
      {children}
    </Sidebar>
  );
};

export default AppShell;


