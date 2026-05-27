import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Badge from '@mui/material/Badge';
import { THEME_COLORS } from '@/theme';

interface TabItem {
  label: string;
  value: string;
  count?: number;
}

interface AppTabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
}

export default function AppTabs({ tabs, value, onChange }: AppTabsProps) {
  return (
    <Tabs
      value={value}
      onChange={(_e, newValue: string) => onChange(newValue)}
      sx={{
        borderBottom: '1px solid #E5E7EB',
        '& .MuiTabs-indicator': { backgroundColor: THEME_COLORS.primary, height: 2 },
      }}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={
            tab.count !== undefined ? (
              <Badge
                badgeContent={tab.count}
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: 10, minWidth: 16, height: 16,
                    top: -2, right: -10,
                  },
                }}
              >
                {tab.label}
              </Badge>
            ) : (
              tab.label
            )
          }
          sx={{
            fontSize: '0.8125rem',
            fontWeight: 500,
            textTransform: 'none',
            minHeight: 44,
            color: '#6B7280',
            '&.Mui-selected': { color: THEME_COLORS.primary, fontWeight: 600 },
          }}
        />
      ))}
    </Tabs>
  );
}
