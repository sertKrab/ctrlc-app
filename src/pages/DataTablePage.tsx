import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTable } from '@/hooks/useTable';
import { ROUTES } from '@/constants/routes';
import AppTabs from '@/components/data/AppTabs';
import AppTable from '@/components/data/AppTable';
import AppPagination from '@/components/data/AppPagination';
import AppBadge from '@/components/ui/AppBadge';
import AppButton from '@/components/ui/AppButton';
import AppCard from '@/components/ui/AppCard';
import AppModal from '@/components/ui/AppModal';
import AppTextField from '@/components/form/AppTextField';
import AppSelect from '@/components/form/AppSelect';
import type { ColumnDef } from '@/components/data/AppTableRow';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { SelectOption } from '@/types/common';
import { THEME_COLORS } from '@/theme';

type BadgeStatus = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'error';

interface CustomerRow extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  tax: string;
  branch: string;
  kyc: string;
  balance: number;
  updated: string;
}

const ALL_CUSTOMERS: CustomerRow[] = [
  { id: 'CUS-1042', name: 'บจก. สยามมั่นคง', email: 'finance@siammankong.co.th', tax: '0105561012345', branch: 'BKK-01', kyc: 'active', balance: 4128950.40, updated: '25/03/2568' },
  { id: 'CUS-1041', name: 'บมจ. กรุงไทยพาณิชย์', email: 'ap@krungthai-trading.com', tax: '0107542009876', branch: 'BKK-02', kyc: 'active', balance: 18900200, updated: '25/03/2568' },
  { id: 'CUS-1040', name: 'หจก. ไทยรุ่งเรือง', email: 'admin@thairungrueng.th', tax: '0103559876543', branch: 'CNX-01', kyc: 'pending', balance: 220500, updated: '24/03/2568' },
  { id: 'CUS-1039', name: 'บจก. สมาร์ทเทค โซลูชั่นส์', email: 'ops@smarttech.co.th', tax: '0105563087712', branch: 'BKK-01', kyc: 'active', balance: 78250, updated: '24/03/2568' },
  { id: 'CUS-1038', name: 'บจก. ลานนาฟู้ดส์', email: 'contact@lannafoods.com', tax: '0505562001234', branch: 'CNX-01', kyc: 'inactive', balance: 450120.75, updated: '23/03/2568' },
  { id: 'CUS-1037', name: 'บจก. ภูเก็ตเทรดดิ้ง', email: 'th@phukettrading.com', tax: '0835561556677', branch: 'BKK-01', kyc: 'active', balance: 1224000, updated: '23/03/2568' },
  { id: 'CUS-1036', name: 'บจก. นครชัยพัฒนา', email: 'kc@nakhonchai.co.th', tax: '0215562778899', branch: 'BKK-02', kyc: 'error', balance: 12500, updated: '22/03/2568' },
  { id: 'CUS-1035', name: 'บจก. เอเชียอินเตอร์เทรด', email: 'office@asiaintertrade.com', tax: '0809562112233', branch: 'BKK-01', kyc: 'active', balance: 890450, updated: '22/03/2568' },
  { id: 'CUS-1034', name: 'บจก. กรีนเอนเนอร์จี', email: 'finance@greenenergy.th', tax: '0612557654321', branch: 'BKK-02', kyc: 'active', balance: 5680300, updated: '21/03/2568' },
  { id: 'CUS-1033', name: 'บจก. ทองคำเพชรไพลิน', email: 'admin@tkpp.co.th', tax: '0301562443322', branch: 'BKK-01', kyc: 'pending', balance: 34870, updated: '21/03/2568' },
  { id: 'CUS-1032', name: 'หจก. อยุธยาเกษตร', email: 'farm@ayaagri.th', tax: '0145561998877', branch: 'BKK-01', kyc: 'active', balance: 210000, updated: '20/03/2568' },
  { id: 'CUS-1031', name: 'บจก. ขอนแก่นมาร์เก็ตติ้ง', email: 'sales@kkmarketing.co.th', tax: '0405562110099', branch: 'BKK-01', kyc: 'active', balance: 670200, updated: '20/03/2568' },
];

const KYC_STATUS_MAP: Record<string, BadgeStatus> = {
  active: 'active', pending: 'pending', inactive: 'inactive',
  error: 'error', approved: 'approved', rejected: 'rejected',
};

const BRANCH_OPTIONS: SelectOption[] = [
  { value: '', label: 'ทุกสาขา' },
  { value: 'BKK-01', label: 'BKK-01' },
  { value: 'BKK-02', label: 'BKK-02' },
  { value: 'CNX-01', label: 'CNX-01' },
  { value: 'HKT-01', label: 'HKT-01' },
];

const TABS = [
  { label: 'ทั้งหมด', value: 'all', count: 12 },
  { label: 'ใช้งาน', value: 'active', count: 8 },
  { label: 'รอตรวจสอบ', value: 'pending', count: 2 },
  { label: 'ปิดใช้งาน', value: 'inactive', count: 1 },
  { label: 'ผิดพลาด', value: 'error', count: 1 },
];

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2 });

export default function DataTablePage() {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const table = useTable(10);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<CustomerRow | null>(null);

  const filtered = useMemo(() => {
    let rows = ALL_CUSTOMERS;
    if (activeTab !== 'all') rows = rows.filter((r) => r.kyc === activeTab);
    if (search) rows = rows.filter((r) => r.name.includes(search) || r.id.includes(search) || r.tax.includes(search));
    if (branch) rows = rows.filter((r) => r.branch === branch);
    if (table.sort) {
      const { field, order } = table.sort;
      rows = [...rows].sort((a, b) => {
        const av = a[field], bv = b[field];
        const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
        return order === 'asc' ? cmp : -cmp;
      });
    }
    return rows;
  }, [activeTab, search, branch, table.sort]);

  const pageRows = filtered.slice((table.page - 1) * table.size, table.page * table.size);

  const COLUMNS: ColumnDef<CustomerRow>[] = [
    {
      key: 'id', label: 'รหัสลูกค้า', width: 110,
      render: (value) => (
        <Link
          component="button"
          onClick={() => navigate(`${ROUTES.CUSTOMERS_EDIT}/${String(value)}`)}
          sx={{ fontSize: '0.8125rem', fontWeight: 500, color: THEME_COLORS.primary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, background: 'none', border: 'none', cursor: 'pointer', p: 0 }}
        >
          {String(value)}
        </Link>
      ),
    },
    {
      key: 'name', label: 'ชื่อลูกค้า', sortable: true,
      render: (_value, row) => (
        <Box>
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 500, color: '#1A1A2E' }}>{row.name as string}</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#6B7280' }}>{row.email as string}</Typography>
        </Box>
      ),
    },
    { key: 'tax', label: 'เลขผู้เสียภาษี', width: 140 },
    { key: 'branch', label: 'สาขา', width: 90 },
    {
      key: 'kyc', label: 'สถานะ KYC', width: 120,
      render: (value) => <AppBadge status={KYC_STATUS_MAP[String(value)] ?? 'inactive'} />,
    },
    {
      key: 'balance', label: 'ยอดคงเหลือ (THB)', width: 150, sortable: true,
      render: (value) => (
        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.8125rem', fontWeight: 500 }}>
          ฿{fmt(Number(value))}
        </Typography>
      ),
    },
    { key: 'updated', label: 'อัพเดตล่าสุด', width: 120, sortable: true },
  ];

  function handleSort(key: string) {
    const current = table.sort;
    if (current?.field === key) {
      table.setSort({ field: key, order: current.order === 'asc' ? 'desc' : 'asc' });
    } else {
      table.setSort({ field: key, order: 'asc' });
    }
  }

  function handleTabChange(val: string) {
    setActiveTab(val);
    table.setPage(1);
    setSelectedIds([]);
  }

  function handleDelete() {
    setDeleteTarget(null);
    setSelectedIds([]);
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '1.375rem', color: '#1A1A2E' }}>ลูกค้านิติบุคคล</Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#6B7280', mt: 0.25 }}>{filtered.length} รายการ</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <AppButton variant="ghost">นำเข้า CSV</AppButton>
          <AppButton variant="ghost">ส่งออก</AppButton>
          <AppButton variant="primary">เพิ่มลูกค้าใหม่</AppButton>
        </Box>
      </Box>

      <AppCard noPadding>
        {/* Tabs */}
        <Box sx={{ px: 2, pt: 1 }}>
          <AppTabs tabs={TABS} value={activeTab} onChange={handleTabChange} />
        </Box>

        {/* Search + filter */}
        <Box sx={{ display: 'flex', gap: 2, p: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Box sx={{ flex: 2, minWidth: 220 }}>
            <AppTextField
              label=""
              name="search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); table.setPage(1); }}
              placeholder="ค้นหาชื่อลูกค้า, รหัส, เลขผู้เสียภาษี..."
            />
          </Box>
          <Box sx={{ width: 180 }}>
            <AppSelect
              label=""
              name="branch"
              value={branch}
              onChange={(e: SelectChangeEvent<string | number>) => { setBranch(String(e.target.value)); table.setPage(1); }}
              options={BRANCH_OPTIONS}
            />
          </Box>
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '0.8125rem', color: '#6B7280' }}>{filtered.length} รายการ</Typography>
            <AppButton variant="ghost" icon={GridViewOutlinedIcon}>มุมมอง</AppButton>
          </Box>
        </Box>

        {/* Bulk action bar */}
        {selectedIds.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1, backgroundColor: THEME_COLORS.primaryLight, borderBottom: '1px solid #CCE3FF', flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: THEME_COLORS.primary }}>เลือก {selectedIds.length} รายการ</Typography>
            <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
              <AppButton variant="ghost" size="sm">ส่งออก</AppButton>
              <AppButton variant="ghost" size="sm">อนุมัติ</AppButton>
              <AppButton variant="ghost" size="sm">ระงับ</AppButton>
              <AppButton variant="danger" size="sm" onClick={() => setDeleteTarget({ id: selectedIds.join(', '), name: `${selectedIds.length} รายการ` } as CustomerRow)}>ลบ</AppButton>
            </Box>
          </Box>
        )}

        {/* Table */}
        <AppTable<CustomerRow>
          columns={COLUMNS}
          rows={pageRows}
          idKey="id"
          checkable
          selectedIds={selectedIds}
          onSelectChange={setSelectedIds}
          onSort={handleSort}
          sortKey={table.sort?.field}
          sortOrder={table.sort?.order ?? 'asc'}
          emptyTitle={t('empty.noData')}
          emptyDescription={t('empty.noResults')}
          rowActions={(row) => [
            { label: 'แก้ไข', onClick: () => navigate(`${ROUTES.CUSTOMERS_EDIT}/${row.id as string}`) },
            { label: 'ดูประวัติ', onClick: () => {} },
            { label: 'ระงับ', onClick: () => {}, divider: true },
            { label: 'ลบ', onClick: () => setDeleteTarget(row), danger: true },
          ]}
        />

        <AppPagination
          page={table.page}
          size={table.size}
          total={filtered.length}
          onPageChange={table.setPage}
          onSizeChange={table.setSize}
        />
      </AppCard>

      {/* Delete modal */}
      <AppModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title={t('confirm.deleteTitle')}
        actions={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <AppButton variant="ghost" onClick={() => setDeleteTarget(null)}>{t('button.cancel')}</AppButton>
            <AppButton variant="danger" onClick={handleDelete}>{t('button.delete')}</AppButton>
          </Box>
        }
      >
        <Typography sx={{ fontSize: '0.875rem' }}>
          {t('confirm.deleteMessage')}
          {deleteTarget && <><br /><strong>{deleteTarget.name as string}</strong></>}
        </Typography>
      </AppModal>
    </Box>
  );
}
