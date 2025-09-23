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

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const items: SidebarGroup[] = React.useMemo(() => [
    { id: 'main', items: [
      { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
      { id: 'projects', label: 'Projects', href: '/projects', icon: <FolderPlus size={20} /> },
      { id: 'crat', label: 'CRAT Tool', href: '/crat', icon: <BriefcaseBusiness size={20} /> },
      { id: 'funding', label: 'Opportunities', href: '/opportunities', icon: <CircleDollarSign size={20} /> },
      { id: 'entrepreneurs', label: 'Startups', href: '/entrepreneurs', icon: <Rocket size={20} /> },
      { id: 'mentors', label: 'Mentors', href: '/mentors', icon: <FaUserTie size={20} /> },
      { id: 'investors', label: 'Investors', href: '/investors', icon: <Landmark size={20} /> },
      { id: 'resources', label: 'Resources', href: '/resources', icon: <BookOpen size={20} /> },
      { id: 'success', label: 'Success Stories', href: '/success-stories', icon: <Trophy size={20} /> },
    ]}
  ], []);

  return (
    <Sidebar
      productName="merit capital"
      logo={<div className="mc-logo">MC</div>}
      items={items}
      initialCollapsed={false}
      onNavigate={(href) => { if (href !== pathname) router.push(href); }}
      currentPath={pathname || ''}
      footerCta={{ label: 'Logout', icon: <FaSignOutAlt size={18} />, onClick: () => alert('Logged out') }}
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
                <span className="mc-username">Escobar</span>
                <span className="mc-role">Admin</span>
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


