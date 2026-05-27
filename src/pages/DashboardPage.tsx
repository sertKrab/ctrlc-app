import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import AppKpiCard from '@/components/data/AppKpiCard';
import AppCard from '@/components/ui/AppCard';
import AppTable from '@/components/data/AppTable';
import AppPagination from '@/components/data/AppPagination';
import AppBadge from '@/components/ui/AppBadge';
import AppButton from '@/components/ui/AppButton';
import type { ColumnDef } from '@/components/data/AppTableRow';
import { THEME_COLORS } from '@/theme';

const WEEK_DATA = [
  { label: 'จ.', value: 42, secondary: 28 },
  { label: 'อ.', value: 58, secondary: 35 },
  { label: 'พ.', value: 71, secondary: 41 },
  { label: 'พฤ.', value: 49, secondary: 32 },
  { label: 'ศ.', value: 88, secondary: 52 },
  { label: 'ส.', value: 33, secondary: 18 },
  { label: 'อา.', value: 22, secondary: 12 },
];

const PENDING_ITEMS = [
  { id: 1, name: 'บจก. สยามมั่นคง', amount: '฿12,450', time: '14:22' },
  { id: 2, name: 'บมจ. กรุงไทยพาณิชย์', amount: '฿3,890', time: '13:08' },
  { id: 3, name: 'หจก. ไทยรุ่งเรือง', amount: '฿128,000', time: '11:30' },
  { id: 4, name: 'บจก. สมาร์ทเทค', amount: '฿7,250', time: '09:12' },
  { id: 5, name: 'บจก. ลานนาฟู้ดส์', amount: '฿45,120', time: '08:55' },
];

type BadgeStatus = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'error';

interface TxnRow extends Record<string, unknown> {
  id: string;
  date: string;
  counterparty: string;
  account: string;
  amount: number;
  status: string;
}

const TXNS: TxnRow[] = [
  { id: 'TXN-00421', date: '25/03/2568 14:22', counterparty: 'บจก. สยามมั่นคง', account: '123-4-56789-0', amount: 12450, status: 'active' },
  { id: 'TXN-00420', date: '25/03/2568 13:08', counterparty: 'บมจ. กรุงไทยพาณิชย์', account: '003-1-22910-4', amount: 3890.50, status: 'pending' },
  { id: 'TXN-00419', date: '24/03/2568 16:45', counterparty: 'หจก. ไทยรุ่งเรือง', account: '402-9-87654-1', amount: 128000, status: 'active' },
  { id: 'TXN-00418', date: '24/03/2568 11:30', counterparty: 'บจก. สมาร์ทเทค โซลูชั่นส์', account: '511-2-33445-8', amount: 7250, status: 'error' },
  { id: 'TXN-00417', date: '24/03/2568 09:12', counterparty: 'บจก. ลานนาฟู้ดส์', account: '108-6-11223-3', amount: 45120.75, status: 'active' },
  { id: 'TXN-00416', date: '23/03/2568 17:00', counterparty: 'บจก. ภูเก็ตเทรดดิ้ง', account: '984-1-00112-5', amount: 22000, status: 'approved' },
  { id: 'TXN-00415', date: '23/03/2568 14:10', counterparty: 'บจก. นครชัยพัฒนา', account: '001-9-44556-2', amount: 5500, status: 'pending' },
  { id: 'TXN-00414', date: '23/03/2568 10:30', counterparty: 'บจก. เอเชียอินเตอร์เทรด', account: '773-2-00987-1', amount: 890450, status: 'active' },
  { id: 'TXN-00413', date: '22/03/2568 16:55', counterparty: 'บจก. กรีนเอนเนอร์จี', account: '432-5-11100-9', amount: 56803, status: 'approved' },
  { id: 'TXN-00412', date: '22/03/2568 09:00', counterparty: 'บจก. ทองคำเพชรไพลิน', account: '512-0-98765-3', amount: 34870, status: 'pending' },
];

const STATUS_MAP: Record<string, BadgeStatus> = {
  active: 'active', pending: 'pending', approved: 'approved',
  error: 'error', rejected: 'rejected', inactive: 'inactive',
};

const TXN_COLUMNS: ColumnDef<TxnRow>[] = [
  { key: 'date', label: 'วันที่/เวลา', width: 160 },
  { key: 'id', label: 'เลขที่รายการ', width: 120 },
  { key: 'counterparty', label: 'ลูกค้า' },
  { key: 'account', label: 'เลขบัญชี', width: 140 },
  {
    key: 'amount', label: 'จำนวน (THB)', width: 140,
    render: (value) => (
      <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.8125rem', fontWeight: 500 }}>
        ฿{Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </Typography>
    ),
  },
  {
    key: 'status', label: 'สถานะ', width: 120,
    render: (value) => <AppBadge status={STATUS_MAP[String(value)] ?? 'inactive'} />,
  },
];

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2 });

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Box>
      {/* Page header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '1.375rem', color: '#1A1A2E' }}>แดชบอร์ด</Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#6B7280', mt: 0.25 }}>{today}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <AppButton variant="ghost">ส่งออกข้อมูล</AppButton>
          <AppButton variant="primary">เพิ่มลูกค้าใหม่</AppButton>
        </Box>
      </Box>

      {/* Row 1 — KPI cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <AppKpiCard
            title="ยอดคงเหลือรวม (THB)"
            value={`฿${fmt(24812950)}`}
            trend="+2.4%"
            trendLabel="เทียบเดือนก่อน"
            icon={AccountBalanceOutlinedIcon}
            sparklineData={[22, 24, 23, 25, 24, 26, 24.8]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppKpiCard
            title="ธุรกรรมวันนี้"
            value="128"
            trend="+14"
            trendLabel="รายการ"
            icon={SwapHorizOutlinedIcon}
            sparklineData={[95, 110, 105, 120, 115, 125, 128]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppKpiCard
            title="รออนุมัติ"
            value="12"
            trend="-3"
            trendLabel="รายการนอกเวลา"
            icon={HourglassEmptyOutlinedIcon}
            sparklineData={[18, 15, 16, 14, 13, 14, 12]}
          />
        </Grid>
      </Grid>

      {/* Row 2 — Chart + Pending */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <AppCard title="ปริมาณธุรกรรมรายสัปดาห์">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={WEEK_DATA} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }}
                  cursor={{ fill: 'rgba(13,127,255,0.05)' }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                <Bar dataKey="value" name="ขาเข้า" fill={THEME_COLORS.primary} radius={[3, 3, 0, 0]} />
                <Bar dataKey="secondary" name="ขาออก" fill={THEME_COLORS.secondary} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </AppCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <AppCard
            title="รายการรออนุมัติ"
            subtitle="12 รายการ"
            action={
              <Link href="#" sx={{ fontSize: '0.8125rem', color: THEME_COLORS.primary }}>ดูทั้งหมด</Link>
            }
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {PENDING_ITEMS.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ width: 32, height: 32, backgroundColor: THEME_COLORS.primaryLight, color: THEME_COLORS.primary, fontSize: '0.75rem', fontWeight: 700 }}>
                    {item.name.slice(0, 1)}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: '0.8125rem', fontWeight: 500, color: '#1A1A2E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#6B7280' }}>{item.amount}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 14, color: '#F59E0B' }} />
                    <Typography sx={{ fontSize: '0.75rem', color: '#6B7280' }}>{item.time}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </AppCard>
        </Grid>
      </Grid>

      {/* Row 3 — Recent transactions */}
      <AppCard title="ธุรกรรมล่าสุด" noPadding>
        <AppTable<TxnRow>
          columns={TXN_COLUMNS}
          rows={TXNS}
          idKey="id"
        />
        <AppPagination
          page={1}
          size={10}
          total={TXNS.length}
          onPageChange={() => {}}
          onSizeChange={() => {}}
        />
      </AppCard>
    </Box>
  );
}
