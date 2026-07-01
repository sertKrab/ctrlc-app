import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import AppTabs from '@/components/data/AppTabs';
import AppCard from '@/components/ui/AppCard';
import AppButton from '@/components/ui/AppButton';
import AppTextField from '@/components/form/AppTextField';
import AppSelect from '@/components/form/AppSelect';
import AppCheckbox from '@/components/form/AppCheckbox';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { SelectOption } from '@/types/common';
import { THEME_COLORS } from '@/theme';

const LANG_OPTIONS: SelectOption[] = [
  { value: 'th', label: 'ไทย' },
  { value: 'en', label: 'English' },
];
const TZ_OPTIONS: SelectOption[] = [
  { value: 'Asia/Bangkok', label: 'Asia/Bangkok GMT+7' },
  { value: 'UTC', label: 'UTC+0' },
];
const DATE_FORMAT_OPTIONS: SelectOption[] = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY พ.ศ.' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
];

const TABS = [
  { label: 'บัญชี', value: 'account' },
  { label: 'ความปลอดภัย', value: 'security' },
  { label: 'การแจ้งเตือน', value: 'notifications' },
];

const IP_LIST = ['192.168.1.100', '10.0.0.50', '203.150.12.88'];

const DEVICES = [
  { id: 1, name: 'MacBook Pro 16"', lastSeen: '25/03/2568 14:22', icon: LaptopMacOutlinedIcon },
  { id: 2, name: 'iPhone 15 Pro', lastSeen: '25/03/2568 08:10', icon: SmartphoneOutlinedIcon },
  { id: 3, name: 'Windows PC สำนักงาน', lastSeen: '24/03/2568 17:45', icon: LaptopMacOutlinedIcon },
];

export default function SettingsPage() {
  const { t, i18n } = useTranslation('auth');
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [profileName, setProfileName] = useState(
    user ? `${user.firstName} ${user.lastName}` : 'ผู้ดูแลระบบ',
  );
  const [phone, setPhone] = useState('0812345678');
  const [jobTitle, setJobTitle] = useState('System Administrator');
  const [lang, setLang] = useState(i18n.language);
  const [tz, setTz] = useState('Asia/Bangkok');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);
  const [notif, setNotif] = useState({ newTxn: true, pending: true, error: true, dailyReport: false });
  const [notifSms, setNotifSms] = useState({ newTxn: false, pending: true, error: true, dailyReport: false });

  const initials = (profileName ?? 'A').split(' ').map((w: string) => w[0] ?? '').slice(0, 2).join('').toUpperCase();
  const buildDate = '20250527';

  return (
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: '1.375rem', color: '#1A1A2E', mb: 3 }}>ตั้งค่า</Typography>

      <AppTabs tabs={TABS} value={activeTab} onChange={setActiveTab} />

      <Box sx={{ mt: 3 }}>
        {/* ====== Tab 1: Account ====== */}
        {activeTab === 'account' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Avatar */}
            <AppCard>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar sx={{ width: 72, height: 72, backgroundColor: THEME_COLORS.primary, fontSize: '1.5rem', fontWeight: 700 }}>
                  {initials}
                </Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 600, color: '#1A1A2E' }}>{profileName}</Typography>
                  <Typography sx={{ fontSize: '0.875rem', color: '#6B7280', mb: 1 }}>{user?.email ?? 'admin@ctrlc.co.th'}</Typography>
                  <Link href="#" sx={{ fontSize: '0.8125rem', color: THEME_COLORS.primary }}>เปลี่ยนรูปโปรไฟล์</Link>
                </Box>
              </Box>
            </AppCard>

            {/* Personal info */}
            <AppCard title="ข้อมูลส่วนตัว">
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
                <AppTextField
                  label="ชื่อ-นามสกุล*"
                  name="profileName"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
                <AppTextField
                  label="อีเมลที่ทำงาน*"
                  name="email"
                  value={user?.email ?? 'admin@ctrlc.co.th'}
                  onChange={() => {}}
                  disabled
                />
                <AppTextField
                  label="หมายเลขโทรศัพท์"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <AppTextField
                  label="ตำแหน่งงาน"
                  name="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </Box>
            </AppCard>

            {/* Display & Language */}
            <AppCard title="การแสดงผลและภาษา">
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2.5 }}>
                <AppSelect
                  label="ภาษา"
                  name="lang"
                  value={lang}
                  onChange={(e: SelectChangeEvent<string | number>) => {
                    setLang(String(e.target.value));
                    void i18n.changeLanguage(String(e.target.value));
                  }}
                  options={LANG_OPTIONS}
                />
                <AppSelect
                  label="เขตเวลา"
                  name="tz"
                  value={tz}
                  onChange={(e: SelectChangeEvent<string | number>) => setTz(String(e.target.value))}
                  options={TZ_OPTIONS}
                />
                <AppSelect
                  label="รูปแบบวันที่"
                  name="dateFormat"
                  value={dateFormat}
                  onChange={(e: SelectChangeEvent<string | number>) => setDateFormat(String(e.target.value))}
                  options={DATE_FORMAT_OPTIONS}
                />
              </Box>
            </AppCard>

            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                v__PROJECT_LOWER__ · Build {buildDate}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <AppButton variant="ghost">{t('login.button.login').replace('เข้าสู่ระบบ', 'ยกเลิก')}</AppButton>
                <AppButton variant="primary">บันทึกการเปลี่ยนแปลง</AppButton>
              </Box>
            </Box>
          </Box>
        )}

        {/* ====== Tab 2: Security ====== */}
        {activeTab === 'security' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* 2FA */}
            <AppCard title="การยืนยันตัวตนสองชั้น (2FA)">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Chip
                    label={twoFaEnabled ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                    size="small"
                    sx={{
                      backgroundColor: twoFaEnabled ? '#D1FAE5' : '#FEE2E2',
                      color: twoFaEnabled ? '#065F46' : '#991B1B',
                      fontWeight: 600, fontSize: '0.75rem',
                    }}
                  />
                  <Typography sx={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    {twoFaEnabled ? '2FA เปิดใช้งานอยู่' : 'แนะนำให้เปิดใช้ 2FA เพื่อความปลอดภัย'}
                  </Typography>
                </Box>
                <AppButton
                  variant={twoFaEnabled ? 'danger' : 'primary'}
                  size="sm"
                  onClick={() => setTwoFaEnabled(!twoFaEnabled)}
                >
                  {twoFaEnabled ? 'ปิดใช้งาน' : 'เปิดใช้งาน'}
                </AppButton>
              </Box>
            </AppCard>

            {/* IP Whitelist */}
            <AppCard title="ข้อจำกัด IP">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {IP_LIST.map((ip) => (
                  <Box key={ip} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #F3F4F6' }}>
                    <Typography sx={{ fontSize: '0.875rem', fontFamily: 'monospace', color: '#1A1A2E' }}>{ip}</Typography>
                    <AppButton variant="danger" size="sm">ลบ</AppButton>
                  </Box>
                ))}
                <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
                  <AppTextField label="" name="newIp" value="" onChange={() => {}} placeholder="เพิ่ม IP ใหม่" />
                  <AppButton variant="primary" size="sm">เพิ่ม</AppButton>
                </Box>
              </Box>
            </AppCard>

            {/* Connected devices */}
            <AppCard title="อุปกรณ์ที่เชื่อมต่อ">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {DEVICES.map((dev) => {
                  const Icon = dev.icon;
                  return (
                    <Box key={dev.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, borderBottom: '1px solid #F3F4F6' }}>
                      <Icon sx={{ fontSize: 22, color: '#6B7280' }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#1A1A2E' }}>{dev.name}</Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF' }}>เข้าใช้ล่าสุด: {dev.lastSeen}</Typography>
                      </Box>
                      <AppButton variant="danger" size="sm">ยกเลิกสิทธิ์</AppButton>
                    </Box>
                  );
                })}
              </Box>
            </AppCard>
          </Box>
        )}

        {/* ====== Tab 3: Notifications ====== */}
        {activeTab === 'notifications' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[
              { label: 'อีเมล', state: notif, setter: setNotif },
              { label: 'SMS', state: notifSms, setter: setNotifSms },
            ].map((ch) => (
              <AppCard key={ch.label} title={ch.label}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <AppCheckbox label="ธุรกรรมใหม่" name="newTxn" checked={ch.state.newTxn}
                    onChange={(e) => ch.setter((p) => ({ ...p, newTxn: e.target.checked }))} />
                  <AppCheckbox label="รออนุมัติ" name="pending" checked={ch.state.pending}
                    onChange={(e) => ch.setter((p) => ({ ...p, pending: e.target.checked }))} />
                  <AppCheckbox label="ข้อผิดพลาด" name="error" checked={ch.state.error}
                    onChange={(e) => ch.setter((p) => ({ ...p, error: e.target.checked }))} />
                  <AppCheckbox label="รายงานประจำวัน" name="dailyReport" checked={ch.state.dailyReport}
                    onChange={(e) => ch.setter((p) => ({ ...p, dailyReport: e.target.checked }))} />
                </Box>
              </AppCard>
            ))}
            <AppCard title="Line Notify">
              <AppCheckbox label="ธุรกรรมใหม่" name="lineNewTxn" checked={false} onChange={() => {}} />
              <AppCheckbox label="รออนุมัติ" name="linePending" checked={true} onChange={() => {}} />
            </AppCard>
            <Box>
              <AppButton variant="primary">บันทึกการตั้งค่า</AppButton>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
