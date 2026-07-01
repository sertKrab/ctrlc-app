/**
 * Sidebar navigation data. `AppSidebar.tsx` is a generic renderer of
 * `NAV_CONFIG` and is never edited per-project — only this file changes.
 *
 * Codegen contract (gen_nav_config task): replace `NAV_CONFIG` below with
 * groups/items derived from the project's confirmed module list. Rules:
 *   - `icon` must be a key from `NAV_ICON_MAP` (see nav.icons.ts) — do not
 *     import icon components directly.
 *   - `labelKey` must exist under the `navigation` i18n namespace
 *     (src/locales/{th,en}/navigation.json) — add the matching key/value
 *     pairs in both locale files when adding an item.
 *   - `path` must be a route registered in `src/constants/routes.ts`.
 *   - `children` supports one level of nesting (submenu). Omit if the item
 *     has no children.
 *   - Keep the trailing "system" group (Settings, etc.) — it is rendered in
 *     a separate section from the main groups.
 */
import { ROUTES } from '@/constants/routes';
import type { NavIconKey } from './nav.icons';

export interface NavItem {
  path: string;
  labelKey: string;
  icon: NavIconKey;
  children?: NavItem[];
}

export interface NavGroup {
  titleKey: string;
  items: NavItem[];
}

export const NAV_CONFIG: NavGroup[] = [
  {
    titleKey: 'menu.groupMain',
    items: [
      { path: ROUTES.DASHBOARD, labelKey: 'menu.dashboard', icon: 'dashboard' },
    ],
  },
];

export const NAV_SYSTEM: NavGroup = {
  titleKey: 'menu.groupSystem',
  items: [{ path: ROUTES.SETTINGS, labelKey: 'menu.settings', icon: 'settings' }],
};
