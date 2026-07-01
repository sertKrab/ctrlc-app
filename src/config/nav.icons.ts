/**
 * Curated icon registry for sidebar navigation. Codegen (gen_nav_config) picks
 * icons ONLY from this allow-list by key — it never imports icon components
 * directly. This keeps icon selection low-risk: a wrong/typo'd key is caught
 * by TypeScript (`NavIconKey`), whereas a wrong import path fails silently
 * differently or bloats the bundle with one-off icon imports.
 *
 * To add a new icon, import it below and add its key here.
 */
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export const NAV_ICON_MAP = {
  dashboard: DashboardOutlinedIcon,
  people: PeopleOutlinedIcon,
  assessment: AssessmentOutlinedIcon,
  settings: SettingsOutlinedIcon,
  receipt: ReceiptOutlinedIcon,
  cart: ShoppingCartOutlinedIcon,
  inventory: InventoryOutlinedIcon,
  document: DescriptionOutlinedIcon,
  chart: BarChartOutlinedIcon,
  category: CategoryOutlinedIcon,
  shipping: LocalShippingOutlinedIcon,
  finance: AccountBalanceOutlinedIcon,
  notifications: NotificationsOutlinedIcon,
  group: GroupOutlinedIcon,
  folder: FolderOutlinedIcon,
  assignment: AssignmentOutlinedIcon,
  payment: PaymentOutlinedIcon,
  storefront: StorefrontOutlinedIcon,
  business: BusinessOutlinedIcon,
  calendar: CalendarTodayOutlinedIcon,
  work: WorkOutlineIcon,
  home: HomeOutlinedIcon,
  timeline: TimelineOutlinedIcon,
  task: TaskAltOutlinedIcon,
  warehouse: WarehouseOutlinedIcon,
  pointOfSale: PointOfSaleOutlinedIcon,
} satisfies Record<string, ComponentType<SvgIconProps>>;

export type NavIconKey = keyof typeof NAV_ICON_MAP;
