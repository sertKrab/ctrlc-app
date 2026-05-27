import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from '@/hooks/useForm';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import AppTextField from '@/components/form/AppTextField';
import AppCheckbox from '@/components/form/AppCheckbox';
import AppButton from '@/components/ui/AppButton';
import AppAlert from '@/components/ui/AppAlert';
import { THEME_COLORS } from '@/theme';

const NAVY = THEME_COLORS.secondary;

interface LoginForm extends Record<string, unknown> {
  email: string;
  password: string;
}

const STAT_CHIPS = [
  { value: '48', label: 'ธนาคาร' },
  { value: '฿12.4M', label: 'ธุรกรรม/วัน' },
  { value: '99.98%', label: 'Uptime' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('auth');
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, errors, handleChange, setErrors } = useForm<LoginForm>(
    { email: '', password: '' },
    async () => {},
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Partial<Record<keyof LoginForm, string>> = {};
    if (!values.email) newErrors.email = 'กรุณากรอกอีเมล';
    if (!values.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    setIsSubmitting(true);
    setLoginError(null);
    try {
      await login({ username: values.email, password: values.password });
      void navigate(ROUTES.DASHBOARD);
    } catch {
      setLoginError(t('login.error.invalid'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left — Navy panel */}
      <Grid
        item
        md={5}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          backgroundColor: NAVY,
          p: 4,
          position: 'relative',
        }}
      >
        {/* Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 'auto' }}>
          <Box sx={{ width: 36, height: 36, borderRadius: 1.5, backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: THEME_COLORS.primary, flexShrink: 0 }}>
            ^C
          </Box>
          <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '1.125rem' }}>__APP_TITLE__</Typography>
        </Box>

        {/* Hero */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.875rem', lineHeight: 1.3, mb: 2 }}>
            ระบบบริหารจัดการ
            <br />การเงินองค์กร
            <br />ยุคใหม่
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            ควบคุม ติดตาม และวิเคราะห์ธุรกรรมทางการเงิน
            <br />ขององค์กรคุณได้อย่างมีประสิทธิภาพ
          </Typography>
        </Box>

        {/* Stat chips */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {STAT_CHIPS.map((s) => (
            <Box key={s.label} sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, px: 2, py: 1 }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.125rem', lineHeight: 1.2 }}>{s.value}</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>
      </Grid>

      {/* Right — Login form */}
      <Grid
        item
        xs={12}
        md={7}
        sx={{ backgroundColor: '#F5F7FA', display: 'flex', flexDirection: 'column', position: 'relative' }}
      >
        {/* Language toggle */}
        <Box sx={{ position: 'absolute', top: 16, right: 24, display: 'flex', gap: 1 }}>
          {(['th', 'en'] as const).map((lang) => (
            <Box
              key={lang}
              onClick={() => void i18n.changeLanguage(lang)}
              sx={{
                px: 1.5, py: 0.5, borderRadius: 1, fontSize: '0.8125rem', fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.15s',
                backgroundColor: i18n.language === lang ? THEME_COLORS.primary : 'transparent',
                color: i18n.language === lang ? '#fff' : '#6B7280',
                '&:hover': { backgroundColor: i18n.language === lang ? '#0A6BDB' : 'rgba(0,0,0,0.04)' },
              }}
            >
              {lang === 'th' ? 'TH' : 'EN'}
            </Box>
          ))}
        </Box>

        {/* Card */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 3, py: 6 }}>
          <Box
            component="form"
            onSubmit={(e) => void handleLogin(e)}
            noValidate
            sx={{ width: '100%', maxWidth: 440, backgroundColor: '#fff', borderRadius: 3, p: { xs: 3, sm: 4 }, boxShadow: '0 1px 2px rgba(17,24,39,0.04), 0 4px 12px rgba(17,24,39,0.06)' }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '1.375rem', color: '#1A1A2E', mb: 0.5 }}>
              เข้าสู่ระบบ
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#6B7280', mb: 3 }}>
              {t('login.subtitle')}
            </Typography>

            {loginError && (
              <Box sx={{ mb: 2 }}>
                <AppAlert severity="error" message={loginError} onClose={() => setLoginError(null)} />
              </Box>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <AppTextField
                label="อีเมล"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                type="email"
                placeholder="กรอกอีเมลของคุณ"
                required
              />
              <AppTextField
                label="รหัสผ่าน"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                type="password"
                placeholder="กรอกรหัสผ่าน"
                required
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
              <AppCheckbox
                label="จดจำอุปกรณ์นี้ 30 วัน"
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Link href="#" sx={{ fontSize: '0.8125rem', color: THEME_COLORS.primary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                ลืมรหัสผ่าน?
              </Link>
            </Box>

            <Box sx={{ mt: 2.5 }}>
              <AppButton variant="primary" size="lg" fullWidth loading={isSubmitting} type="submit">
                {t('login.button.login')}
              </AppButton>
            </Box>

            <Divider sx={{ my: 2.5, fontSize: '0.75rem', color: '#9CA3AF' }}>หรือดำเนินการต่อด้วย</Divider>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <AppButton variant="ghost" size="md" fullWidth>
                SSO องค์กร
              </AppButton>
              <AppButton variant="ghost" size="md" fullWidth>
                โทเค็นฮาร์ดแวร์
              </AppButton>
            </Box>

            <Typography sx={{ fontSize: '0.6875rem', color: '#9CA3AF', textAlign: 'center', mt: 3, lineHeight: 1.6 }}>
              🔒 การเชื่อมต่อนี้ได้รับการเข้ารหัสด้วย TLS 1.3
              <br />ข้อมูลของคุณปลอดภัยและเป็นความลับ
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
