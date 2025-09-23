import React from 'react';
import { SidebarGroup } from './Sidebar.types';

type Props = {
  group: SidebarGroup;
  collapsed: boolean;
  onNavigate?: (href: string) => void;
  currentPath?: string;
};

export const SidebarItem: React.FC<Props> = ({ group, collapsed, onNavigate, currentPath }) => {
  return (
    <div className="mc-nav-group">
      {group.label && !collapsed && (
        <div className="mc-nav-group__label">{group.label}</div>
      )}
      <ul className="mc-nav-list">
        {group.items.map((link) => {
          const handleClick = () => {
            if (link.onClick) link.onClick();
            if (link.href && onNavigate) onNavigate(link.href);
          };
          const isActive = !!(currentPath && link.href && currentPath === link.href);
          return (
            <li key={link.id}>
              <button
                className={isActive ? 'mc-nav-link mc-nav-link--active' : 'mc-nav-link'}
                aria-label={link.label}
                onClick={handleClick}
              >
                {link.icon && <span className="mc-nav-link__icon">{link.icon}</span>}
                {!collapsed && <span className="mc-nav-link__label">{link.label}</span>}
                {!collapsed && link.badgeText && (
                  <span className="mc-badge">{link.badgeText}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarItem;


