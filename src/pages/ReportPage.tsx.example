import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import AppKpiCard from '@/components/data/AppKpiCard';
import AppCard from '@/components/ui/AppCard';
import AppButton from '@/components/ui/AppButton';
import AppTable from '@/components/data/AppTable';
import AppCheckbox from '@/components/form/AppCheckbox';
import AppTextField from '@/components/form/AppTextField';
import type { ColumnDef } from '@/components/data/AppTableRow';
import { THEME_COLORS } from '@/theme';

const DATE_RANGES = ['7วัน', '30วัน', '90วัน', 'ไตรมาส', 'ปีนี้', 'กำหนดเอง'] as const;
type DateRange = typeof DATE_RANGES[number];

const REVENUE_DATA = [
  4.2, 4.8, 5.1, 4.6, 5.4, 6.0, 5.8, 6.2, 6.9, 6.4,
  7.1, 7.6, 7.2, 7.8, 8.3, 8.1, 7.9, 8.5, 9.0, 8.7,
  9.3, 9.8, 9.5, 10.1, 10.6, 10.3, 10.9, 11.4, 11.0, 11.7,
].map((v, i) => ({
  day: `วันที่ ${i + 1}`,
  revenue: v,
  cost: [
    2.8, 3.1, 3.0, 3.2, 3.4, 3.6, 3.5, 3.7, 4.0, 3.9,
    4.2, 4.4, 4.3, 4.5, 4.7, 4.6, 4.5, 4.8, 5.0, 4.9,
    5.1, 5.3, 5.2, 5.5, 5.7, 5.6, 5.8, 6.0, 5.9, 6.2,
  ][i],
  prev: v * 0.82,
}));

const MONTH_DATA = [
  { label: 'ม.ค.', value: 68, secondary: 42 },
  { label: 'ก.พ.', value: 82, secondary: 51 },
  { label: 'มี.ค.', value: 110, secondary: 64 },
  { label: 'เม.ย.', value: 75, secondary: 48 },
  { label: 'พ.ค.', value: 91, secondary: 58 },
  { label: 'มิ.ย.', value: 118, secondary: 72 },
  { label: 'ก.ค.', value: 105, secondary: 65 },
  { label: 'ส.ค.', value: 98, secondary: 60 },
  { label: 'ก.ย.', value: 87, secondary: 55 },
  { label: 'ต.ค.', value: 120, secondary: 74 },
  { label: 'พ.ย.', value: 130, secondary: 80 },
  { label: 'ธ.ค.', value: 145, secondary: 90 },
];

const BRANCH_BREAKDOWN = [
  { label: 'BKK-01', value: 89, secondary: 54 },
  { label: 'BKK-02', value: 72, secondary: 41 },
  { label: 'BKK-03', value: 45, secondary: 28 },
  { label: 'CNX-01', value: 38, secondary: 22 },
  { label: 'HKT-01', value: 31, secondary: 18 },
  { label: 'KKC-01', value: 24, secondary: 14 },
];

interface TxnTypeRow extends Record<string, unknown> {
  type: string;
  count: number;
  value: number;
  pct: string;
}

const TXN_TYPES: TxnTypeRow[] = [
  { type: 'โอนเงินภายใน', count: 5241, value: 98400000, pct: '41.2%' },
  { type: 'ชำระเจ้าหนี้', count: 3180, value: 72100000, pct: '30.1%' },
  { type: 'ชำระเงินเดือน', count: 1620, value: 42000000, pct: '17.5%' },
  { type: 'ต่างประเทศ', count: 420, value: 18200000, pct: '7.6%' },
  { type: 'อื่นๆ', count: 200, value: 7700000, pct: '3.6%' },
];

const TXN_COLUMNS: ColumnDef<TxnTypeRow>[] = [
  { key: 'type', label: 'ประเภท' },
  { key: 'count', label: 'จำนวน', render: (v) => Number(v).toLocaleString() },
  {
    key: 'value', label: 'มูลค่า (THB)',
    render: (v) => (
      <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.8125rem' }}>
        ฿{Number(v).toLocaleString('en-US', { minimumFractionDigits: 0 })}
      </Typography>
    ),
  },
  { key: 'pct', label: 'สัดส่วน (%)' },
];

const maxBranch = Math.max(...BRANCH_BREAKDOWN.map((b) => b.value));

export default function ReportPage() {
  const [activeRange, setActiveRange] = useState<DateRange>('30วัน');
  const [showCustom, setShowCustom] = useState(false);
  const [compare, setCompare] = useState(false);
  const [dateFrom, setDateFrom] = useState('2025-02-25');
  const [dateTo, setDateTo] = useState('2025-03-25');

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '1.375rem', color: '#1A1A2E' }}>รายงานการดำเนินการ</Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#6B7280', mt: 0.25 }}>รอบ 30 วันล่าสุด · 25 ก.พ. - 25 มี.ค. 2568</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <AppButton variant="ghost">ตั้งเวลาส่งอีเมล</AppButton>
          <AppButton variant="ghost">พิมพ์</AppButton>
          <AppButton variant="primary">ส่งออก PDF</AppButton>
        </Box>
      </Box>

      {/* Date range row */}
      <AppCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {DATE_RANGES.map((r) => (
              <Chip
                key={r}
                label={r}
                onClick={() => { setActiveRange(r); setShowCustom(r === 'กำหนดเอง'); }}
                sx={{
                  fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer',
                  backgroundColor: activeRange === r ? THEME_COLORS.primary : 'transparent',
                  color: activeRange === r ? '#fff' : '#6B7280',
                  border: activeRange === r ? 'none' : '1px solid #E5E7EB',
                  '&:hover': { backgroundColor: activeRange === r ? '#0A6BDB' : '#F5F7FA' },
                }}
              />
            ))}
          </Box>
          {showCustom && (
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <AppTextField label="" name="dateFrom" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              <Typography sx={{ color: '#6B7280' }}>-</Typography>
              <AppTextField label="" name="dateTo" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </Box>
          )}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
            <AppCheckbox
              label="เปรียบเทียบช่วงก่อนหน้า"
              name="compare"
              checked={compare}
              onChange={(e) => setCompare(e.target.checked)}
            />
            <AppButton variant="ghost">ตัวกรอง</AppButton>
          </Box>
        </Box>
      </AppCard>

      {/* Row 1 — KPI cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <AppKpiCard title="รายได้รวม" value="฿238.4M" trend="+12.8%" trendLabel="เทียบช่วงก่อน" sparklineData={[180, 190, 195, 205, 215, 225, 238.4]} />
        </Grid>
        <Grid item xs={12} md={3}>
          <AppKpiCard title="ต้นทุนรวม" value="฿138.2M" trend="+8.2%" trendLabel="เทียบช่วงก่อน" sparklineData={[110, 115, 118, 122, 128, 133, 138.2]} />
        </Grid>
        <Grid item xs={12} md={3}>
          <AppKpiCard title="กำไรสุทธิ์" value="฿100.2M" trend="+18.4%" trendLabel="เทียบช่วงก่อน" sparklineData={[72, 75, 78, 82, 88, 94, 100.2]} />
        </Grid>
        <Grid item xs={12} md={3}>
          <AppKpiCard title="จำนวนธุรกรรม" value="12,481" trend="-2.1%" trendLabel="เทียบช่วงก่อน" sparklineData={[13200, 13000, 12900, 12800, 12700, 12600, 12481]} />
        </Grid>
      </Grid>

      {/* Row 2 — Line chart */}
      <AppCard title="รายได้และต้นทุน 30 วันล่าสุด" sx={{ mb: 3 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={REVENUE_DATA} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} interval={4} />
            <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}M`} />
            <Tooltip
              formatter={(value, name) => {
                const labels: Record<string, string> = { revenue: 'รายได้', cost: 'ต้นทุน', prev: 'ช่วงก่อนหน้า' };
                const v = typeof value === 'number' ? value.toFixed(1) : '0';
                return [`${v}M ล้านบาท`, labels[String(name)] ?? String(name)] as [string, string];
              }}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }}
            />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            <Line type="monotone" dataKey="revenue" name="รายได้" stroke={THEME_COLORS.primary} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="cost" name="ต้นทุน" stroke="#F59E0B" strokeWidth={2} dot={false} />
            {compare && (
              <Line type="monotone" dataKey="prev" name="ช่วงก่อนหน้า" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </AppCard>

      {/* Row 3 — Bar chart */}
      <AppCard title="ปริมาณธุรกรรมรายเดือน" sx={{ mb: 3 }}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={MONTH_DATA} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }} cursor={{ fill: 'rgba(13,127,255,0.04)' }} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            <Bar dataKey="value" name="เข้า" fill={THEME_COLORS.primary} radius={[3, 3, 0, 0]} />
            <Bar dataKey="secondary" name="ออก" fill={THEME_COLORS.secondary} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </AppCard>

      {/* Row 4 — Branch breakdown + TxnType table */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <AppCard title="ยอดรายสาขา">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {BRANCH_BREAKDOWN.map((b) => (
                <Box key={b.label}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography sx={{ fontSize: '0.8125rem', fontWeight: 500, color: '#1A1A2E' }}>{b.label}</Typography>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#6B7280' }}>{b.value}</Typography>
                  </Box>
                  <Box sx={{ height: 8, backgroundColor: '#F3F4F6', borderRadius: 4, overflow: 'hidden' }}>
                    <Box sx={{ width: `${(b.value / maxBranch) * 100}%`, height: '100%', backgroundColor: THEME_COLORS.primary, borderRadius: 4 }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </AppCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <AppCard title="ประเภทธุรกรรม" noPadding>
            <AppTable<TxnTypeRow>
              columns={TXN_COLUMNS}
              rows={TXN_TYPES}
              idKey="type"
              emptyTitle="ไม่มีข้อมูล"
            />
          </AppCard>
        </Grid>
      </Grid>
    </Box>
  );
}
