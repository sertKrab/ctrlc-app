import { createTheme, type Shadows } from '@mui/material/styles';

// ⚠️  __PRIMARY_COLOR__ และ __SECONDARY_COLOR__ คือ placeholders
// scaffold_setup STEP 4 จะ replace ด้วยค่าจริงจาก project-plan.json
// อย่าแก้ไขค่าเหล่านี้โดยตรง — แก้ที่ project-plan.json แทน
const PRIMARY_COLOR   = '__PRIMARY_COLOR__';
const SECONDARY_COLOR = '__SECONDARY_COLOR__';
const FONT_FAMILY     = "'__FONT_FAMILY__', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// derived variants (populated at runtime via CSS vars — ดู src/index.css)
const PRIMARY_DARK    = '__PRIMARY_COLOR_DARK__';
const PRIMARY_LIGHT   = '__PRIMARY_COLOR_LIGHT__';
const SECONDARY_DARK  = '__SECONDARY_COLOR_DARK__';

const theme = createTheme({
  palette: {
    primary: {
      main:         PRIMARY_COLOR,
      light:        PRIMARY_LIGHT,
      dark:         PRIMARY_DARK,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main:         SECONDARY_COLOR,
      light:        '__SECONDARY_COLOR_LIGHT__',
      dark:         SECONDARY_DARK,
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F7FA',
      paper:   '#FFFFFF',
    },
    text: {
      primary:  '#1A1A2E',
      secondary:'#6B7280',
      disabled: '#9CA3AF',
    },
    success: { main: '#10B981', light: '#E7F8F1', contrastText: '#FFFFFF' },
    warning: { main: '#F59E0B', light: '#FEF3E2', contrastText: '#FFFFFF' },
    error:   { main: '#EF4444', light: '#FDECEC', contrastText: '#FFFFFF' },
    info:    { main: PRIMARY_COLOR, light: PRIMARY_LIGHT, contrastText: '#FFFFFF' },
    divider: '#E5E7EB',
  },

  typography: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    h1: { fontSize: '1.5rem',   fontWeight: 600, lineHeight: 1.3 },
    h2: { fontSize: '1.25rem',  fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: '1rem',     fontWeight: 600, lineHeight: 1.3 },
    h4: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.3 },
    h5: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.3 },
    h6: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.3 },
    body1:   { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
    body2:   { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
    caption: { fontSize: '0.75rem',  color: '#6B7280', lineHeight: 1.5 },
    button:  { fontSize: '0.875rem', fontWeight: 500, textTransform: 'none' as const },
  },

  shape: { borderRadius: 8 },

  shadows: [
    'none',
    '0 1px 2px rgba(17,24,39,0.04), 0 1px 3px rgba(17,24,39,0.06)',
    '0 4px 12px rgba(17,24,39,0.08), 0 2px 4px rgba(17,24,39,0.04)',
    '0 8px 24px rgba(17,24,39,0.10), 0 4px 8px rgba(17,24,39,0.06)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
    '0 24px 48px rgba(17,24,39,0.18), 0 8px 16px rgba(17,24,39,0.08)',
  ] as unknown[] as Shadows,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, height: 40, padding: '0 20px',
          fontWeight: 500, boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        sizeSmall: { height: 32, padding: '0 12px', fontSize: '0.8125rem' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8, fontSize: '0.875rem',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderWidth: 1 },
        },
        input: { padding: '10px 12px', height: 20 },
      },
    },
    MuiInputLabel: {
      styleOverrides: { root: { fontSize: '0.75rem', fontWeight: 500 } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 2px rgba(17,24,39,0.04), 0 1px 3px rgba(17,24,39,0.06)',
        },
      },
    },
    MuiPaper:   { styleOverrides: { root: { borderRadius: 12 } } },
    MuiChip:    { styleOverrides: { root: { borderRadius: 9999, fontWeight: 500, fontSize: '0.75rem', height: 22 } } },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            fontWeight: 600, fontSize: '0.75rem',
            color: '#6B7280', backgroundColor: '#F5F7FA',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: { root: { fontSize: '0.8125rem', borderBottomColor: '#E5E7EB', padding: '12px 16px' } },
    },
    MuiTab: {
      styleOverrides: { root: { fontSize: '0.8125rem', fontWeight: 500, textTransform: 'none', minHeight: 44 } },
    },
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: '#F5F7FA' } },
    },
  },
});

export default theme;

// THEME_COLORS — backward compat กับ components ที่ใช้ import นี้
// ⚠️  ค่าเหล่านี้เป็น placeholder เช่นกัน จะถูก replace โดย scaffold_setup
export const THEME_COLORS = {
  primary:       '__PRIMARY_COLOR__',
  secondary:     '__SECONDARY_COLOR__',
  primaryLight:  '__PRIMARY_COLOR_LIGHT__',
  primaryDark:   '__PRIMARY_COLOR_DARK__',
  secondaryDark: '__SECONDARY_COLOR_DARK__',
  error:         '#EF4444',
  warning:       '#F59E0B',
  success:       '#10B981',
} as const;
