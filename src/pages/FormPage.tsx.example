import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import AppCard from '@/components/ui/AppCard';
import AppButton from '@/components/ui/AppButton';
import AppModal from '@/components/ui/AppModal';
import AppTextField from '@/components/form/AppTextField';
import AppSelect from '@/components/form/AppSelect';
import AppDatePicker from '@/components/form/AppDatePicker';
import AppCheckbox from '@/components/form/AppCheckbox';
import AppRadioGroup from '@/components/form/AppRadioGroup';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { SelectOption } from '@/types/common';

interface FormState {
  customerType: string;
  nameTH: string;
  nameEN: string;
  taxId: string;
  regDate: string;
  businessType: string;
  branchManager: string;
  address: string;
  road: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  creditLimit: string;
  currency: string;
  allowForeign: boolean;
  consent: boolean;
}

const INITIAL: FormState = {
  customerType: 'limited', nameTH: 'บจก. สยามมั่นคง', nameEN: 'Siam Mankong Co., Ltd.',
  taxId: '0105561012345', regDate: '2018-04-01', businessType: 'finance', branchManager: 'BKK-01',
  address: '123 อาคารเอบีซี ชั้น 12', road: 'สุขุมวิท', subDistrict: 'คลองเตย', district: 'วัฒนา',
  province: 'BKK', postalCode: '10110', contactName: 'นายสมชาย ใจดี', contactTitle: 'CFO',
  contactEmail: 'somchai@siammankong.co.th', contactPhone: '0812345678',
  creditLimit: '5M', currency: 'THB', allowForeign: true, consent: false,
};

const CUSTOMER_TYPE_OPTIONS: SelectOption[] = [
  { value: 'limited', label: 'บริษัทจำกัด' },
  { value: 'individual', label: 'บุคคลธรรมดา' },
  { value: 'government', label: 'หน่วยงานราชการ' },
];

const BUSINESS_TYPE_OPTIONS: SelectOption[] = [
  { value: 'finance', label: 'การเงินและสถาบันการเงิน' },
  { value: 'retail', label: 'ค้าปลีก' },
  { value: 'manufacturing', label: 'อุตสาหกรรม' },
  { value: 'services', label: 'บริการ' },
  { value: 'technology', label: 'เทคโนโลยี' },
];

const BRANCH_OPTIONS: SelectOption[] = [
  { value: 'BKK-01', label: 'BKK-01 สำนักงานใหญ่ 1' },
  { value: 'BKK-02', label: 'BKK-02 สำนักงานใหญ่ 2' },
  { value: 'CNX-01', label: 'CNX-01 เชียงใหม่' },
  { value: 'HKT-01', label: 'HKT-01 ภูเก็ต' },
];

const PROVINCE_OPTIONS: SelectOption[] = [
  { value: 'BKK', label: 'กรุงเทพมหานคร' },
  { value: 'CNX', label: 'เชียงใหม่' },
  { value: 'HKT', label: 'ภูเก็ต' },
  { value: 'NMA', label: 'นครราชสีมา' },
];

const CREDIT_OPTIONS: SelectOption[] = [
  { value: '1M', label: '1,000,000 บาท' },
  { value: '5M', label: '5,000,000 บาท' },
  { value: '10M', label: '10,000,000 บาท' },
  { value: '50M', label: '50,000,000 บาท' },
];

const CURRENCY_OPTIONS: SelectOption[] = [
  { value: 'THB', label: 'THB - บาท' },
  { value: 'USD', label: 'USD - ดอลลาร์' },
  { value: 'EUR', label: 'EUR - ยูโร' },
];

const SECTIONS = [
  { id: 'basic', label: 'ข้อมูลพื้นฐาน' },
  { id: 'address', label: 'ที่อยู่จดทะเบียน' },
  { id: 'contact', label: 'ผู้ติดต่อ' },
  { id: 'account', label: 'บัญชีและเงิน' },
  { id: 'confirm', label: 'ยืนยันและบันทึก' },
];

export default function FormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const sectionRefs = {
    basic: useRef<HTMLDivElement>(null),
    address: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    account: useRef<HTMLDivElement>(null),
    confirm: useRef<HTMLDivElement>(null),
  };

  function setField(name: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function setSelectField(name: keyof FormState) {
    return (e: SelectChangeEvent<string | number>) => setField(name, String(e.target.value));
  }

  function scrollTo(id: keyof typeof sectionRefs) {
    sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleSave() {
    if (!form.consent) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setShowSuccess(true);
  }

  const completedSections = [
    form.nameTH && form.taxId && form.regDate,
    form.address && form.subDistrict && form.district && form.province && form.postalCode,
    form.contactName && form.contactEmail && form.contactPhone,
    form.creditLimit && form.currency,
    form.consent,
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: '0.875rem', color: '#6B7280', mb: 0.5 }}>
            ลูกค้า / {form.nameTH} / แก้ไขข้อมูล
          </Typography>
          <Typography sx={{ fontWeight: 700, fontSize: '1.375rem', color: '#1A1A2E' }}>แก้ไขข้อมูลลูกค้า</Typography>
          <Typography sx={{ fontSize: '0.8125rem', color: '#6B7280', mt: 0.25 }}>{id ?? 'CUS-1042'} · อัพเดต 25/03/2568 14:22</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <AppButton variant="ghost">ดูประวัติการแก้ไข</AppButton>
          <AppButton variant="ghost">ดูตัวอย่าง</AppButton>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* TOC */}
        <Grid item xs={12} md={3}>
          <Box sx={{ position: 'sticky', top: 80 }}>
            <AppCard>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {SECTIONS.map((sec, idx) => {
                  const done = !!completedSections[idx];
                  return (
                    <Box
                      key={sec.id}
                      onClick={() => scrollTo(sec.id as keyof typeof sectionRefs)}
                      sx={{
                        display: 'flex', alignItems: 'center', gap: 1.5,
                        p: 1.25, borderRadius: 1.5, cursor: 'pointer',
                        '&:hover': { backgroundColor: '#F5F7FA' },
                      }}
                    >
                      {done
                        ? <CheckCircleOutlineIcon sx={{ fontSize: 18, color: '#10B981' }} />
                        : <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: '#D1D5DB' }} />}
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#1A1A2E' }}>
                        {idx + 1}. {sec.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </AppCard>
          </Box>
        </Grid>

        {/* Form sections */}
        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Section 1 */}
            <Box ref={sectionRefs.basic}>
              <AppCard title="1. ข้อมูลพื้นฐาน">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <AppRadioGroup
                    label="ประเภทลูกค้า"
                    name="customerType"
                    value={form.customerType}
                    onChange={(e) => setField('customerType', e.target.value)}
                    options={CUSTOMER_TYPE_OPTIONS}
                    row
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <AppTextField label="ชื่อนิติบุคคล (ไทย)*" name="nameTH" value={form.nameTH} onChange={(e) => setField('nameTH', e.target.value)} required />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField label="ชื่อนิติบุคคล (อังกฤษ)" name="nameEN" value={form.nameEN} onChange={(e) => setField('nameEN', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField label="เลขประจำตัวผู้เสียภาษี*" name="taxId" value={form.taxId} onChange={(e) => setField('taxId', e.target.value)} required />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppDatePicker label="วันที่จดทะเบียน*" name="regDate" value={form.regDate} onChange={(e) => setField('regDate', e.target.value)} required />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppSelect label="ประเภทธุรกิจ*" name="businessType" value={form.businessType} onChange={setSelectField('businessType')} options={BUSINESS_TYPE_OPTIONS} required />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppSelect label="สาขาที่ดูแล*" name="branchManager" value={form.branchManager} onChange={setSelectField('branchManager')} options={BRANCH_OPTIONS} required />
                    </Grid>
                  </Grid>
                </Box>
              </AppCard>
            </Box>

            {/* Section 2 */}
            <Box ref={sectionRefs.address}>
              <AppCard title="2. ที่อยู่จดทะเบียน">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <AppTextField label="เลขที่/อาคาร*" name="address" value={form.address} onChange={(e) => setField('address', e.target.value)} required />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <AppTextField label="ถนน" name="road" value={form.road} onChange={(e) => setField('road', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField label="แขวง/ตำบล*" name="subDistrict" value={form.subDistrict} onChange={(e) => setField('subDistrict', e.target.value)} required />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField label="เขต/อำเภอ*" name="district" value={form.district} onChange={(e) => setField('district', e.target.value)} required />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <AppSelect label="จังหวัด*" name="province" value={form.province} onChange={setSelectField('province')} options={PROVINCE_OPTIONS} required />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <AppTextField label="รหัสไปรษณีย์*" name="postalCode" value={form.postalCode} onChange={(e) => setField('postalCode', e.target.value)} required />
                    </Grid>
                  </Grid>
                </Box>
              </AppCard>
            </Box>

            {/* Section 3 */}
            <Box ref={sectionRefs.contact}>
              <AppCard title="3. ผู้ติดต่อ">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <AppTextField label="ชื่อผู้ติดต่อ*" name="contactName" value={form.contactName} onChange={(e) => setField('contactName', e.target.value)} required />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <AppTextField label="ตำแหน่ง" name="contactTitle" value={form.contactTitle} onChange={(e) => setField('contactTitle', e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <AppTextField label="อีเมล*" name="contactEmail" type="email" value={form.contactEmail} onChange={(e) => setField('contactEmail', e.target.value)} required />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <AppTextField label="เบอร์โทรศัพท์*" name="contactPhone" value={form.contactPhone} onChange={(e) => setField('contactPhone', e.target.value)} required />
                  </Grid>
                </Grid>
              </AppCard>
            </Box>

            {/* Section 4 */}
            <Box ref={sectionRefs.account}>
              <AppCard title="4. บัญชีและเงิน">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <AppSelect label="วงเงินสูงสุด" name="creditLimit" value={form.creditLimit} onChange={setSelectField('creditLimit')} options={CREDIT_OPTIONS} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <AppSelect label="สกุลเงินหลัก" name="currency" value={form.currency} onChange={setSelectField('currency')} options={CURRENCY_OPTIONS} />
                  </Grid>
                  <Grid item xs={12}>
                    <AppCheckbox
                      label="อนุญาตธุรกรรมต่างประเทศ"
                      name="allowForeign"
                      checked={form.allowForeign}
                      onChange={(e) => setField('allowForeign', e.target.checked)}
                    />
                  </Grid>
                </Grid>
              </AppCard>
            </Box>

            {/* Section 5 */}
            <Box ref={sectionRefs.confirm}>
              <AppCard title="5. ยืนยันและบันทึก">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {/* Summary */}
                  <Box sx={{ backgroundColor: '#F9FAFB', borderRadius: 2, p: 2.5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                    {[
                      ['ชื่อนิติบุคคล', form.nameTH],
                      ['เลขผู้เสียภาษี', form.taxId],
                      ['สาขา', form.branchManager],
                      ['สกุลเงิน', form.currency],
                    ].map(([label, val]) => (
                      <Box key={label}>
                        <Typography sx={{ fontSize: '0.75rem', color: '#6B7280', mb: 0.25 }}>{label}</Typography>
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#1A1A2E' }}>{val}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Divider />

                  <AppCheckbox
                    label="ข้าพเจ้ายืนยันว่าข้อมูลที่กรอกถูกต้องและครบถ้วน (Maker-Checker Consent)*"
                    name="consent"
                    checked={form.consent}
                    onChange={(e) => setField('consent', e.target.checked)}
                    error={saving && !form.consent}
                    helperText={saving && !form.consent ? 'กรุณายืนยันก่อนบันทึก' : undefined}
                  />

                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <AppButton variant="primary" size="lg" loading={saving} disabled={!form.consent} onClick={() => void handleSave()}>
                      บันทึกการเปลี่ยนแปลง
                    </AppButton>
                    <AppButton variant="ghost" onClick={() => navigate(ROUTES.CUSTOMERS)}>ยกเลิก</AppButton>
                  </Box>
                </Box>
              </AppCard>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Success modal */}
      <AppModal
        open={showSuccess}
        onClose={() => { setShowSuccess(false); void navigate(ROUTES.CUSTOMERS); }}
        title="บันทึกสำเร็จ"
        maxWidth="xs"
        actions={
          <AppButton variant="primary" onClick={() => { setShowSuccess(false); void navigate(ROUTES.CUSTOMERS); }}>กลับรายชื่อลูกค้า</AppButton>
        }
      >
        <Typography sx={{ fontSize: '0.875rem' }}>
          บันทึกข้อมูล <strong>{form.nameTH}</strong> เรียบร้อยแล้ว
        </Typography>
      </AppModal>
    </Box>
  );
}
